const joi = require("joi");

module.exports.validate_get_catalog = {
	params: {
        seller_id: joi.string().required(),
    },
};

module.exports.validate_create_order = {
	params: {
        seller_id: joi.string().required(),
    },
	body: {
		products: joi.array().min(1).items(
			joi.object({
				product_id: joi.string().required(),
				units_required: joi.number().required()
			})
		).required(),
	}
};