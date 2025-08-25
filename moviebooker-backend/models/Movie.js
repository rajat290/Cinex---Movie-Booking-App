const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  genre: [{ 
    type: String, 
    required: true 
  }], // ['Action', 'Drama', 'Comedy']
  language: [{ 
    type: String, 
    required: true 
  }], // ['Hindi', 'English']
  duration: { 
    type: Number, 
    required: true 
  }, // in minutes
  rating: { 
    type: String, 
    enum: ['U', 'UA', 'A', 'S'], 
    required: true 
  }, // Certification
  imdbRating: { 
    type: Number, 
    min: 0, 
    max: 10 
  },
  releaseDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date 
  },
  poster: { 
    type: String, 
    required: true 
  }, // URL
  backdrop: { 
    type: String 
  }, // URL
  trailer: { 
    type: String 
  }, // YouTube URL
  cast: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String }
  }],
  crew: [{
    name: { type: String, required: true },
    role: { type: String, required: true }, // Director, Producer, etc.
    image: { type: String }
  }],
  formats: [{ 
    type: String, 
    enum: ['2D', '3D', 'IMAX', '4DX'] 
  }],
  status: { 
    type: String, 
    enum: ['upcoming', 'running', 'ended'], 
    default: 'upcoming' 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

// Indexes for better performance
movieSchema.index({ title: 'text' });
movieSchema.index({ releaseDate: -1 });
movieSchema.index({ status: 1, isActive: 1 });
movieSchema.index({ genre: 1 });
movieSchema.index({ language: 1 });

module.exports = mongoose.model('Movie', movieSchema);