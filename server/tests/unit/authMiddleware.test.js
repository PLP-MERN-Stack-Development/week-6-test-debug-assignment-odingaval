const auth = require('../../src/middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/User');

jest.mock('jsonwebtoken');
jest.mock('../../src/models/User');

describe('auth middleware', () => {
  let req, res, next;
  beforeEach(() => {
    req = { headers: {} };
    res = { status: jest.fn().mockReturnThis(), end: jest.fn() };
    next = jest.fn();
  });

  it('should return 401 if no auth header', async () => {
    await auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.end).toHaveBeenCalled();
  });

  it('should return 401 if token invalid', async () => {
    req.headers.authorization = 'Bearer badtoken';
    jwt.verify.mockImplementation(() => { throw new Error('bad'); });
    await auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.end).toHaveBeenCalled();
  });

  it('should return 401 if user not found', async () => {
    req.headers.authorization = 'Bearer goodtoken';
    jwt.verify.mockReturnValue({ id: 'u1' });
    User.findById.mockResolvedValue(null);
    await auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.end).toHaveBeenCalled();
  });

  it('should set req.user and call next if valid', async () => {
    req.headers.authorization = 'Bearer goodtoken';
    jwt.verify.mockReturnValue({ id: 'u1' });
    User.findById.mockResolvedValue({ _id: 'u1' });
    await auth(req, res, next);
    expect(req.user).toEqual({ _id: 'u1' });
    expect(next).toHaveBeenCalled();
  });
}); 