const mongoose = require('mongoose');

const TrendingItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rank: { type: Number, required: true },
  type: { type: String, enum: ['movie', 'event', 'show', 'other'], default: 'other' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrendingItem', TrendingItemSchema);
