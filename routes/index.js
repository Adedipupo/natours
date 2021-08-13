const express = require('express');
const tourRoutes = require('./tour');
const userRoutes = require('./user');

const router = express.Router();


router.use('/tours', tourRoutes)
router.use('/users', userRoutes)

module.exports =  router ;
