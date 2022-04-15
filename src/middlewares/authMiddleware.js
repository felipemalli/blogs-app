const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token is missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
}

module.exports = { authMiddleware };