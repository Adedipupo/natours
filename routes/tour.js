const { getAllTours, createTour, deleteTours, getOneTour, updateTour, alaisTopTours, getTourStats } = require("../controllers/tour");
const express = require('express');
const { protect, restrictTo } = require("../controllers/auth");

const router = express.Router();

router.get('/', getAllTours);
router.get('/toptours',alaisTopTours,getAllTours);
router.get('/tour-stats', getTourStats)
router.get('/:id', protect, getOneTour);
router.post('/create', createTour);
router.patch('/:id', updateTour);
router.delete('/:id',protect,restrictTo('admin','lead-guide'), deleteTours);


module.exports =router;
