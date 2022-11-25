exports.ERROR = {
	USER_NOT_FOUND: {
		status: 400,
        code: "USER_NOT_FOUND",
        message: "user does not exist"
	},
	USER_ALREADY_EXISTS: {
		status: 400,
        code: "USER_ALREADY_EXISTS",
        message: "user already exists"
	},
	INTERNAL_SERVER_ERROR: {
		status: 500,
		code: "INTERNAL_SERVER_ERROR",
		message: "Something wrong happened"
	},
};