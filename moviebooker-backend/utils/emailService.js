const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Booking confirmation email
const sendBookingConfirmation = async (user, booking, show, movie, theatre) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: `Booking Confirmed - ${movie.title} at ${theatre.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #007bff; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; border: 1px solid #ddd; }
            .footer { text-align: center; padding: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎬 CineX</h1>
              <h2>Booking Confirmed!</h2>
            </div>
            
            <div class="content">
              <h3>Hello ${user.firstName},</h3>
              <p>Your booking for <strong>${movie.title}</strong> has been confirmed.</p>
              
              <h4>📅 Show Details:</h4>
              <p><strong>Theatre:</strong> ${theatre.name}</p>
              <p><strong>Screen:</strong> ${show.screen}</p>
              <p><strong>Date:</strong> ${new Date(show.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${show.showTime}</p>
              <p><strong>Seats:</strong> ${booking.seats.map(s => s.seatNumber).join(', ')}</p>
              <p><strong>Amount:</strong> ₹${booking.finalAmount}</p>
              
              <h4>🎫 Booking ID: ${booking.bookingId}</h4>
              
              <p>Please arrive at least 30 minutes before the show time.</p>
            </div>
            
            <div class="footer">
              <p>Thank you for choosing CineX!</p>
              <p>If you have any questions, contact us at support@cinex.com</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent to:', user.email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Payment failed email
const sendPaymentFailedEmail = async (user, booking, movie, theatre) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: `Payment Failed - ${movie.title} Booking`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>/* Same styles as above */</style>
        </head>
        <body>
          <div class="container">
            <div class="header" style="background: #dc3545;">
              <h1>🎬 CineX</h1>
              <h2>Payment Failed</h2>
            </div>
            
            <div class="content">
              <h3>Hello ${user.firstName},</h3>
              <p>Your payment for <strong>${movie.title}</strong> at <strong>${theatre.name}</strong> has failed.</p>
              <p>Seats: ${booking.seats.map(s => s.seatNumber).join(', ')}</p>
              <p>Amount: ₹${booking.finalAmount}</p>
              
              <p>Please try again or contact your bank for payment issues.</p>
              <p>Your seats have been released and will be available for others to book.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Payment failed email sent to:', user.email);
  } catch (error) {
    console.error('Error sending payment failed email:', error);
  }
};

module.exports = {
  sendBookingConfirmation,
  sendPaymentFailedEmail
};