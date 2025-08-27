const express = require('express');
const { getShows, getShowById, getMovieTheatres } = require('../controllers/showController');
const router = express.Router();

// GET /api/shows - Get shows with filters
router.get('/', getShows);

// GET /api/shows/:id - Get single show by ID
router.get('/:id', getShowById);

// GET /api/shows/movie/:movieId/theatres - Get theatres running a movie
router.get('/movie/:movieId/theatres', getMovieTheatres);

module.exports = router;
