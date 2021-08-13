const express = require('express');


exports.createTour = (req,res)=>{
    const {name,rating,price} = req.body;
}

exports.getAllTours = (req,res)=>{
    return res.status(200).json({msg: 'Success',results: tours.length, data: tours})
}

