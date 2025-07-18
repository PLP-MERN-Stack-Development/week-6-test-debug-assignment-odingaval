const jwt = require('jsonwebtoken');
 
exports.generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
}; 