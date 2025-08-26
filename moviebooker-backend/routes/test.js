const express = require('express');
const { sendBookingConfirmation } = require('../utils/emailService');
const router = express.Router();

// GET /api/test/email - Test email functionality
router.get('/email', async (req, res) => {
  try {
    const testUser = {
      firstName: 'Rajat',
      lastName: 'Singh',
      email: 'rajatsinghtomarofficial@gmail.com' // Apna test email daalo
    };

    const testBooking = {
      bookingId: 'CINEX001',
      seats: [{ seatNumber: 'A1' }, { seatNumber: 'A2' }],
      finalAmount: 500
    };

    const testShow = {
      screen: 'Screen 1',
      date: new Date(),
      showTime: '18:30'
    };

    const testMovie = {
      title: 'Fighter'
    };

    const testTheatre = {
      name: 'PVR Saket',
      address: {
        area: 'Saket',
        city: 'Delhi'
      }
    };

    const result = await sendBookingConfirmation(
      testUser,
      testBooking,
      testShow,
      testMovie,
      testTheatre
    );

    res.json({
      message: 'Test email sent successfully',
      result
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error sending test email',
      error: error.message
    });
  }
});
// MANUAL WEBHOOK TEST ROUTE (Temporary - remove in production)
router.post('/test-webhook', async (req, res) => {
  try {
    // Simulate Razorpay webhook payload
    const testPayload = {
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            order_id: 'order_12345',
            payment_id: 'pay_12345'
          }
        }
      }
    };

    // Manually call webhook handler
    await handleSuccessfulPayment(testPayload);
    
    res.json({ message: 'Manual webhook test completed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;