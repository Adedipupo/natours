const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');

dotenv.config();

const app = express();
app.use(express.json())

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

app.use('/api/v1', indexRouter);

app.get('/', (_req, res) => {
  res.redirect('/api/v1');
});


module.exports = app;