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

module.exports = router;