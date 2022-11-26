const mongoose = require("mongoose");
const {Schema,model}=require('mongoose');

let user = {
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    avatar: {type: String, required: false, default: ''},
    created_on: {type: Date, required: false, default: Date.now},
    type: {type: String, required: true}, // 'BUYER' or 'SELLER'
};

let User = model('users', new Schema(user));

module.exports = User;