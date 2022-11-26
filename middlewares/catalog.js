const { ERROR } = require("../handlers/error");
const Catalog = require("../models/Catalog");

const does_catalog_exist = async (req, res, next) => {
	const seller = req.user;
	const does_catalog_exist = await Catalog.findOne({seller_id: seller.user_id}).lean();
		if (does_catalog_exist) {
			return res.status(ERROR.CATALOG_ALREADY_EXISTS.status).json({
				code: ERROR.CATALOG_ALREADY_EXISTS.code,
				message: ERROR.CATALOG_ALREADY_EXISTS.message
			});
		}
		next();
};

module.exports = {
	does_catalog_exist
}