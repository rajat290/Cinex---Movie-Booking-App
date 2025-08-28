const { body, validationResult } = require('express-validator');

// User registration validation
const validateRegistration = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').isMobilePhone().withMessage('Valid phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Booking validation
const validateBooking = [
  body('showId').isMongoId().withMessage('Valid show ID is required'),
  body('seats').isArray({ min: 1 }).withMessage('At least one seat is required'),
  body('seats.*.seatNumber').notEmpty().withMessage('Seat number is required'),
  body('seats.*.seatType').isIn(['regular', 'premium', 'recliner']).withMessage('Invalid seat type'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateRegistration,
  validateBooking
};