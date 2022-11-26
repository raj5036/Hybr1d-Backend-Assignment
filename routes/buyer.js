const express = require("express");
const { get_list_of_sellers } = require("../controllers/buyer_controller/buyer_controller");
const { authorize_buyer } = require("../middlewares/authorization");

const router = express.Router();

router.get(
	'/list-of-sellers',
	authorize_buyer,
	get_list_of_sellers
);
module.exports = router;