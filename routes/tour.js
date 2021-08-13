const { getAllTours } = require("../controllers/tour");
const express = require('express');

const router = express.Router();

router.get('/', getAllTours)

module.exports =router;
