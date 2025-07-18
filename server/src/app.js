const express = require('express');
const postsRouter = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const performanceLogger = require('./middleware/performanceLogger');
const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());

app.use(requestLogger);
app.use(performanceLogger);
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);

module.exports = app; 