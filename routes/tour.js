const { getAllTours, createTour, deleteTours, getOneTour, updateTour } = require("../controllers/tour");
const express = require('express');

const router = express.Router();

router.get('/', getAllTours);
router.get('/:id', getOneTour);
router.post('/create', createTour);
router.patch('/:id', updateTour);
router.delete('/:id', deleteTours);


module.exports =router;
