const { getAllTours } = require("../controllers/tour");
const express = require('express');

const router = express.Router();

router.get('/allTours', getAllTours)

module.exports =router;
