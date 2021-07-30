const express = require('express');
const tourRoutes = require('./tour');
const userRoutes = require('./user');

const router = express.Router();


router.use('/tour', tourRoutes)
router.use('/user', userRoutes)

module.exports =  router ;
