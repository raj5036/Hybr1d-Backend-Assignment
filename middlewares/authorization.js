const jwt = require("jsonwebtoken");
const { ERROR } = require("../handlers/error");

const authorize_buyer = (req, res, next) => {
	const auth_token = req.headers['authorization'];

	if (!auth_token) {
		return res.status(ERROR.UNAUTHORIZED_ERROR.status).json({
			code: ERROR.UNAUTHORIZED_ERROR.code,
			message: ERROR.UNAUTHORIZED_ERROR.message
		});
	}

	jwt.verify(auth_token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
		if (err) {
			return res.status(ERROR.UNAUTHORIZED_ERROR.status).json({
				code: ERROR.UNAUTHORIZED_ERROR.code,
				message: ERROR.UNAUTHORIZED_ERROR.message
			});
		}

		if (payload.type != "BUYER") {
			return res.status(ERROR.UNAUTHORIZED_ERROR.status).json({
				code: ERROR.UNAUTHORIZED_ERROR.code,
				message: ERROR.UNAUTHORIZED_ERROR.message + "- this resources are only for Buyers/Customers"
			});
		}

		req.user = payload;
		next();
	});
};

const authorize_seller = (req, res, next) => {
	const auth_token = req.headers['authorization'];

	if (!auth_token) {
		return res.status(ERROR.UNAUTHORIZED_ERROR.status).json({
			code: ERROR.UNAUTHORIZED_ERROR.code,
			message: ERROR.UNAUTHORIZED_ERROR.message
		});
	}

	jwt.verify(auth_token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
		if (err) {
			return res.status(ERROR.UNAUTHORIZED_ERROR.status).json({
				code: ERROR.UNAUTHORIZED_ERROR.code,
				message: ERROR.UNAUTHORIZED_ERROR.message
			});
		}

		if (payload.type != "SELLER") {
			return res.status(ERROR.UNAUTHORIZED_ERROR.status).json({
				code: ERROR.UNAUTHORIZED_ERROR.code,
				message: ERROR.UNAUTHORIZED_ERROR.message + "- this resources are only for Sellers"
			});
		}

		req.user = payload;
		next();
	});
};

module.exports = {
	authorize_buyer,
	authorize_seller
};