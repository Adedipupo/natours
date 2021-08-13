const { getAllTours, createTour, deleteTours, getOneTour } = require("../controllers/tour");
const express = require('express');

const router = express.Router();

router.get('/', getAllTours);
router.get('/:id', getOneTour);
router.post('/create', createTour);
router.delete('/:id', deleteTour);


module.exports =router;
