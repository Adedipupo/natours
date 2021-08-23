const { getAllUsers } = require("../controllers/user");
const express = require('express');
const { register, login, forgotPassword, resetPassword } = require("../controllers/auth");

const router = express.Router();

router.get('/', getAllUsers)
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:token', resetPassword);


module.exports =router;
