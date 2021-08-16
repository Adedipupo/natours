const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error');

dotenv.config();

const app = express();
app.use(express.json())
app.use(express.static(`${__dirname}/public`))


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', indexRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} on the server`,404))
})

app.use(globalErrorHandler )


module.exports = app;