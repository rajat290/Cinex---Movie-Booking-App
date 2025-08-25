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
// GET /api/shows/movie/:movieId/theatres - Get theatres running a movie
router.get('/movie/:movieId/theatres', async (req, res) => {
  try {
    const { city, date } = req.query;
    
    let query = { 
      movie: req.params.movieId, 
      status: 'active' 
    };

    // City filter
    if (city) {
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

    const shows = await Show.find(query)
      .populate('theatre', 'name address amenities')
      .select('theatre date showTime language format')
      .sort({ date: 1, showTime: 1 });

    // Group by theatre
    const theatresMap = new Map();
    shows.forEach(show => {
      if (!theatresMap.has(show.theatre._id.toString())) {
        theatresMap.set(show.theatre._id.toString(), {
          theatre: show.theatre,
          shows: []
        });
      }
      theatresMap.get(show.theatre._id.toString()).shows.push({
        id: show._id,
        date: show.date,
        showTime: show.showTime,
        language: show.language,
        format: show.format
      });
    });

    const theatres = Array.from(theatresMap.values());

    res.json({ theatres });
  } catch (error) {
    console.error('Get movie theatres error:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;