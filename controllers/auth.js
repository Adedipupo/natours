const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

exports.register = catchAsync(async (req, res) => {
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = generateToken(user._id)
    return res.status(201).json({
        status: 'success',
        token,
        data: user
    })
})

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400))
    }

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect password or email'), 401);
    }
    const token = generateToken(user._id);
    return res.status(201).json({
        status: 'success',
        token,
        data: user
    })
})