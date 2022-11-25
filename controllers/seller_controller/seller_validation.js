const joi = require("joi");

module.exports.create_catalog_validation = {
	body: {
        products: joi.array().items(joi.object({
			name: joi.string().required(),
			price: joi.number().required(),
			avatar: joi.string().optional()
		})),
    },
};