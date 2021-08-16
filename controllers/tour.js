const { query } = require('express');
const express = require('express');
const { TourModel } = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');


exports.alaisTopTours = async(req,res,next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';
    next();
}

exports.getAllTours = catchAsync(async (req, res) => {
    const features = new APIFeatures(TourModel.find(),req.query).filter().sort().limit().paginate();
    const tours = await features.query;
    return res.status(200).json({ msg: 'Success', results: tours.length, data: tours })
})
 
exports.createTour = catchAsync(async (req, res) => {
        const { name, rating, price } = req.body;

        const tour = await TourModel.create(req.body);
        if (tour) {
            return res.status(201).json({ message: 'Success', data: tour })
        }
})

exports.getOneTour = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tour = await TourModel.findById(id);


    if (tour) {
        return res.status(200).json({ message: 'Success', data: tour })
    }
})

exports.updateTour = catchAsync(async (req, res) => {
    const { id } = req.params;

    const tour = await TourModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    return res.status(203).json({ message: 'Success', data: tour })
})

exports.deleteTours = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tour = await TourModel.findByIdAndRemove(id);

    if (tour) {
        return res.status(204).json({ message: 'Deleted Successfully !!!' })
    }
})

exports.getTourStats = catchAsync(async(req, res) => {
    const stats = await TourModel.aggregate([
        {
            $match: { ratingAverage: {$gte: 4.5}}
        },
        {
            $group: {
                _id:{$toUpper : '$difficulty'},
                numTours: {$sum : 1},
                numRatings: {$sum: '$ratingQuatity'},
                avgRating: { $avg : '$ratingAverage'},
                avgPrice: { $avg : '$price'},
                minPrice: { $min : '$price'},
                maxPrice: { $max : '$price'}
            }
        },{
            $sort: { avgPrice : 1}
        }
    ]);
   return res.status(200).json({message: 'Success', data: stats})

})