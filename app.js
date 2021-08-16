const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');

dotenv.config();

const app = express();
app.use(express.json())
app.use(express.static(`${__dirname}/public`))


if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use('/api/v1', indexRouter);
app.all('*',(req,res,next)=>{
  res.status(404).json({status:'Failed' ,message: `Can't find the ${req.originalUrl} on the server`});
  next()
  const err = new Error(`Can't find the ${req.originalUrl} on the server`)
  err.status = 'fail';
  err.statusCode = 404;
})

app.use((err,req,res,next)=>{
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})


module.exports = app;