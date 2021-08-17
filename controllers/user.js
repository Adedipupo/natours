const express = require('express');
const fs = require('fs');
const { UserModel } = require('../models/userModel');


// const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));


exports.getAllUsers = async(req,res)=>{
    const users = await UserModel.find()
    return res.status(200).json({msg: 'Success 😝 ',results: users.length, data: users})
}
