const mongoose = require("mongoose");
const {Schema,model}=require('mongoose');

let catalog = {
    catalog_id: {type: String, required: false, unique: true},
    products: {type: Array, required: true, default: []},
	seller_id: {type: String, required: true},
    created_on: {type: Date, required: false, default: Date.now},
    is_sold_out: {type: Boolean, required: true},
};

let Catalog = model('catalogs', new Schema(catalog));

module.exports = Catalog;