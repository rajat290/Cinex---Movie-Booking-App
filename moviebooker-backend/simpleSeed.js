const mongoose = require('mongoose');
require('dotenv').config();

// Models
const Movie = require('./models/Movie');
const Theatre = require('./models/Theatre');
const Show = require('./models/Show');

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

const simpleSeed = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await Movie.deleteMany({});
    await Theatre.deleteMany({});
    await Show.deleteMany({});

    // Add one simple movie
    console.log('🎬 Adding movie...');
    const movie = new Movie({
      title: "Fighter",
      description: "An action-packed aerial drama about Indian Air Force pilots fighting against terrorism.",
      genre: ["Action", "Drama"],
      language: ["Hindi"],
      duration: 160,
      rating: "UA",
      imdbRating: 8.2,
      releaseDate: new Date("2024-01-25"),
      poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
      cast: [
        { name: "Hrithik Roshan", role: "Group Captain Shamsher Pathania" },
        { name: "Deepika Padukone", role: "Squadron Leader Minal Rathore" }
      ],
      crew: [
        { name: "Siddharth Anand", role: "Director" }
      ],
      formats: ["2D", "3D"],
      status: "running",
      isActive: true
    });
    
    await movie.save();
    console.log('✅ Movie added:', movie.title);

    // Add one simple theatre
    console.log('🏪 Adding theatre...');
    const theatre = new Theatre({
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
      amenities: ["Parking", "Food Court"],
      screens: [
        {
          screenNumber: 1,
          screenName: "PVR Screen 1",
          totalSeats: 100,
          seatLayout: {
            rows: 5,
            columns: 20,
            seatConfiguration: [
              { row: "A", startSeat: 1, endSeat: 20, seatType: "regular" },
              { row: "B", startSeat: 1, endSeat: 20, seatType: "regular" },
              { row: "C", startSeat: 1, endSeat: 20, seatType: "premium" },
              { row: "D", startSeat: 1, endSeat: 20, seatType: "premium" },
              { row: "E", startSeat: 1, endSeat: 20, seatType: "recliner" }
            ]
          },
          formats: ["2D", "3D"],
          isActive: true
        }
      ],
      isActive: true
    });
    
    await theatre.save();
    console.log('✅ Theatre added:', theatre.name);

    // Generate seats
    const seats = [];
    for (let row = 0; row < 5; row++) {
      const rowLetter = String.fromCharCode(65 + row); // A, B, C, D, E
      for (let seat = 1; seat <= 20; seat++) {
        seats.push(`${rowLetter}${seat}`);
      }
    }

    // Add one show
    console.log('⏰ Adding show...');
    const show = new Show({
      movie: movie._id,
      theatre: theatre._id,
      screen: "PVR Screen 1",
      date: new Date(),
      showTime: "20:00",
      language: "Hindi",
      format: "2D",
      pricing: [
        { seatType: "regular", price: 250 },
        { seatType: "premium", price: 350 },
        { seatType: "recliner", price: 500 }
      ],
      availableSeats: seats,
      bookedSeats: [],
      blockedSeats: [],
      totalSeats: seats.length,
      status: "active"
    });
    
    await show.save();
    console.log('✅ Show added');

    console.log('🎉 Simple seed completed!');
    console.log(`Movie ID: ${movie._id}`);
    console.log(`Theatre ID: ${theatre._id}`);
    console.log(`Show ID: ${show._id}`);

    process.exit(0);

  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

simpleSeed();


//  const events = [
//     {
//       id: "event-1",
//       title: "Stand-Up Comedy Night",
//       subtitle: "Featuring top comedians",
//       image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
//       rating: 9.1,
//       duration: "2h 30m",
//       location: "Comedy Club Mumbai",
//       price: "299",
//       category: "Comedy"
//     },
//     {
//       id: "concert-1", 
//       title: "Rock Concert Live",
//       subtitle: "Greatest hits of all time",
//       image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
//       rating: 9.5,
//       duration: "3h 15m",
//       location: "Stadium Arena",
//       price: "899",
//       category: "Music"
//     }
//   ];

//   events.forEach(async (event) => {
//     const newEvent = new Event(event);
//     await newEvent.save();
//     console.log('✅ Event added:', event.title);
//   });
