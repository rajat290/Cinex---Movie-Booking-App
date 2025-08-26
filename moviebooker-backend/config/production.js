module.exports = {
  // Production-specific settings
  corsOptions: {
    origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
    credentials: true
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 200
  }
};