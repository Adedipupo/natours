const { getAllUsers } = require("../controllers/user");
const express = require('express');

const router = express.Router();

router.get('/', getAllUsers)

module.exports =router;
