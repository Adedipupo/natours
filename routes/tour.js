const { getAllTours } = require("../controllers/tour");
const express = require('express');
const router = express.Router;

router.get('/alltours', getAllTours)

module.exports ={ router};
