const express = require('express');
const { sendBookingConfirmation } = require('../utils/emailService');
const router = express.Router();

// GET /api/test/email - Test email functionality
router.get('/email', async (req, res) => {
  try {
    const testUser = {
      firstName: 'Virat',
      lastName: 'Tripathi',
      email: 'viratofficial07@gmail.com' // Apna test email daalo
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

module.exports = router;