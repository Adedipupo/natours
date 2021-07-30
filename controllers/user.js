const express = require('express');
const fs = require('fs');


const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));


exports.getAllUsers = (req,res)=>{
    return res.status(200).json({msg: 'Success',results: users.length, data: users})
}
