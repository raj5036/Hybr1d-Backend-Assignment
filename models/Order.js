const mongoose = require("mongoose");

let order = {
    order_id   :  {type:String, required:false, unique:true},
    products :  {type:Array, required:true, default: []},
	seller_id: {type: String, required: true},
	catalog_id: {type: String, required: true},
	buyer_id: {type: String, required: true},
    created_on  :  {type:Date, required:false, default:Date.now},
	is_processed: {type: Boolean, required: true, default: false},
};

let Order = model('orders', new Schema(order));

module.exports = Order;