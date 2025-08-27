const express = require('express');
const Booking = require('../models/Booking');
const Show = require('../models/Show');
const Movie = require('../models/Movie');
const Theatre = require('../models/Theatre');
const auth = require('../middleware/auth');
const { sendBookingConfirmation } = require('../utils/emailService');
const router = express.Router();

// POST /api/bookings - Create new booking
router.post('/', auth, async (req, res) => {
  try {
    const { showId, seats } = req.body;

    // Validate input
    if (!showId || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: 'Show ID and seats are required' });
    }

    // Get show details
    const show = await Show.findById(showId)
      .populate('movie')
      .populate('theatre');

    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // Check seat availability
    const availableSeats = show.getAvailableSeats();
    const requestedSeats = seats.map(seat => seat.seatNumber);

    const unavailableSeats = requestedSeats.filter(seat =>
      !availableSeats.includes(seat)
    );

    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        message: 'Some seats are not available',
        unavailableSeats
      });
    }

    // Calculate pricing
    let totalAmount = 0;
    const seatDetails = seats.map(seat => {
      const seatPrice = show.pricing.find(p => p.seatType === seat.seatType)?.price || 0;
      totalAmount += seatPrice;
      return {
        seatNumber: seat.seatNumber,
        seatType: seat.seatType,
        price: seatPrice
      };
    });

    // Add convenience fee and tax (example: 10% convenience fee + 18% GST)
    const convenienceFee = Math.round(totalAmount * 0.10);
    const tax = Math.round((totalAmount + convenienceFee) * 0.18);
    const finalAmount = totalAmount + convenienceFee + tax;

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      show: showId,
      movie: show.movie._id,
      theatre: show.theatre._id,
      seats: seatDetails,
      totalAmount,
      convenienceFee,
      tax,
      finalAmount,
      showDate: show.date,
      showTime: show.showTime,
      status: 'pending',
      paymentStatus: 'pending'
    });

    // Temporarily block seats
    show.blockSeats(requestedSeats, 10); // 10 minutes timeout
    await show.save();
    await booking.save();


    await sendBookingConfirmation(
      req.user,
      booking,
      show,
      show.movie,
      show.theatre
    );

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
      paymentRequired: true
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET /api/bookings - Get user's bookings
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let query = { user: req.user._id };
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('movie', 'title poster')
      .populate('theatre', 'name address')
      .populate('show', 'date showTime language format')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: error.message });
  }
});
// PUT /api/bookings/:id/cancel - Cancel booking
// PUT /api/bookings/:id/cancel - Cancel booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const { reason } = req.body;
    
    const booking = await Booking.findById(req.params.id)
      .populate('show')
      .populate('movie')
      .populate('theatre')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if booking is already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    // Check if show has already started
    const showDateTime = new Date(booking.showDate);
    const [hours, minutes] = booking.showTime.split(':');
    showDateTime.setHours(parseInt(hours), parseInt(minutes));
    
    const currentTime = new Date();
    const timeDifference = showDateTime - currentTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    // 3 hours se pehle cancel allow nahi
    if (hoursDifference < 3) {
      return res.status(400).json({ 
        message: 'Cancellation not allowed within 3 hours of show time' 
      });
    }

    // Release seats back to available
    const show = await Show.findById(booking.show);
    const seatNumbers = booking.seats.map(seat => seat.seatNumber);
    show.releaseSeats(seatNumbers);
    await show.save();

    // Update booking status
    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    booking.paymentStatus = 'refunded';
    booking.refundAmount = booking.finalAmount * 0.8; // 80% refund
    await booking.save();

    // Update payment record
    await Payment.findOneAndUpdate(
      { booking: booking._id },
      {
        status: 'refunded',
        refundDetails: {
          refundAmount: booking.refundAmount,
          refundDate: new Date(),
          reason: reason || 'User requested cancellation'
        }
      }
    );

    // Send cancellation email
    try {
      const { sendCancellationEmail } = require('../utils/emailService');
      await sendCancellationEmail(
        booking.user,
        booking,
        booking.movie,
        booking.theatre
      );
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.json({
      message: 'Booking cancelled successfully',
      refundAmount: booking.refundAmount,
      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        status: booking.status,
        refundAmount: booking.refundAmount
      }
    });

  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;