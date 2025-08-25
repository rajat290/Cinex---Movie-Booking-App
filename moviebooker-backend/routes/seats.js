const express = require('express');
const Show = require('../models/Show');
const Theatre = require('../models/Theatre');
const { auth } = require('../middleware/auth');
const router = express.Router();

// GET /api/shows/:showId/seats - Get seat availability for a show
router.get('/:showId/seats', async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId)
      .populate('theatre', 'name screens');
    
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    const availableSeats = show.getAvailableSeats();
    const bookedSeats = show.bookedSeats || [];
    const blockedSeats = show.blockedSeats.map(bs => bs.seat);

    // Get seat pricing and types
    const seatPricing = {};
    show.pricing.forEach(price => {
      seatPricing[price.seatType] = price.price;
    });

    // Get seat layout from theatre
    const theatre = await Theatre.findById(show.theatre._id);
    const screen = theatre.screens.find(s => s.screenName === show.screen);
    const allSeats = theatre.generateSeatsForScreen(screen.screenNumber);

    const seatMap = allSeats.map(seat => ({
      seatNumber: seat.seatNumber,
      seatType: seat.seatType,
      price: seatPricing[seat.seatType] || 0,
      status: bookedSeats.includes(seat.seatNumber) ? 'booked' : 
              blockedSeats.includes(seat.seatNumber) ? 'blocked' : 'available',
      row: seat.row,
      number: seat.number
    }));

    res.json({
      show: {
        id: show._id,
        movie: show.movie,
        theatre: show.theatre.name,
        screen: show.screen,
        date: show.date,
        time: show.showTime,
        language: show.language,
        format: show.format
      },
      seatMap,
      availableSeats,
      bookedSeats,
      blockedSeats,
      pricing: show.pricing
    });
  } catch (error) {
    console.error('Get seats error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/shows/:showId/block-seats - Temporarily block seats
router.post('/:showId/block-seats', async (req, res) => {
  try {
    const { seats, timeoutMinutes = 5 } = req.body;
    
    const show = await Show.findById(req.params.showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    const blockedSeats = show.blockSeats(seats, timeoutMinutes);
    await show.save();

    res.json({
      message: 'Seats blocked successfully',
      blockedSeats,
      expiresIn: timeoutMinutes * 60 // seconds
    });
  } catch (error) {
    console.error('Block seats error:', error);
    res.status(400).json({ message: error.message });
  }
});

// POST /api/shows/:showId/release-seats - Release blocked seats
router.post('/:showId/release-seats', async (req, res) => {
  try {
    const { seats } = req.body;
    
    const show = await Show.findById(req.params.showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    show.releaseSeats(seats);
    await show.save();

    res.json({ message: 'Seats released successfully', releasedSeats: seats });
  } catch (error) {
    console.error('Release seats error:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;