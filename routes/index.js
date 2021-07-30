const express = require('express');
const tourRoutes = require('./tour');

const router = express.Router();


router.use('/tour', tourRoutes)

module.exports =  router ;
