# MovieBooker Backend - Cinex Movie Booking System

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green)
![JWT](https://img.shields.io/badge/JWT-Auth-blue)

A robust and scalable backend API for a modern movie ticket booking platform built with Node.js, Express.js, and MongoDB. This system provides comprehensive movie booking functionality with secure authentication, payment processing, and real-time seat management.

## 🎯 Project Overview

Cinex is a full-featured movie booking platform that allows users to:
- Browse movies with advanced filtering (genre, language, format, status)
- Search for movies by title
- View show timings across multiple theaters
- Book and reserve seats in real-time
- Make secure payments via Razorpay integration
- Receive booking confirmations via email
- Manage booking history and cancellations

## 🚀 Features

### Core Functionality
- **User Authentication**: JWT-based secure registration and login
- **Movie Management**: Comprehensive movie catalog with filtering and search
- **Theater Management**: Multiple theater support with location-based filtering
- **Show Management**: Dynamic show scheduling with pricing tiers
- **Seat Booking**: Real-time seat availability and reservation system
- **Payment Integration**: Razorpay payment gateway with secure transactions
- **Email Notifications**: Booking confirmations and cancellation emails
- **Booking Management**: User booking history and cancellation system

### Advanced Features
- **Real-time Seat Locking**: Temporary seat reservations with timeout
- **Dynamic Pricing**: Different pricing for seat types (Premium, Standard)
- **Tax Calculation**: Automatic GST and convenience fee calculations
- **Cancellation Policy**: Configurable cancellation rules with partial refunds
- **Pagination**: Efficient data loading for large datasets
- **Rate Limiting**: API protection against abuse
- **Security**: Helmet.js and CORS protection

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Payment & Email
- **Razorpay** - Payment gateway integration
- **Nodemailer** - Email service for notifications

### Security & Performance
- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting middleware
- **dotenv** - Environment variable management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajat290/Cinex---Movie-Booking-App.git
   cd moviebooker-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/moviebooker
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Razorpay Configuration
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Production deployment**
   ```bash
   npm start
   ```

## 🗄️ Database Schema

The system uses MongoDB with the following main collections:

### Users
- Personal information (name, email, phone, city)
- Authentication credentials
- Booking history

### Movies
- Movie details (title, description, cast, director)
- Metadata (genre, language, format, duration)
- Status (upcoming, running, completed)

### Theaters
- Theater information (name, address, city)
- Screen details and seating capacity
- Amenities and facilities

### Shows
- Show scheduling (date, time)
- Pricing configuration
- Seat availability and reservations

### Bookings
- Booking details (user, show, seats)
- Payment information
- Booking status and history

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Movies
- `GET /api/movies` - Get movies with filters
- `GET /api/movies/:id` - Get single movie
- `GET /api/movies/genres/list` - Get available genres
- `GET /api/movies/languages/list` - Get available languages

### Theaters
- `GET /api/theatres` - Get theaters with filters
- `GET /api/theatres/:id` - Get single theater

### Shows
- `GET /api/shows` - Get shows with filters
- `GET /api/shows/:id` - Get single show

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment

### Health Check
- `GET /api/health` - Server status check

## 🚦 Development Phases

The project is developed in phases:

### Phase 1: Core Infrastructure
- Basic server setup
- Database connection
- Authentication system
- Basic movie and theater APIs

### Phase 2: Booking System
- Show management
- Seat reservation system
- Booking creation
- Email notifications

### Phase 3: Payment Integration
- Razorpay integration
- Payment verification
- Refund processing

### Phase 4: Advanced Features
- Real-time seat locking
- Cancellation system
- Advanced filtering
- Pagination and performance optimization

## 🧪 Testing

### Sample Data
The API includes sample data endpoints for testing:
- `GET /api/sample-data/movies` - Sample movies
- `GET /api/sample-data/theatres` - Sample theaters
- `GET /api/sample-data/shows` - Sample shows

### Test Routes
Temporary test routes are available (remove in production):
- `GET /api/test` - Various test endpoints

## 🔒 Security Features

- JWT authentication with secure token management
- Password hashing with bcryptjs
- Rate limiting to prevent API abuse
- CORS configuration for frontend integration
- Helmet.js for security headers
- Input validation and sanitization

## 📧 Email Notifications

The system sends automated emails for:
- Booking confirmation
- Payment success
- Booking cancellation
- Refund processing

## 💳 Payment Processing

Integrated with Razorpay for:
- Secure payment processing
- Payment verification
- Refund management
- Transaction history

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set:
- Database connection string
- JWT secret key
- Email service credentials
- Payment gateway credentials
- Frontend URL for CORS

### Production Configuration
- Use MongoDB Atlas for production database
- Set appropriate JWT expiration
- Configure proper email service
- Enable production-ready security settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/rajat290/Cinex---Movie-Booking-App/issues) page to report bugs or request new features.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using Node.js, Express.js, and MongoDB**
