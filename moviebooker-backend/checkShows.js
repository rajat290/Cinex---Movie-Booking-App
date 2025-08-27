const mongoose = require('mongoose');
const Show = require('./models/Show');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const shows = await Show.find({});
    console.log('Shows in DB:', shows.map(s => ({ id: s._id, movie: s.movie, date: s.date })));
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Database connection error:', err);
    mongoose.connection.close();
  });
