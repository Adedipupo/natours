const { UserModel } = require("../models/userModel")


exports.register = async(req,res) => {
    const user = await UserModel.create(req.body);
    return res.status(201).json({
        status: 'success',
        data: user
    })
}