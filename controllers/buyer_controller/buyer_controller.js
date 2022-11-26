const uuid = require("uuid");
const { ERROR } = require("../../handlers/error");
const Catalog = require("../../models/Catalog");
const Order = require("../../models/Order");
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
		
		const products_in_db = req.products;

		let updated_product_details = [];
		products.map(async (product, index) => {
			let updated_product_detail = {
				...products_in_db[index],
				no_of_units_available: products_in_db[index].no_of_units_available - product.units_required
			};
			updated_product_details.push(updated_product_detail);

			await Product.updateOne(
				{product_id: product.product_id},
				updated_product_detail
			);
		});

		const catalog_id = products_in_db[0].catalog_id;
		
		//Update seller's catalog details as well
		await Catalog.updateOne(
			{catalog_id},
			{products: updated_product_details}
		);

		//Insert order-details in db
		const response = await Order.create({
			order_id: uuid.v4(),
			products: products,
			seller_id: seller_id,
			catalog_id: catalog_id,
			buyer_id: req.user.user_id,
			is_processed: true,
		});

		return res.status(200).json({
			code: "SUCCESS",
			message: "Order placed successfully"
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

module.exports = {
	get_list_of_sellers,
	get_catalog_by_seller_id,
	create_order
};