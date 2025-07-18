module.exports = (req, res, next) => {
  const start = Date.now();
  req._startTime = start;
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
}; 