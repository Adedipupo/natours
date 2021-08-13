const express = require('express');
const { TourModel } = require('../models/tourModel');


exports.createTour = async(req,res)=>{
    try {
        const {name,rating,price} = req.body;

    const tour = await TourModel.create(req.body);
    if(tour){
        return res.status(201).json({message: 'Success', data: tour})
    }        
    } catch (error) {
     return res.status(400).json({message: error.message})   
    }

}

exports.getAllTours = async(req,res)=>{
    try {
        const tours = await TourModel.find();
        return res.status(200).json({msg: 'Success',results: tours.length, data: tours})
    } catch (error) {
        return res.status(400).json({message: error.message})   
    }
}

exports.deleteTours = async(req,res)=>{
    try {
        const {id} = req.params;
        const tour = await TourModel.findByIdAndRemove(id);

        if(tour){
            return res.status(200).json({message: 'Deleted Successfully !!!'})
        }
    } catch (error) {
        
    }
}