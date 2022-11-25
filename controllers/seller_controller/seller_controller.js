const uuid = require("uuid");
const { ERROR } = require("../../handlers/error");
const Catalog = require("../../models/Catalog");
const Order = require("../../models/Order");
const Product = require("../../models/Product");

const create_catalog = async (req, res) => {
	try {
		const {products} = req.body;
		const seller = req.user;

		//Check if seller already has a catalog registered
		const doesCatalogExist = await Catalog.findOne({seller_id: seller.user_id}).lean();
		if (doesCatalogExist) {
			return res.status(ERROR.CATALOG_ALREADY_EXISTS.status).json({
				code: ERROR.CATALOG_ALREADY_EXISTS.code,
				message: ERROR.CATALOG_ALREADY_EXISTS.message
			});
		}

		const catalog_id = uuid.v4();

		//save product_ids to save in Catalogs
		const product_ids = products.map(product => {
			let product_id = uuid.v4()
			return product_id;
		});

		//Save products before saving catalogs
		products.map(async (product, index) => (
			await Product.create({
				product_id: product_ids[index],
				product_name: product.name,
				seller_id: seller.user_id,
				catalog_id: catalog_id,
				price: product.price,
				avatar: product.avatar,
			})
		));
		

		//save catalogs in db
		let catalog = {
			catalog_id: catalog_id,
			products: product_ids,
			seller_id: seller.user_id,
			is_sold_out: false
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