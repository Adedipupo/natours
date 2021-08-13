const { getAllTours, createTour } = require("../controllers/tour");
const express = require('express');

const router = express.Router();

router.get('/', getAllTours)
router.post('/create', createTour)

module.exports =router;
