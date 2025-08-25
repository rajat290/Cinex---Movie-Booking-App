const express = require('express');
const Show = require('../models/Show');
const Theatre = require('../models/Theatre');
const router = express.Router();

// GET /api/shows - Get shows with filters
router.get('/', async (req, res) => {
  try {
    const { 
      movieId, 
      theatreId, 
      city, 
      date, 
      language, 
      format,
      page = 1,
      limit = 20
    } = req.query;

    let query = { status: 'active' };

    // Movie filter
    if (movieId) {
      query.movie = movieId;
    }

    // Theatre filter
    if (theatreId) {
      query.theatre = theatreId;
    }

    // City filter - find theatres in city first
    if (city && !theatreId) {
      const theatresInCity = await Theatre.find({ 
        'address.city': new RegExp(city, 'i'),
        isActive: true 
      }).select('_id');
      
      query.theatre = { $in: theatresInCity.map(t => t._id) };
    }

    // Date filter
    if (date) {
      const selectedDate = new Date(date);
      const nextDate = new Date(selectedDate);
      nextDate.setDate(nextDate.getDate() + 1);
      
      query.date = {
        $gte: selectedDate,
        $lt: nextDate
      };
    }

    // Language filter
    if (language) {
      query.language = language;
    }

    // Format filter
    if (format) {
      query.format = format;
    }

    const shows = await Show.find(query)
      .populate('movie', 'title duration rating poster')
      .populate('theatre', 'name address amenities')
      .sort({ date: 1, showTime: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Show.countDocuments(query);

    res.json({
      shows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get shows error:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET /api/shows/:id - Get single show by ID
router.get('/:id', async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate('movie')
      .populate('theatre');

    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    res.json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;