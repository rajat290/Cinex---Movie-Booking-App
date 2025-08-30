const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const auth = require('../middleware/auth'); // Authentication middleware

// Public routes
router.get('/trending', searchController.getTrendingItems);
router.get('/categories', searchController.getCategories);
router.get('/search', searchController.search);

// Authenticated routes
router.get('/recent', auth, searchController.getRecentSearches);
router.post('/recent', auth, searchController.addRecentSearch);

module.exports = router;
