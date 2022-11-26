const { ERROR } = require("../../handlers/error");
const Catalog = require("../../models/Catalog");
const Product = require("../../models/Product");
const User = require("../../models/User");

const get_list_of_sellers = async (req, res) => {
	try {
		const response = await User.find({type: "SELLER"}).lean();
		return res.status(200).json({
			code: "SUCCESS",
			data: response
		});
	} catch (error) {
		console.error("Error occurred while fetching list of sellers");
		res.status(ERROR.INTERNAL_SERVER_ERROR.status).json({
			code: ERROR.INTERNAL_SERVER_ERROR.code,
			message: ERROR.INTERNAL_SERVER_ERROR.message,
			error: error
		});
	}
};

const get_catalog_by_seller_id = async (req, res) => {
	try {
		const { seller_id } = req.params;
		const response = await Catalog.findOne({seller_id});

		if (!response) {
			return res.status(ERROR.NO_SELLER_FOUND.status).json({
				code: ERROR.NO_SELLER_FOUND.code,
				message: ERROR.NO_SELLER_FOUND.message,
				error: error
			});
		}

		res.status(200).json({
			code: "SUCCESS",
			message: "Seller found",
			data: response
		});
	} catch (error) {
		console.error("Error occurred while fetching seller by seller-id", error);
		res.status(ERROR.INTERNAL_SERVER_ERROR.status).json({
			code: ERROR.INTERNAL_SERVER_ERROR.code,
			message: ERROR.INTERNAL_SERVER_ERROR.message,
			error: error
		});
	}
};

const create_order = async (req, res) => {
	try {
		const { seller_id } = req.params;
		const { products } = req.body;
		console.log(req.products)
		
		const products_in_db = req.products;

		products.map(async (product, index) => {
			let updated_product_details = {
				...products_in_db,
				no_of_units_available: products_in_db[index].no_of_units_available - product.units_required
			};

			await Product.updateOne(
				{product_id: product.product_id},
				updated_product_details
			);
		});

		const catalog_id = products_in_db[0].catalog_id;

		res.end();
	} catch (error) {
		console.error("Error occurred while fetching seller by seller-id", error);
		res.status(ERROR.INTERNAL_SERVER_ERROR.status).json({
			code: ERROR.INTERNAL_SERVER_ERROR.code,
			message: ERROR.INTERNAL_SERVER_ERROR.message,
			error: error
		});
	}
};

module.exports = {
	get_list_of_sellers,
	get_catalog_by_seller_id,
	create_order
};