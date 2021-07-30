const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json())

const port = process.env.PORT || 8080;


const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);

app.get('/api/v1/tours', (req,res)=>{
    return res.status(200).json({msg: 'Success', data: tours})
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})