const { query } = require('express');
const express = require('express');
const { TourModel } = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');


exports.alaisTopTours = async(req,res,next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';
    next();
}


exports.getAllTours = async (req, res) => {
    try {
        const features = new APIFeatures(TourModel.find(),req.query).filter().sort().limit().paginate();
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

exports.getTourStats = async(req, res) => {
    try {
        const stats = await TourModel.aggregate([
            {
                $match: { ratingAverage: {$gte: 4.5}}
            },
            {
                $group: {
                    _id: null,
                    numTours: {$sum : 1},
                    numRating: {$sum: '$ratingAverage'},
                    avgRating: { $avg : '$ratingAverage'},
                    avgPrice: { $avg : '$price'},
                    minPrice: { $min : '$price'},
                    maxPrice: { $max : '$price'}
                }
            }
        ]);
       return res.status(200).json({message: 'Success', data: stats})
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}