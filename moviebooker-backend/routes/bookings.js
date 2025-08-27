const express = require('express');
const auth = require('../middleware/auth');
const { createBooking, getBookings, cancelBooking } = require('../controllers/bookingController');
const router = express.Router();

// POST /api/bookings - Create new booking
router.post('/', auth, createBooking);

// GET /api/bookings - Get user's bookings
router.get('/', auth, getBookings);

// PUT /api/bookings/:id/cancel - Cancel booking
router.put('/:id/cancel', auth, cancelBooking);

module.exports = router;
