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
        
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.query.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy);
        }else {
            this.query = this. query.sort('-createdAt');
        }
        return this;
    }
    limit(){
        if(this.queryString.limit){
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields);
        }else {
            this.query = this.query.select('-_v');
        }
        return this;
    }
    paginate(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        if(this.queryString.page){
            const numTours = await TourModel.countDocuments();
            if(skip >= numTours) throw new Errors('The page does not exist')
        }
        return this;
    }

}

exports.getAllTours = async (req, res) => {
    try {
        const features = new APIFeatures(Tour.find(),req.query).filter().sort().limit().paginate();
        const tours = await features.query;
        return res.status(200).json({ msg: 'Success', results: tours.length, data: tours })
    } catch (error) {
        return res.status(404).json({ message: error.message })
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