const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie', 
    required: true 
  },
  theatre: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Theatre', 
    required: true 
  },
  screen: { 
    type: String, 
    required: true 
  }, // Screen number or name
  date: { 
    type: Date, 
    required: true 
  }, // Show date
  showTime: { 
    type: String, 
    required: true 
  }, // '09:30', '13:15', '18:45'
  language: { 
    type: String, 
    required: true 
  }, // 'Hindi', 'English'
  format: { 
    type: String, 
    enum: ['2D', '3D', 'IMAX', '4DX'], 
    required: true 
  },
  pricing: [{
    seatType: { 
      type: String, 
      enum: ['regular', 'premium', 'recliner'], 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    }
  }],
  availableSeats: [{ 
    type: String 
  }], // ['A1', 'A2', 'B1', 'B2']
  bookedSeats: [{ 
    type: String 
  }],
  blockedSeats: [{
    seat: { type: String },
    blockedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date } // 5-10 minutes for booking completion
  }],
  totalSeats: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['active', 'cancelled', 'completed'], 
    default: 'active' 
  }
}, {
  timestamps: true
});

// Indexes for fast querying
showSchema.index({ movie: 1, theatre: 1 });
showSchema.index({ date: 1, showTime: 1 });
showSchema.index({ theatre: 1, date: 1 });
showSchema.index({ status: 1 });
showSchema.index({ 'blockedSeats.expiresAt': 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Show', showSchema);