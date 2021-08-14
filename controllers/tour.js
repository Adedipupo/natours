const { query } = require('express');
const express = require('express');
const { TourModel } = require('../models/tourModel');


exports.alaisTopTours = async(req,res,next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';
    next();
}

class APIFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filter(){
        const queryObj = {...this.queryString}
        const excludedFields = ['page','sort','limit','fields']
        excludedFields.forEach((el)=> delete queryObj[el]);


      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

      this.query.find(JSON.parse(queryStr))
    }
}

exports.createTour = async (req, res) => {
    try {
        const { name, rating, price } = req.body;

        const tour = await TourModel.create(req.body);
        if (tour) {
            return res.status(201).json({ message: 'Success', data: tour })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

exports.getAllTours = async (req, res) => {
    try {
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy);
        }else {
            query = query.sort('-createdAt');
        }

        if(req.query.limit){
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields);
        }else {
            query = query.select('-_v');
        }

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit)



        const features = new APIFeatures(Tour.find(),req.query).filter();
        const tours = await features.query;
        return res.status(200).json({ msg: 'Success', results: tours.length, data: tours })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

exports.getOneTour = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await TourModel.findById(id);


        if (tour) {
            return res.status(200).json({ message: 'Success', data: tour })
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const { id } = req.params;

        const tour = await TourModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        return res.status(203).json({ message: 'Success', data: tour })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

exports.deleteTours = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await TourModel.findByIdAndRemove(id);

        if (tour) {
            return res.status(204).json({ message: 'Deleted Successfully !!!' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}