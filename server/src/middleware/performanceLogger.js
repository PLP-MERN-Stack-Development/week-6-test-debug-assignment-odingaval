module.exports = (req, res, next) => {
  const start = req._startTime || Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Request to ${req.method} ${req.originalUrl} took ${duration}ms`);
  });
  next();
}; 