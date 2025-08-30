const mongoose = require('mongoose');

const RecentSearchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  searchTerm: { type: String, required: true },
  searchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RecentSearch', RecentSearchSchema);
