const express = require('express');
const indexRouter = require('./routes/index.js');


const app = express();

app.use(express.json())

const port = process.env.PORT || 8080;



app.use('/api/v1', indexRouter);

app.get('/', (_req, res) => {
    res.redirect('/api/v1');
  });

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})