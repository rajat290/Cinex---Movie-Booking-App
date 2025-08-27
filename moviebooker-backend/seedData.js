const mongoose = require('mongoose');
require('dotenv').config();

// Models
const Movie = require('./models/Movie');
const Theatre = require('./models/Theatre');
const Show = require('./models/Show');
const User = require('./models/User');

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moviebooker');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

// Sample data
const sampleMovies = [
  {
    title: "Fighter",
    description: "An action-packed aerial drama about Indian Air Force pilots fighting against terrorism.",
    genre: ["Action", "Drama", "Patriotic"],
    language: ["Hindi", "English"],
    duration: 160,
    rating: "UA",
    imdbRating: 8.2,
    releaseDate: new Date("2024-01-25"),
    poster: "https://example.com/posters/fighter.jpg",
    backdrop: "https://example.com/backdrops/fighter.jpg",
    trailer: "https://youtube.com/watch?v=fg6TUzR1EWA",
    cast: [
      { name: "Hrithik Roshan", role: "Group Captain Shamsher Pathania", image: "https://example.com/actors/hrithik.jpg" },
      { name: "Deepika Padukone", role: "Squadron Leader Minal Rathore", image: "https://example.com/actors/deepika.jpg" },
      { name: "Anil Kapoor", role: "Air Chief Marshal Rakesh Jai Singh", image: "https://example.com/actors/anil.jpg" }
    ],
    crew: [
      { name: "Siddharth Anand", role: "Director", image: "https://example.com/crew/siddharth.jpg" },
      { name: "Ramon Chibb", role: "Cinematographer", image: "https://example.com/crew/ramon.jpg" }
    ],
    formats: ["2D", "3D", "IMAX"],
    status: "running",
    isActive: true
  },
  {
    title: "Teri Baaton Mein Aisa Uljha Jiya",
    description: "A romantic comedy about a man who falls in love with a humanoid robot.",
    genre: ["Romance", "Comedy", "Sci-Fi"],
    language: ["Hindi"],
    duration: 135,
    rating: "UA",
    imdbRating: 7.1,
    releaseDate: new Date("2024-02-09"),
    poster: "https://example.com/posters/teribaaton.jpg",
    cast: [
      { name: "Shahid Kapoor", role: "Aryan", image: "https://example.com/actors/shahid.jpg" },
      { name: "Kriti Sanon", role: "Sifra", image: "https://example.com/actors/kriti.jpg" },
      { name: "Dhairya Karwa", role: "Rohan", image: "https://example.com/actors/dhairya.jpg" }
    ],
    crew: [
      { name: "Amit Joshi", role: "Director", image: "https://example.com/crew/amit.jpg" },
      { name: "Aradhana Sah", role: "Writer", image: "https://example.com/crew/aradhana.jpg" }
    ],
    formats: ["2D", "3D"],
    status: "running",
    isActive: true
  },
  {
    title: "Article 370",
    description: "A political action thriller based on the revocation of Article 370 in Jammu and Kashmir.",
    genre: ["Action", "Thriller", "Political"],
    language: ["Hindi"],
    duration: 140,
    rating: "UA",
    imdbRating: 7.8,
    releaseDate: new Date("2024-02-23"),
    poster: "https://example.com/posters/article370.jpg",
    cast: [
      { name: "Yami Gautam", role: "Zooni Haksar", image: "https://example.com/actors/yami.jpg" },
      { name: "Priyamani", role: "Rajeshwari Swaminathan", image: "https://example.com/actors/priyamani.jpg" }
    ],
    crew: [
      { name: "Aditya Suhas Jambhale", role: "Director", image: "https://example.com/crew/aditya.jpg" }
    ],
    formats: ["2D"],
    status: "running",
    isActive: true
  }
];

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
    amenities: ["Parking", "Food Court", "3D", "IMAX", "Dolby Atmos", "Wheelchair Accessible"],
    screens: [
      {
        screenNumber: 1,
        screenName: "PVR IMAX",
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
      },
      {
        screenNumber: 2,
        screenName: "PVR 4DX",
        totalSeats: 180,
        seatLayout: {
          rows: 8,
          columns: 22,
          seatConfiguration: [
            { row: "A", startSeat: 1, endSeat: 22, seatType: "regular" },
            { row: "B", startSeat: 1, endSeat: 22, seatType: "regular" },
            { row: "C", startSeat: 1, endSeat: 22, seatType: "premium" },
            { row: "D", startSeat: 1, endSeat: 22, seatType: "recliner" }
          ]
        },
        formats: ["2D", "3D", "4DX"],
        isActive: true
      }
    ],
    isActive: true
  },
  {
    name: "INOX Nehru Place",
    address: {
      street: "Nehru Place Metro Station",
      area: "Nehru Place",
      city: "Delhi",
      state: "Delhi",
      pincode: "110019"
    },
    location: {
      type: "Point",
      coordinates: [77.2532, 28.5484]
    },
    contact: {
      phone: "011-26210607",
      email: "nehruplace@inox.com"
    },
    amenities: ["Parking", "Dolby Atmos", "4K Projection", "Food Court"],
    screens: [
      {
        screenNumber: 1,
        screenName: "INOX Screen 1",
        totalSeats: 200,
        seatLayout: {
          rows: 8,
          columns: 25,
          seatConfiguration: [
            { row: "A", startSeat: 1, endSeat: 25, seatType: "regular" },
            { row: "B", startSeat: 1, endSeat: 25, seatType: "regular" },
            { row: "C", startSeat: 1, endSeat: 25, seatType: "regular" },
            { row: "D", startSeat: 1, endSeat: 25, seatType: "premium" }
          ]
        },
        formats: ["2D", "3D"],
        isActive: true
      }
    ],
    isActive: true
  },
  {
    name: "Cinepolis Pacific Mall",
    address: {
      street: "Pacific Mall, Tagore Garden",
      area: "Subhash Nagar",
      city: "Delhi", 
      state: "Delhi",
      pincode: "110018"
    },
    location: {
      type: "Point",
      coordinates: [77.3054, 28.6432]
    },
    contact: {
      phone: "011-45678901",
      email: "pacific@cinepolis.com"
    },
    amenities: ["Parking", "IMAX", "Dolby Vision", "Recliner Seats"],
    screens: [
      {
        screenNumber: 1,
        screenName: "Cinepolis IMAX",
        totalSeats: 220,
        seatLayout: {
          rows: 10,
          columns: 22,
          seatConfiguration: [
            { row: "A", startSeat: 1, endSeat: 22, seatType: "regular" },
            { row: "B", startSeat: 1, endSeat: 22, seatType: "regular" },
            { row: "C", startSeat: 1, endSeat: 22, seatType: "premium" },
            { row: "D", startSeat: 1, endSeat: 22, seatType: "recliner" }
          ]
        },
        formats: ["2D", "3D", "IMAX"],
        isActive: true
      }
    ],
    isActive: true
  }
];

const generateSeats = (theatre, screenNumber) => {
  const screen = theatre.screens.find(s => s.screenNumber === screenNumber);
  if (!screen) return [];
  
  const seats = [];
  screen.seatLayout.seatConfiguration.forEach(config => {
    for (let seatNum = config.startSeat; seatNum <= config.endSeat; seatNum++) {
      seats.push(`${config.row}${seatNum}`);
    }
  });
  
  return seats;
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await Movie.deleteMany({});
    await Theatre.deleteMany({});
    await Show.deleteMany({});

    // Insert movies
    console.log('🎬 Adding movies...');
    const movies = await Movie.insertMany(sampleMovies, { validateBeforeSave: false });
    console.log(`✅ ${movies.length} movies added`);

    // Insert theatres
    console.log('🏪 Adding theatres...');
    const theatres = await Theatre.insertMany(sampleTheatres, { validateBeforeSave: false });
    console.log(`✅ ${theatres.length} theatres added`);

    // Generate shows for next 7 days
    console.log('⏰ Generating shows...');
    const shows = [];
    const showTimes = ['09:30', '13:15', '16:45', '20:00', '22:30'];
    const languages = ['Hindi', 'English'];
    const formats = ['2D', '3D'];

    for (let i = 0; i < 7; i++) {
      const showDate = new Date();
      showDate.setDate(showDate.getDate() + i);
      
      for (const theatre of theatres) {
        for (const screen of theatre.screens) {
          for (const movie of movies) {
            for (const time of showTimes) {
              for (const language of languages) {
                for (const format of formats) {
                  if (movie.formats.includes(format)) {
                    const allSeats = generateSeats(theatre, screen.screenNumber);
                    
                    shows.push({
                      movie: movie._id,
                      theatre: theatre._id,
                      screen: screen.screenName,
                      date: showDate,
                      showTime: time,
                      language: language,
                      format: format,
                      pricing: [
                        { seatType: "regular", price: 250 + (i * 10) }, // Dynamic pricing
                        { seatType: "premium", price: 350 + (i * 10) },
                        { seatType: "recliner", price: 500 + (i * 15) }
                      ],
                      availableSeats: allSeats,
                      bookedSeats: [],
                      blockedSeats: [],
                      totalSeats: allSeats.length,
                      status: "active"
                    });
                  }
                }
              }
            }
          }
        }
      }
    }

    // Insert shows
    const createdShows = await Show.insertMany(shows);
    console.log(`✅ ${createdShows.length} shows generated`);

    console.log('🎉 Seed data completed successfully!');
    console.log('\n📊 SUMMARY:');
    console.log(`   Movies: ${movies.length}`);
    console.log(`   Theatres: ${theatres.length}`);
    console.log(`   Shows: ${createdShows.length}`);
    console.log(`   Total seats available: ${createdShows.reduce((sum, show) => sum + show.availableSeats.length, 0)}`);

    process.exit(0);

  } catch (error) {
    console.error('❌ Seed data error:', error);
    process.exit(1);
  }
};

// Run seed data
seedData();