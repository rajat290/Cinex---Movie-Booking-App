# MovieSeat Booker Pro - MERN Stack Backend Guide

## Project Overview
**Frontend Type**: React-based (Vite + React + TypeScript + React Router DOM)
**Backend Stack**: MongoDB + Express.js + Node.js
**Authentication**: JWT-based authentication
**Payment**: Stripe integration

## 1. Backend Setup & Structure

### 1.1 Project Initialization
```bash
mkdir moviebooker-backend
cd moviebooker-backend
npm init -y
```

### 1.2 Dependencies Installation
```bash
# Core dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install stripe nodemailer express-rate-limit helmet

# Development dependencies
npm install -D nodemon concurrently
```

### 1.3 Project Structure
```
moviebooker-backend/
├── config/
│   ├── database.js
│   └── stripe.js
├── controllers/
│   ├── authController.js
│   ├── movieController.js
│   ├── theatreController.js
│   ├── bookingController.js
│   ├── paymentController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   └── rateLimiter.js
├── models/
│   ├── User.js
│   ├── Movie.js
│   ├── Theatre.js
│   ├── Show.js
│   ├── Booking.js
│   └── Payment.js
├── routes/
│   ├── auth.js
│   ├── movies.js
│   ├── theatres.js
│   ├── bookings.js
│   ├── payments.js
│   └── users.js
├── utils/
│   ├── emailService.js
│   ├── seatManager.js
│   └── helpers.js
├── server.js
└── .env
```

## 2. MongoDB Schema Design

### 2.1 User Schema
```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  city: { type: String, default: 'Mumbai' },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  preferences: {
    languages: [String],
    genres: [String],
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true }
    }
  },
  loyaltyPoints: { type: Number, default: 0 },
  bookingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
}, {
  timestamps: true
});
```

### 2.2 Movie Schema
```javascript
// models/Movie.js
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: [{ type: String, required: true }],
  language: [{ type: String, required: true }],
  duration: { type: Number, required: true }, // in minutes
  rating: { type: String, enum: ['U', 'UA', 'A', 'S'] },
  imdbRating: { type: Number, min: 0, max: 10 },
  releaseDate: { type: Date, required: true },
  endDate: { type: Date },
  poster: { type: String, required: true },
  backdrop: { type: String },
  trailer: { type: String },
  cast: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String }
  }],
  crew: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String }
  }],
  formats: [{ type: String, enum: ['2D', '3D', 'IMAX', '4DX'] }],
  status: { type: String, enum: ['upcoming', 'running', 'ended'], default: 'upcoming' },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});
```

### 2.3 Theatre Schema
```javascript
// models/Theatre.js
const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
    website: { type: String }
  },
  amenities: [{ type: String }], // ['Parking', 'Food Court', 'Wheelchair Accessible']
  screens: [{
    screenNumber: { type: Number, required: true },
    name: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    seatLayout: {
      rows: { type: Number, required: true },
      seatsPerRow: { type: Number, required: true },
      seatTypes: [{
        type: { type: String, enum: ['regular', 'premium', 'recliner'] },
        price: { type: Number, required: true },
        seats: [{ type: String }] // ['A1', 'A2', 'B1', 'B2']
      }]
    },
    formats: [{ type: String, enum: ['2D', '3D', 'IMAX', '4DX'] }]
  }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

theatreSchema.index({ location: '2dsphere' });
```

### 2.4 Show Schema
```javascript
// models/Show.js
const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  screen: { type: String, required: true }, // screen identifier
  date: { type: Date, required: true },
  showTime: { type: String, required: true }, // '09:30', '13:15'
  language: { type: String, required: true },
  format: { type: String, enum: ['2D', '3D', 'IMAX', '4DX'], required: true },
  pricing: [{
    seatType: { type: String, enum: ['regular', 'premium', 'recliner'] },
    price: { type: Number, required: true }
  }],
  availableSeats: [{ type: String }], // ['A1', 'A2', 'B1']
  bookedSeats: [{ type: String }],
  blockedSeats: [{ // Temporarily blocked during booking process
    seat: { type: String },
    blockedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }
  }],
  totalSeats: { type: Number, required: true },
  status: { type: String, enum: ['active', 'cancelled', 'completed'], default: 'active' }
}, {
  timestamps: true
});
```

### 2.5 Booking Schema
```javascript
// models/Booking.js
const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  seats: [{
    seatNumber: { type: String, required: true },
    seatType: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  convenienceFee: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  showDate: { type: Date, required: true },
  showTime: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'refunded'], 
    default: 'pending' 
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  qrCode: { type: String },
  cancellationReason: { type: String },
  refundAmount: { type: Number }
}, {
  timestamps: true
});
```

### 2.6 Payment Schema
```javascript
// models/Payment.js
const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentMethod: { type: String, required: true }, // 'card', 'upi', 'netbanking'
  paymentGateway: { type: String, default: 'stripe' },
  transactionId: { type: String, required: true, unique: true },
  gatewayTransactionId: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'success', 'failed', 'refunded'], 
    default: 'pending' 
  },
  paymentDate: { type: Date },
  refundDetails: {
    refundId: { type: String },
    refundAmount: { type: Number },
    refundDate: { type: Date },
    reason: { type: String }
  }
}, {
  timestamps: true
});
```

## 3. API Endpoints

### 3.1 Authentication Routes (/api/auth)
```javascript
POST   /api/auth/register          // User registration
POST   /api/auth/login             // User login
POST   /api/auth/logout            // User logout
POST   /api/auth/forgot-password   // Send password reset email
POST   /api/auth/reset-password    // Reset password with token
POST   /api/auth/verify-email      // Verify email with token
POST   /api/auth/verify-phone      // Verify phone with OTP
POST   /api/auth/resend-otp        // Resend OTP
GET    /api/auth/me                // Get current user profile
```

### 3.2 Movie Routes (/api/movies)
```javascript
GET    /api/movies                 // Get all movies with filters
GET    /api/movies/search          // Search movies
GET    /api/movies/:id             // Get movie by ID
GET    /api/movies/trending        // Get trending movies
GET    /api/movies/upcoming        // Get upcoming movies
GET    /api/movies/genres          // Get all genres
GET    /api/movies/languages       // Get all languages
POST   /api/movies                 // Create new movie (Admin)
PUT    /api/movies/:id             // Update movie (Admin)
DELETE /api/movies/:id             // Delete movie (Admin)
```

### 3.3 Theatre Routes (/api/theatres)
```javascript
GET    /api/theatres               // Get theatres by city
GET    /api/theatres/nearby        // Get nearby theatres
GET    /api/theatres/:id           // Get theatre by ID
GET    /api/theatres/:id/movies    // Get movies in theatre
POST   /api/theatres               // Create theatre (Admin)
PUT    /api/theatres/:id           // Update theatre (Admin)
DELETE /api/theatres/:id           // Delete theatre (Admin)
```

### 3.4 Show Routes (/api/shows)
```javascript
GET    /api/shows                  // Get shows with filters
GET    /api/shows/movie/:movieId   // Get shows for a movie
GET    /api/shows/:id              // Get show by ID
GET    /api/shows/:id/seats        // Get seat availability
POST   /api/shows/:id/block-seats  // Temporarily block seats
POST   /api/shows                  // Create show (Admin)
PUT    /api/shows/:id              // Update show (Admin)
DELETE /api/shows/:id              // Delete show (Admin)
```

### 3.5 Booking Routes (/api/bookings)
```javascript
POST   /api/bookings               // Create new booking
GET    /api/bookings               // Get user bookings
GET    /api/bookings/:id           // Get booking by ID
PUT    /api/bookings/:id/cancel    // Cancel booking
GET    /api/bookings/:id/ticket    // Get ticket/QR code
```

### 3.6 Payment Routes (/api/payments)
```javascript
POST   /api/payments/create-intent // Create payment intent
POST   /api/payments/confirm       // Confirm payment
POST   /api/payments/webhook       // Stripe webhook
GET    /api/payments/:id           // Get payment details
POST   /api/payments/:id/refund    // Process refund
```

### 3.7 User Routes (/api/users)
```javascript
GET    /api/users/profile          // Get user profile
PUT    /api/users/profile          // Update user profile
GET    /api/users/bookings         // Get user booking history
POST   /api/users/change-password  // Change password
DELETE /api/users/account          // Delete user account
```

## 4. Implementation Steps

### 4.1 Step 1: Database Configuration
```javascript
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### 4.2 Step 2: Server Setup
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/theatres', require('./routes/theatres'));
app.use('/api/shows', require('./routes/shows'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/users', require('./routes/users'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 4.3 Step 3: Authentication Middleware
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;
```

### 4.4 Step 4: Sample Controller
```javascript
// controllers/movieController.js
const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
  try {
    const { 
      city = 'Mumbai', 
      language, 
      genre, 
      format,
      page = 1,
      limit = 20 
    } = req.query;

    const query = { isActive: true, status: 'running' };
    
    if (language) query.language = { $in: language.split(',') };
    if (genre) query.genre = { $in: genre.split(',') };
    if (format) query.formats = { $in: format.split(',') };

    const movies = await Movie.find(query)
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .sort({ releaseDate: -1 });

    const total = await Movie.countDocuments(query);

    res.json({
      movies,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMovies };
```

## 5. Frontend Integration

### 5.1 API Service Setup
Create an API service layer in your React frontend:

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 5.2 Service Functions
```javascript
// src/services/movieService.js
import api from './api';

export const movieService = {
  getMovies: (params) => api.get('/movies', { params }),
  getMovie: (id) => api.get(`/movies/${id}`),
  searchMovies: (query) => api.get(`/movies/search?q=${query}`),
};

// src/services/bookingService.js
export const bookingService = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getBookings: () => api.get('/bookings'),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
};
```

### 5.3 React Hook for API Calls
```javascript
// src/hooks/useMovies.js
import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';

export const useMovies = (filters = {}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await movieService.getMovies(filters);
        setMovies(response.data.movies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [filters]);

  return { movies, loading, error };
};
```

## 6. Environment Variables

### 6.1 Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/moviebooker

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 6.2 Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 7. Deployment Considerations

### 7.1 Production Setup
- Use MongoDB Atlas for database hosting
- Deploy backend on Railway, Render, or AWS
- Set up proper CORS policies
- Implement request logging
- Set up monitoring and error tracking
- Use environment-specific configurations

### 7.2 Security Best Practices
- Input validation and sanitization
- Rate limiting on sensitive endpoints
- Secure password storage with bcrypt
- JWT token expiration handling
- HTTPS enforcement in production
- Database query optimization and indexing

## 8. Testing Strategy

### 8.1 Unit Tests
- Controller function testing
- Database model validation testing
- Utility function testing

### 8.2 Integration Tests
- API endpoint testing
- Database integration testing
- Payment flow testing

### 8.3 Load Testing
- Concurrent booking scenarios
- High traffic simulation
- Database performance testing

This comprehensive guide provides the foundation for building a robust MERN stack backend for your MovieSeat Booker Pro application. Each section can be implemented incrementally, starting with the core authentication and movie listing features, then adding booking and payment functionality.