const { ERROR } = require("../handlers/error");
const Product = require("../models/Product");

const check_if_order_feasible = async (req, res, next) => {
	try {
		const { products } = req.body;
		const product_details = [];
		return products.length && products.map(async (product, index) => {
			const response = await Product.findOne({product_id: product.product_id}).lean();

			if (!response) {
				return res.end();
			} else if (response.no_of_units_available < product.units_required) {
				return res.status(ERROR.ORDER_CAN_NOT_BE_FULFILLED.status).json({
					code: ERROR.ORDER_CAN_NOT_BE_FULFILLED.code,
					message: ERROR.ORDER_CAN_NOT_BE_FULFILLED.message,
				});
			}

			product_details.push(response);

			if (index == products.length - 1 ) {
				req.products = product_details;
				next();
			}
		});
	} catch (error) {
		console.error("Error occurred inside check_if_order_feasible", error);
		res.status(ERROR.INTERNAL_SERVER_ERROR.status).json({
			code: ERROR.INTERNAL_SERVER_ERROR.code,
			message: ERROR.INTERNAL_SERVER_ERROR.message,
			error: error
		});
	}
};

module.exports = {
	check_if_order_feasible
}