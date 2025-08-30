const mongoose = require('mongoose');
require('dotenv').config();

// Direct database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moviebooker');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

const quickSeed = async () => {
  try {
    await connectDB();

    // Clear collections
    await mongoose.connection.db.collection('movies').deleteMany({});
    await mongoose.connection.db.collection('theatres').deleteMany({});
    await mongoose.connection.db.collection('shows').deleteMany({});

    // Insert movie directly
    const movieResult = await mongoose.connection.db.collection('movies').insertOne({
      title: "Fighter",
      description: "An action-packed aerial drama about Indian Air Force pilots fighting against terrorism.",
      genre: ["Action", "Drama"],
      language: "Hindi",
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
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('✅ Movie inserted:', movieResult.insertedId);

    // Insert theatre
    const theatreResult = await mongoose.connection.db.collection('theatres').insertOne({
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
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('✅ Theatre inserted:', theatreResult.insertedId);

    // Generate seats
    const seats = [];
    for (let row = 0; row < 5; row++) {
      const rowLetter = String.fromCharCode(65 + row);
      for (let seat = 1; seat <= 20; seat++) {
        seats.push(`${rowLetter}${seat}`);
      }
    }

    // Insert show
    const showResult = await mongoose.connection.db.collection('shows').insertOne({
      movie: movieResult.insertedId,
      theatre: theatreResult.insertedId,
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
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('✅ Show inserted:', showResult.insertedId);

    console.log('🎉 Quick seed completed!');
    console.log(`Movie ID: ${movieResult.insertedId}`);
    console.log(`Theatre ID: ${theatreResult.insertedId}`);
    console.log(`Show ID: ${showResult.insertedId}`);

    process.exit(0);

  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

quickSeed();
