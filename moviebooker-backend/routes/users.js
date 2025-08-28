const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/users/profile - Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/users/profile - Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, phone, city, preferences } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 
        firstName, 
        lastName, 
        phone, 
        city, 
        preferences,
        ...(preferences && { preferences })
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/users/change-password - Change password
router.post('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.user._id);
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/users/bookings - Get user bookings with filters
router.get('/bookings', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
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
    res.status(500).json({ message: error.message });
  }
});

// GET /api/users/stats - Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments({ user: req.user._id });
    const confirmedBookings = await Booking.countDocuments({ 
      user: req.user._id, 
      status: 'confirmed' 
    });
    const cancelledBookings = await Booking.countDocuments({ 
      user: req.user._id, 
      status: 'cancelled' 
    });

    res.json({
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      loyaltyPoints: req.user.loyaltyPoints || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;