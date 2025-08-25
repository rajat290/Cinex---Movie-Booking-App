const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

// GET /api/movies - Get all movies with filters
router.get('/', async (req, res) => {
  try {
    const { 
      city, 
      language, 
      genre, 
      format, 
      status = 'running',
      page = 1, 
      limit = 20,
      search 
    } = req.query;

    // Build query
    let query = { isActive: true };

    // Status filter
    if (status && status !== 'all') {
      query.status = status;
    }

    // Language filter
    if (language) {
      query.language = { $in: language.split(',') };
    }

    // Genre filter
    if (genre) {
      query.genre = { $in: genre.split(',') };
    }

    // Format filter
    if (format) {
      query.formats = { $in: format.split(',') };
    }

    // Search filter
    if (search) {
      query.$text = { $search: search };
    }

    const movies = await Movie.find(query)
      .select('-__v')
      .sort({ releaseDate: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Movie.countDocuments(query);

    res.json({
      movies,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get movies error:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET /api/movies/:id - Get single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/movies/genres/list - Get all available genres
router.get('/genres/list', async (req, res) => {
  try {
    const genres = await Movie.distinct('genre');
    res.json({ genres: genres.sort() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/movies/languages/list - Get all available languages
router.get('/languages/list', async (req, res) => {
  try {
    const languages = await Movie.distinct('language');
    res.json({ languages: languages.sort() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;