const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


exports.register = catchAsync(async(req,res) => {
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})
    return res.status(201).json({
        status: 'success',
        token,
        data: user
    })
})

exports.login = catchAsync(async(req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
      return   next(new AppError('Please provide email and password!',400))
    }

    const user = await UserModel.findOne({email}).select('+password');
    const token = '';
    return res.status(201).json({
        status: 'success',
        token,
        data: user
    })
})