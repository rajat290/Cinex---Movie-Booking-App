const auth = require('./auth');

const adminAuth = async (req, res, next) => {
  try {
    // First check regular authentication
    await auth(req, res, () => {});
    
    // Then check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = adminAuth;