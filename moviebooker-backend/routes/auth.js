const express = require('express');
const auth = require('../middleware/auth');
const { register, login, getProfile } = require('../controllers/authController');
const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Get current user profile
router.get('/me', auth, getProfile);

module.exports = router;
