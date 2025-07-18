const { generateToken } = require('../../src/utils/auth');
const jwt = require('jsonwebtoken');

describe('generateToken', () => {
  it('should generate a valid JWT containing the user id', () => {
    const user = { _id: '507f1f77bcf86cd799439011' };
    const token = generateToken(user);
    expect(typeof token).toBe('string');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'testsecret');
    expect(decoded).toHaveProperty('id', user._id);
  });
}); 