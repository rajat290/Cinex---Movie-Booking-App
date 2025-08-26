const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Booking confirmation email
const sendBookingConfirmation = async (user, booking, show, movie, theatre) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: `🎬 Booking Confirmed - ${movie.title} at ${theatre.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header { 
              background: #007bff; 
              color: white; 
              padding: 20px; 
              text-align: center; 
              border-radius: 10px 10px 0 0;
            }
            .content { 
              padding: 20px; 
              border: 1px solid #ddd;
              border-top: none;
            }
            .footer { 
              text-align: center; 
              padding: 20px; 
              color: #666;
              font-size: 14px;
            }
            .ticket-info {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 5px;
              margin: 15px 0;
            }
            .booking-id {
              font-size: 18px;
              font-weight: bold;
              color: #007bff;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎬 CineX</h1>
            <h2>Booking Confirmed!</h2>
          </div>
          
          <div class="content">
            <h3>Hello ${user.firstName},</h3>
            <p>Your booking for <strong>${movie.title}</strong> has been confirmed successfully.</p>
            
            <div class="ticket-info">
              <h4>📅 Show Details:</h4>
              <p><strong>Movie:</strong> ${movie.title}</p>
              <p><strong>Theatre:</strong> ${theatre.name}</p>
              <p><strong>Address:</strong> ${theatre.address.area}, ${theatre.address.city}</p>
              <p><strong>Screen:</strong> ${show.screen}</p>
              <p><strong>Date:</strong> ${new Date(show.date).toLocaleDateString('en-IN')}</p>
              <p><strong>Time:</strong> ${show.showTime}</p>
              <p><strong>Seats:</strong> ${booking.seats.map(s => s.seatNumber).join(', ')}</p>
              <p><strong>Total Amount:</strong> ₹${booking.finalAmount}</p>
            </div>
            
            <p class="booking-id">🎫 Booking ID: ${booking.bookingId}</p>
            
            <p>📍 <strong>Please arrive at least 30 minutes before the show time.</strong></p>
            <p>Carry a valid ID proof for verification.</p>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing CineX! 🎉</p>
            <p>If you have any questions, contact us at support@cinex.com</p>
            <p>© 2024 CineX. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Booking confirmation email sent to:', user.email);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

// Payment failed email
const sendPaymentFailedEmail = async (user, booking, movie, theatre) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: `❌ Payment Failed - ${movie.title} Booking`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>/* Same styles as above */</style>
        </head>
        <body>
          <div class="header" style="background: #dc3545;">
            <h1>🎬 CineX</h1>
            <h2>Payment Failed</h2>
          </div>
          
          <div class="content">
            <h3>Hello ${user.firstName},</h3>
            <p>We're sorry, but your payment for <strong>${movie.title}</strong> has failed.</p>
            
            <div class="ticket-info">
              <p><strong>Theatre:</strong> ${theatre.name}</p>
              <p><strong>Seats:</strong> ${booking.seats.map(s => s.seatNumber).join(', ')}</p>
              <p><strong>Amount:</strong> ₹${booking.finalAmount}</p>
            </div>
            
            <p>Possible reasons for payment failure:</p>
            <ul>
              <li>Insufficient bank balance</li>
              <li>Incorrect card details</li>
              <li>Bank server issues</li>
            </ul>
            
            <p>Your seats have been released and will be available for others to book.</p>
            <p>Please try again or contact your bank for payment issues.</p>
          </div>
          
          <div class="footer">
            <p>Need help? Contact support@cinex.com</p>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Payment failed email sent to:', user.email);
    return info;
  } catch (error) {
    console.error('❌ Error sending payment failed email:', error);
    throw error;
  }
};

module.exports = {
  sendBookingConfirmation,
  sendPaymentFailedEmail
};