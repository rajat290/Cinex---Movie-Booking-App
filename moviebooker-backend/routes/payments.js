const express = require('express');
const crypto = require('crypto');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const razorpay = require('../config/razorpay');
const auth = require('../middleware/auth');
const router = express.Router();
const { sendPaymentFailedEmail } = require('../utils/emailService');
// POST /api/payments/create-order - Create Razorpay order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { bookingId, paymentMethod = 'upi' } = req.body;

    // Validate bookingId format
    if (!bookingId || bookingId === 'BOOKING_ID_HERE') {
      return res.status(400).json({ 
        message: 'Invalid booking ID provided. Please provide a valid booking ID.',
        error: 'BOOKING_ID_PLACEHOLDER_USED'
      });
    }

    // Check if bookingId is a valid MongoDB ObjectId
    if (!bookingId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        message: 'Invalid booking ID format. Please provide a valid MongoDB ObjectId.',
        error: 'INVALID_BOOKING_ID_FORMAT'
      });
    }

    const booking = await Booking.findById(bookingId)
      .populate('movie')
      .populate('theatre');
    
    if (!booking) {
      return res.status(404).json({ 
        message: 'Booking not found',
        error: 'BOOKING_NOT_FOUND'
      });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (booking.paymentStatus === 'completed') {
      return res.status(400).json({ message: 'Payment already completed' });
    }

    // Create Razorpay order
    const options = {
      amount: booking.finalAmount * 100, // Razorpay expects paise
      currency: 'INR',
      receipt: `receipt_${booking.bookingId}`,
      notes: {
        bookingId: booking.bookingId,
        movie: booking.movie.title,
        theatre: booking.theatre.name,
        showDate: booking.showDate.toISOString(),
        showTime: booking.showTime
      },
      payment_capture: 1 // Auto capture payment
    };

    const order = await razorpay.orders.create(options);

    // Update booking with Razorpay order ID
    booking.razorpayOrderId = order.id;
    await booking.save();

    // Create payment record
    const payment = new Payment({
      booking: booking._id,
      user: req.user._id,
      amount: booking.finalAmount,
      currency: 'INR',
      paymentMethod,
      orderId: order.id,
      status: 'created'
    });
    await payment.save();

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        movie: booking.movie.title,
        theatre: booking.theatre.name,
        seats: booking.seats,
        finalAmount: booking.finalAmount
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/payments/verify - Verify payment
router.post('/verify', auth, async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + '|' + paymentId)
      .digest('hex');

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Update booking and payment status
    const booking = await Booking.findOne({ razorpayOrderId: orderId });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.paymentStatus = 'completed';
    booking.status = 'confirmed';
    booking.razorpayPaymentId = paymentId;
    booking.razorpaySignature = signature;
    await booking.save();

    // Update payment record
    await Payment.findOneAndUpdate(
      { orderId },
      { 
        paymentId,
        status: 'paid',
        gatewayResponse: req.body
      }
    );

    // Confirm seat booking
    const show = await Show.findById(booking.show);
    const seatNumbers = booking.seats.map(seat => seat.seatNumber);
    show.bookSeats(seatNumbers);
    await show.save();

    res.json({ 
      message: 'Payment verified successfully', 
      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        status: booking.status,
        paymentStatus: booking.paymentStatus
      }
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ message: error.message });
  }
});
// POST /api/payments/webhook - Razorpay webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    // Verify webhook signature
    const generatedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(req.body)
      .digest('hex');

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: 'Invalid webhook signature' });
    }

    const event = JSON.parse(req.body);
    
    switch (event.event) {
      case 'payment.captured':
        // Payment successful
        await handleSuccessfulPayment(event);
        break;
      
      case 'payment.failed':
        // Payment failed
        await handleFailedPayment(event);
        break;
      
      case 'refund.processed':
        // Refund completed
        await handleRefund(event);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Helper functions for webhook
async function handleSuccessfulPayment(event) {
  const { order_id, payment_id } = event.payload.payment.entity;
  
  const booking = await Booking.findOne({ razorpayOrderId: order_id });
  if (booking) {
    booking.paymentStatus = 'completed';
    booking.status = 'confirmed';
    booking.razorpayPaymentId = payment_id;
    await booking.save();
  }
}

async function handleFailedPayment(event) {
  const { order_id } = event.payload.payment.entity;
  
  const booking = await Booking.findOne({ razorpayOrderId: order_id });
  if (booking) {
    booking.paymentStatus = 'failed';
    booking.status = 'cancelled';
    
    // Release seats
    const show = await Show.findById(booking.show);
    const seatNumbers = booking.seats.map(seat => seat.seatNumber);
    show.releaseSeats(seatNumbers);
    await show.save();
    await booking.save();
// Send payment failed email
    await sendPaymentFailedEmail(
      booking.user,
      booking,
      booking.movie,
      booking.theatre
    );

  }
}
module.exports = router;