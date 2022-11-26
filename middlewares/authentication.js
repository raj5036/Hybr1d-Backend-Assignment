const { ERROR } = require("../handlers/error");
const User = require("../models/User");

const check_if_user_exists = async (req, res, next) => {
	let { username } = req.body;
    let user = await User.findOne({username: username});

    if (user) {
        req.user = user;
        next();
    } else {
        return res.status(ERROR.USER_NOT_FOUND.status).json({
			code: ERROR.USER_NOT_FOUND.code,
			message: ERROR.USER_NOT_FOUND.message
		});
    }
};

module.exports = {
	check_if_user_exists,
};