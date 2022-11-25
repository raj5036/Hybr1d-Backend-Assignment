const mongoose = require("mongoose");

let user = {
    user_id     :  {type:String, required:false, unique:true},
    firstname   :  {type:String, required:true},
    lastname    :  {type:String, required:true},
    email       :  {type:String, required:true, unique:true},
    password    :  {type:String, required:true, unique:true},
    avatar      :  {type:String, required:false, default:''},
    created_on  :  {type:Date, required:false, default:Date.now},
    type 		:  {type:String, required:true}, // 'BUYER' or 'SELLER'
};

let User = model('users', new Schema(user));

module.exports = User;