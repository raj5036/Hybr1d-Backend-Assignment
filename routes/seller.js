const express = require("express");
const validate = require("express-validation");
const { create_catalog, get_list_of_orders } = require("../controllers/seller_controller/seller_controller");
const { create_catalog_validation } = require("../controllers/seller_controller/seller_validation");
const { authorize_seller } = require("../middlewares/authorization");

const router = express.Router();

router.post(
	'/create-catalog',
	authorize_seller,
	validate(create_catalog_validation),
	create_catalog
);

router.get(
	'/orders',
	authorize_seller,
	get_list_of_orders
);

module.exports = router;