const uuid = require("uuid");
const { ERROR } = require("../../handlers/error");
const Catalog = require("../../models/Catalog");
const Order = require("../../models/Order");
const Product = require("../../models/Product");

const create_catalog = async (req, res) => {
	try {
		const {products} = req.body;
		const seller = req.user;

		const catalog_id = uuid.v4();

		//save product_ids to save in Catalogs
		const product_data = products.map(product => {
			let product_id = uuid.v4()
			return {
				product_id,
				product_name: product.name,
				price: product.price,
				avatar: product.avatar,
				no_of_units_available: product.no_of_units_available
			};
		});

		//Save products before saving catalogs
		products.map(async (product, index) => (
			await Product.create({
				product_id: product_data[index]["product_id"],
				product_name: product.name,
				seller_id: seller.user_id,
				catalog_id: catalog_id,
				price: product.price,
				avatar: product.avatar,
				no_of_units_available: product.no_of_units_available
			})
		));
		

		//save catalogs in db
		let catalog = {
			catalog_id: catalog_id,
			products: product_data,
			seller_id: seller.user_id,
		};
		const response  = await Catalog.create(catalog);
		
		res.status(201).json({
			code: "SUCCESS",
			data: response,
			message: "Product has been saved successfully for catalog-id " + catalog_id
		});
	} catch (error) {
		console.error("Error occurred while creating catalog ", error);
		res.status(ERROR.INTERNAL_SERVER_ERROR.status).json({
			code: ERROR.INTERNAL_SERVER_ERROR.code,
			message: ERROR.INTERNAL_SERVER_ERROR.message
		});
	}
};

const get_list_of_orders = async (req, res) => {
	try {
		const seller = req.user;
		const response = await Order.find({seller_id: seller.user_id});

		res.status(200).json({
			code: "SUCCESS",
			data: response,
			message: "Successfully fetched orders for" + catalog_id
		});
	} catch (error) {
		console.error("Error occurred while fetching orders ", error);
		res.status(ERROR.INTERNAL_SERVER_ERROR.status).json({
			code: ERROR.INTERNAL_SERVER_ERROR.code,
			message: ERROR.INTERNAL_SERVER_ERROR.message
		});
	}
};

module.exports = {
	create_catalog,
	get_list_of_orders
};