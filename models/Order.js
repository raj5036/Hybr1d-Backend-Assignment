const mongoose = require("mongoose");
const {Schema,model}=require('mongoose');

let order = {
    products: {type: Array, required: true, default: []},
	seller_id: {type: String, required: true},
	catalog_id: {type: String, required: true},
	buyer_id: {type: String, required: true},
    created_on: {type: Date, required: false, default: Date.now},
};

let Order = model('orders', new Schema(order)); 

module.exports = Order;