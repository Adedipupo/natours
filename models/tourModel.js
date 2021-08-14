const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'A tour must have a name'],
        unique: true
    },
    durations: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingAverage: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: { 
        type: Number,
        required: [true,'A tour must have a model']
    }
})

exports.TourModel = mongoose.model('Tour', tourSchema)
