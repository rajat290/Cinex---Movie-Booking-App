const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String }
  },
  amenities: [{ type: String }],
  screens: [{
    screenNumber: { type: Number, required: true },
    screenName: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    seatLayout: {
      rows: { type: Number, required: true },
      columns: { type: Number, required: true },
      seatConfiguration: [{
        row: { type: String, required: true }, // 'A', 'B', 'C'
        startSeat: { type: Number, required: true }, // 1
        endSeat: { type: Number, required: true }, // 20
        seatType: { 
          type: String, 
          enum: ['regular', 'premium', 'recliner'], 
          required: true 
        }
      }]
    },
    formats: [{ type: String, enum: ['2D', '3D', 'IMAX', '4DX'] }],
    isActive: { type: Boolean, default: true }
  }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Generate seats array for a screen
theatreSchema.methods.generateSeatsForScreen = function(screenNumber) {
  const screen = this.screens.find(s => s.screenNumber === screenNumber);
  if (!screen) return [];
  
  const seats = [];
  screen.seatLayout.seatConfiguration.forEach(config => {
    for (let seatNum = config.startSeat; seatNum <= config.endSeat; seatNum++) {
      seats.push({
        seatNumber: `${config.row}${seatNum}`,
        seatType: config.seatType,
        row: config.row,
        number: seatNum
      });
    }
  });
  
  return seats;
};

theatreSchema.index({ location: '2dsphere' });
theatreSchema.index({ 'address.city': 1 });

module.exports = mongoose.model('Theatre', theatreSchema);