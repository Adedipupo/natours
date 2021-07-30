const { getAllUsers } = require("../controllers/user");
const express = require('express');

const router = express.Router();

router.get('/allUsers', getAllUsers)

module.exports =router;
