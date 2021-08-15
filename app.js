const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');

dotenv.config();

const app = express();
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.all('*',(req,res,next)=>{
  res.status(404).json({status:'Failed' ,message: `Can't find the ${req.originalUrl} on the server`})
})

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use('/api/v1', indexRouter);


app.get('/', (_req, res) => {
  res.redirect('/api/v1');
});


module.exports = app;