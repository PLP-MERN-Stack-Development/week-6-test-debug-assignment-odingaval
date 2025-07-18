const errorHandler = require('../../src/middleware/errorHandler');

describe('errorHandler middleware', () => {
  it('should log error and send 500 response', () => {
    const err = new Error('fail');
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    console.error = jest.fn();
    errorHandler(err, req, res, next);
    // Check that console.error was called with the error object at least once
    expect(console.error.mock.calls.flat()).toContain(err);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
}); 