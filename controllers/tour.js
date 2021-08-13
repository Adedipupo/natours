const express = require('express');
const { TourModel } = require('../models/tourModel');


exports.createTour = async(req,res)=>{
    const {name,rating,price} = req.body;

    const tour = await TourModel.create(req.body);
}

exports.getAllTours = (req,res)=>{
    return res.status(200).json({msg: 'Success',results: tours.length, data: tours})
}

