const { getAllTours, createTour, deleteTours, getOneTour, updateTour, alaisTopTours, getTourStats } = require("../controllers/tour");
const express = require('express');

const router = express.Router();

router.get('/', getAllTours);
router.get('/toptours',alaisTopTours,getAllTours);
router.get('/tour-stats', getTourStats)
router.get('/:id', getOneTour);
router.post('/create', createTour);
router.patch('/:id', updateTour);
router.delete('/:id', deleteTours);


module.exports =router;
