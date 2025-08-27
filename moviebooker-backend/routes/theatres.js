const express = require('express');
const { getTheatres, getTheatreById } = require('../controllers/theatreController');
const router = express.Router();

// GET /api/theatres?city=Delhi&page=1&limit=10
router.get('/', getTheatres);

// GET /api/theatres/:id - Single theatre by ID
router.get('/:id', getTheatreById);

module.exports = router;
