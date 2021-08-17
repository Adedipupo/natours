const { getAllUsers } = require("../controllers/user");
const express = require('express');
const { register } = require("../controllers/auth");

const router = express.Router();

router.get('/', getAllUsers)
router.post('/register', register);

module.exports =router;
