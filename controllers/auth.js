const { UserModel } = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");


exports.register = catchAsync(async(req,res) => {
    const user = await UserModel.create(req.body);
    return res.status(201).json({
        status: 'success',
        data: user
    })
})