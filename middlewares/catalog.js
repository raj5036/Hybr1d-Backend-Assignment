const { ERROR } = require("../handlers/error");
const Catalog = require("../models/Catalog");

const check_if_catalog_exists = async (req, res, next) => {
	const seller = req.user;
	const check_if_catalog_exists = await Catalog.findOne({seller_id: seller.user_id}).lean();
		if (check_if_catalog_exists) {
			return res.status(ERROR.CATALOG_ALREADY_EXISTS.status).json({
				code: ERROR.CATALOG_ALREADY_EXISTS.code,
				message: ERROR.CATALOG_ALREADY_EXISTS.message
			});
		}
		next();
};

module.exports = {
	check_if_catalog_exists
}