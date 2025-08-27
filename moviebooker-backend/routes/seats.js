const express = require('express');
const { getSeats, blockSeats, releaseSeats } = require('../controllers/seatController');
const router = express.Router();

// GET /api/shows/:showId/seats - Get seat availability for a show
router.get('/:showId/seats', getSeats);

// POST /api/shows/:showId/block-seats - Temporarily block seats
router.post('/:showId/block-seats', blockSeats);

// POST /api/shows/:showId/release-seats - Release blocked seats
router.post('/:showId/release-seats', releaseSeats);

module.exports = router;
