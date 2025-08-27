const mongoose = require('mongoose');
const Show = require('./models/Show');
const Movie = require('./models/Movie');
const Theatre = require('./models/Theatre');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function addTestShow() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // First, check if we have any movies and theatres
    const movies = await Movie.find({});
    const theatres = await Theatre.find({});

    if (movies.length === 0 || theatres.length === 0) {
      console.log('No movies or theatres found. Creating test data...');
      
      // Create a test movie
      const movie = new Movie({
        title: "Test Movie",
        description: "A test movie for development",
        genre: ["Action"],
        language: ["English"],
        duration: 120,
        rating: "UA",
        releaseDate: new Date(),
        poster: "https://example.com/poster.jpg",
        status: "running",
        isActive: true
      });
      await movie.save();

      // Create a test theatre
      const theatre = new Theatre({
        name: "Test Theatre",
        address: {
          street: "Test Street",
          area: "Test Area",
          city: "Test City",
          state: "Test State",
          pincode: "123456"
        },
        contact: {
          phone: "1234567890",
          email: "test@theatre.com"
        },
        amenities: ["Parking"],
        screens: [{
          screenNumber: 1,
          screenName: "Screen 1",
          totalSeats: 50,
          seatLayout: {
            rows: 5,
            columns: 10,
            seatConfiguration: [
              { row: "A", startSeat: 1, endSeat: 10, seatType: "regular" },
              { row: "B", startSeat: 1, endSeat: 10, seatType: "regular" },
              { row: "C", startSeat: 1, endSeat: 10, seatType: "regular" },
              { row: "D", startSeat: 1, endSeat: 10, seatType: "regular" },
              { row: "E", startSeat: 1, endSeat: 10, seatType: "regular" }
            ]
          },
          formats: ["2D"],
          isActive: true
        }],
        isActive: true
      });
      await theatre.save();

      // Create seats for the show
      const availableSeats = [];
      for (let row = 0; row < 5; row++) {
        for (let seat = 1; seat <= 10; seat++) {
          availableSeats.push(`${String.fromCharCode(65 + row)}${seat}`);
        }
      }

      // Create a test show
      const show = new Show({
        movie: movie._id,
        theatre: theatre._id,
        screen: "Screen 1",
        date: new Date(),
        showTime: "18:00",
        language: "English",
        format: "2D",
        pricing: [{ seatType: "regular", price: 200 }],
        availableSeats: availableSeats,
        bookedSeats: [],
        blockedSeats: [],
        totalSeats: availableSeats.length,
        status: "active"
      });

      await show.save();
      console.log('Test show created with ID:', show._id);
      console.log('Available seats:', availableSeats.slice(0, 10)); // Show first 10 seats

      mongoose.connection.close();
      return show._id;
    } else {
      console.log('Movies and theatres already exist. Creating a show...');
      
      // Use existing movie and theatre
      const movie = movies[0];
      const theatre = theatres[0];
      
      // Create seats for the show
      const availableSeats = [];
      for (let row = 0; row < 5; row++) {
        for (let seat = 1; seat <= 10; seat++) {
          availableSeats.push(`${String.fromCharCode(65 + row)}${seat}`);
        }
      }

      const show = new Show({
        movie: movie._id,
        theatre: theatre._id,
        screen: "Screen 1",
        date: new Date(),
        showTime: "18:00",
        language: "English",
        format: "2D",
        pricing: [{ seatType: "regular", price: 200 }],
        availableSeats: availableSeats,
        bookedSeats: [],
        blockedSeats: [],
        totalSeats: availableSeats.length,
        status: "active"
      });

      await show.save();
      console.log('Test show created with ID:', show._id);
      console.log('Available seats:', availableSeats.slice(0, 10));

      mongoose.connection.close();
      return show._id;
    }
  } catch (error) {
    console.error('Error creating test show:', error);
    mongoose.connection.close();
    throw error;
  }
}

addTestShow();
