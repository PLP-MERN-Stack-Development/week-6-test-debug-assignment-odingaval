const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).end();
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'testsecret');
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).end();
    req.user = user;
    next();
  } catch {
    res.status(401).end();
  }
}; 