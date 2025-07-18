module.exports = (err, req, res, next) => {
  console.error('--- ERROR HANDLER ---');
  console.error('Request:', req.method, req.originalUrl);
  console.error('Body:', req.body);
  console.error('Error:', err);
  if (err.stack) console.error('Stack:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
}; 