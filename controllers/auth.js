const { UserModel } = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");


exports.register = catchAsync(async(req,res) => {
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    return res.status(201).json({
        status: 'success',
        data: user
    })
})