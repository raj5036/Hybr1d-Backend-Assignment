const express = require("express");
const validate = require("express-validation");
const { get_list_of_sellers, get_catalog_by_seller_id, create_order } = require("../controllers/buyer_controller/buyer_controller");
const { validate_get_catalog, validate_create_order } = require("../controllers/buyer_controller/buyer_validation");
const { authorize_buyer } = require("../middlewares/authorization");
const { check_if_order_feasible } = require("../middlewares/order");

const router = express.Router();

router.get(
	'/list-of-sellers',
	authorize_buyer,
	get_list_of_sellers
);

router.get(
	'/seller-catalog/:seller_id',
	authorize_buyer,
	validate(validate_get_catalog),
	get_catalog_by_seller_id
);

router.post(
	'/create-order/:seller_id',
	authorize_buyer,
	validate(validate_create_order),
	check_if_order_feasible,
	create_order
);

module.exports = router;