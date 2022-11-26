exports.ERROR = {
	USER_NOT_FOUND: {
		status: 404,
        code: "USER_NOT_FOUND",
        message: "user does not exist"
	},
	USER_ALREADY_EXISTS: {
		status: 409,
        code: "USER_ALREADY_EXISTS",
        message: "user already exists"
	},
	INTERNAL_SERVER_ERROR: {
		status: 500,
		code: "INTERNAL_SERVER_ERROR",
		message: "Something wrong happened"
	},
	WRONG_CREDENTIALS_ERROR: {
		status: 400,
		code: "WRONG_CREDENTIALS_ERROR",
		message: "Please enter correct credentials"
	},
	UNAUTHORIZED_ERROR: {
		status: 403,
		code: "UNAUTHORIZED_ERROR",
		message: "Unauthorized: access denied"
	},
	CATALOG_ALREADY_EXISTS: {
		status: 409,
		code: "CATALOG_ALREADY_EXISTS",
		message: "Seller can not have more one catalog"
	},
	NO_SELLER_FOUND: {
		status: 404,
		code: "NO_SELLER_FOUND",
		message: "No Seller found with provided seller-id"
	},
	ORDER_CAN_NOT_BE_FULFILLED: {
		status: 400,
		code: "ORDER_CAN_NOT_BE_FULFILLED",
		message: "Order can not be fulfilled due to un-available units"
	}
};