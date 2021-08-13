const express = require('express');
const morgan = require('morgan');

const indexRouter = require('./routes/index');


const app = express();
app.use(morgan('dev'));
app.use(express.json())


app.use((req,res,next) => {
  req.requestTime = new Date().toISOString();
  next();
})

app.use('/api/v1', indexRouter);

app.get('/', (_req, res) => {
  res.redirect('/api/v1');
});


module.exports = app;