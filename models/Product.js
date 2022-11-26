const mongoose = require("mongoose");
const {Schema,model}=require('mongoose');

let product = {
    product_id: {type: String, required: false, unique: true},
    product_name: {type: String, required: true},
	seller_id: {type: String, required: true},
	catalog_id: {type: String, required: true},
	price: {type: String, required: true},
    avatar: {type: String, required: false, default: ''},
    out_of_stock: {type: Boolean, required: true, default: false},
    no_of_units_available: {type: Number, required: true, default: 0},
    created_on: {type: Date, required: false, default: Date.now},
};

let Product = model('products', new Schema(product));

module.exports = Product;