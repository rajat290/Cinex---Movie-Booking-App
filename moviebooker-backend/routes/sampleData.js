const express = require('express');
const Movie = require('../models/Movie');
const Theatre = require('../models/Theatre');
const Show = require('../models/Show');
const router = express.Router();

// POST /api/sample-data/movies - Add sample movies
router.post('/movies', async (req, res) => {
  try {
    const sampleMovies = [
      {
        title: "Fighter",
        description: "An action-packed aerial drama about Indian Air Force pilots.",
        genre: ["Action", "Drama", "Patriotic"],
        language: ["Hindi", "English"],
        duration: 160,
        rating: "UA",
        imdbRating: 8.2,
        releaseDate: new Date("2024-01-25"),
        poster: "https://example.com/posters/fighter.jpg",
        backdrop: "https://example.com/backdrops/fighter.jpg",
        trailer: "https://youtube.com/watch?v=abcdefg",
        cast: [
          { name: "Hrithik Roshan", role: "Group Captain Shamsher Pathania", image: "https://example.com/actors/hrithik.jpg" },
          { name: "Deepika Padukone", role: "Squadron Leader Minal Rathore", image: "https://example.com/actors/deepika.jpg" }
        ],
        crew: [
          { name: "Siddharth Anand", role: "Director", image: "https://example.com/crew/siddharth.jpg" }
        ],
        formats: ["2D", "3D", "IMAX"],
        status: "running",
        isActive: true
      },
      {
        title: "Teri Baaton Mein Aisa Uljha Jiya",
        description: "A romantic comedy about a man who falls in love with a robot.",
        genre: ["Romance", "Comedy", "Sci-Fi"],
        language: ["Hindi"],
        duration: 135,
        rating: "UA",
        imdbRating: 7.1,
        releaseDate: new Date("2024-02-09"),
        poster: "https://example.com/posters/teribaaton.jpg",
        cast: [
          { name: "Shahid Kapoor", role: "Aryan", image: "https://example.com/actors/shahid.jpg" },
          { name: "Kriti Sanon", role: "Sifra", image: "https://example.com/actors/kriti.jpg" }
        ],
        crew: [
          { name: "Amit Joshi", role: "Director", image: "https://example.com/crew/amit.jpg" }
        ],
        formats: ["2D", "3D"],
        status: "running",
        isActive: true
      }
    ];

    await Movie.deleteMany({});
    const movies = await Movie.insertMany(sampleMovies);

    res.json({ message: 'Sample movies added', count: movies.length, movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ... existing imports and movie route ...

// POST /api/sample-data/theatres - Add sample theatres with screens
router.post('/theatres', async (req, res) => {
  try {
    const sampleTheatres = [
      {
        name: "PVR Select City Walk",
        address: {
          street: "Select Citywalk Mall, A-3",
          area: "Saket",
          city: "Delhi",
          state: "Delhi",
          pincode: "110017"
        },
        location: {
          type: "Point",
          coordinates: [77.2090, 28.5275]
        },
        contact: {
          phone: "011-33105607",
          email: "saket@pvr.com"
        },
        amenities: ["Parking", "Food Court", "3D", "IMAX", "Dolby Atmos"],
        screens: [
          {
            screenNumber: 1,
            screenName: "Screen 1 - IMAX",
            totalSeats: 250,
            seatLayout: {
              rows: 10,
              columns: 25,
              seatConfiguration: [
                { row: "A", startSeat: 1, endSeat: 25, seatType: "regular" },
                { row: "B", startSeat: 1, endSeat: 25, seatType: "regular" },
                { row: "C", startSeat: 1, endSeat: 25, seatType: "premium" },
                { row: "D", startSeat: 1, endSeat: 25, seatType: "premium" },
                { row: "E", startSeat: 1, endSeat: 25, seatType: "recliner" }
              ]
            },
            formats: ["2D", "3D", "IMAX"],
            isActive: true
          }
        ],
        isActive: true
      }
    ];

    await Theatre.deleteMany({});
    const theatres = await Theatre.insertMany(sampleTheatres);

    res.json({ message: 'Sample theatres added', count: theatres.length, theatres });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/sample-data/shows - Add sample shows
router.post('/shows', async (req, res) => {
  try {
    const movies = await Movie.find({});
    const theatres = await Theatre.find({}).populate('screens');

    if (movies.length === 0 || theatres.length === 0) {
      return res.status(400).json({ message: 'Please add movies and theatres first' });
    }

    const sampleShows = [];
    const showTimes = ['09:30', '13:15', '16:45', '20:00'];
    const languages = ['Hindi', 'English'];
    const formats = ['2D', '3D'];

    // Create shows for next 7 days
    for (let i = 0; i < 7; i++) {
      const showDate = new Date();
      showDate.setDate(showDate.getDate() + i);

      theatres.forEach(theatre => {
        theatre.screens.forEach(screen => {
          movies.forEach(movie => {
            showTimes.forEach(time => {
              languages.forEach(language => {
                formats.forEach(format => {
                  // Generate all seats for this screen
                  const allSeats = theatre.generateSeatsForScreen(screen.screenNumber);
                  const availableSeats = allSeats.map(seat => seat.seatNumber);

                  sampleShows.push({
                    movie: movie._id,
                    theatre: theatre._id,
                    screen: screen.screenName,
                    date: showDate,
                    showTime: time,
                    language: language,
                    format: format,
                    pricing: [
                      { seatType: "regular", price: 250 },
                      { seatType: "premium", price: 350 },
                      { seatType: "recliner", price: 500 }
                    ],
                    availableSeats: availableSeats,
                    bookedSeats: [],
                    blockedSeats: [],
                    totalSeats: availableSeats.length,
                    status: "active"
                  });
                });
              });
            });
          });
        });
      });
    }

    await Show.deleteMany({});
    const shows = await Show.insertMany(sampleShows);

    res.json({ message: 'Sample shows added', count: shows.length, shows });
  } catch (error) {
    console.error('Add shows error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

module.exports = router;