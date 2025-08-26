const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// Database connection
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', status: 'OK' });
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/theatres', require('./routes/theatres'));
// NEW ROUTES ADD KAROe- Phase 2
app.use('/api/movies', require('./routes/movies'));
app.use('/api/shows', require('./routes/shows'));


// Temporary route for sample data (remove in production)
app.use('/api/sample-data', require('./routes/sampleData'));

// Phase 2 Routes
app.use('/api/movies', require('./routes/movies'));
app.use('/api/shows', require('./routes/shows'));
app.use('/api/seats', require('./routes/seats')); // NEW
// Phase 3 Routes - Booking & Payment
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/payments', require('./routes/payments').router);
// Temporary test routes (remove in production)
app.use('/api/test', require('./routes/test'));
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});