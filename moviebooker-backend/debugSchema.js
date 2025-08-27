const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function debugSchema() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if there are any existing documents that might be causing issues
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    // Check if there are any existing movies
    const Movie = require('./models/Movie');
    const movies = await Movie.find({});
    console.log('Existing movies:', movies.length);

    if (movies.length > 0) {
      console.log('First movie:', {
        _id: movies[0]._id,
        title: movies[0].title,
        language: movies[0].language,
        languageType: typeof movies[0].language,
        language0Type: typeof movies[0].language[0]
      });
    }

    // Try to create a simple test document to see what happens
    try {
      const testMovie = new Movie({
        title: "Debug Test Movie",
        description: "Debug test",
        genre: ["Test"],
        language: ["English"], // Make sure this is an array of strings
        duration: 100,
        rating: "UA",
        releaseDate: new Date(),
        poster: "test.jpg",
        status: "running",
        isActive: true
      });
      
      await testMovie.save();
      console.log('Test movie saved successfully');
    } catch (movieError) {
      console.error('Error saving test movie:', movieError.message);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Debug error:', error);
    mongoose.connection.close();
  }
}

debugSchema();
