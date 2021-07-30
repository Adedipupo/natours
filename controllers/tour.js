const express = require('express');
const fs = require('fs');


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


const getAllTours = (req,res)=>{
    return res.status(200).json({msg: 'Success',results: tours.length, data: tours})
}

module.exports = {getAllTours}