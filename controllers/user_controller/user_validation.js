const joi = require("joi");

module.exports.user_signup_validation = {
	body: {
        firstname: joi.string().required(),
		lastname: joi.string().required(),
		username: joi.string().required(),
		password: joi.string().required(),
        type: joi.string().valid("SELLER", "BUYER").required(),
		avatar: joi.string().optional()
    },
};

module.exports.user_login_validation = {
	body: {
		username: joi.string().required(),
		password: joi.string().required(),
    },
};