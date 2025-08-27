const Theatre = require('../models/Theatre');

// Get theatres with filters
const getTheatres = async (req, res) => {
  try {
    const { city, page = 1, limit = 10, longitude, latitude, maxDistance = 10 } = req.query;
    
    let query = { isActive: true };

    // City-based filtering
    if (city) {
      query['address.city'] = new RegExp(city, 'i');
    }

    // Location-based filtering (nearby theatres)
    if (longitude && latitude) {
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseFloat(maxDistance) * 1000 // Convert km to meters
        }
      };
    }

    const theatres = await Theatre.find(query)
      .select('-__v')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ 'address.city': 1, name: 1 });

    const total = await Theatre.countDocuments(query);

    res.json({
      theatres,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single theatre by ID
const getTheatreById = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);
    if (!theatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }
    res.json(theatre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTheatres,
  getTheatreById
};
