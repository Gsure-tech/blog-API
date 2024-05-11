const jwtUtils = require('../utils/jwtUtils');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Assumes Bearer token
    const decoded = jwtUtils.verifyToken(token);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication failed'
    });
  }
};

module.exports = {
  authenticate
};
