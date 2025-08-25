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
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Geospatial index for nearby searches
theatreSchema.index({ location: '2dsphere' });
// City index for fast filtering
theatreSchema.index({ 'address.city': 1 });

module.exports = mongoose.model('Theatre', theatreSchema);