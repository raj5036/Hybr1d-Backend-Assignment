const { ERROR } = require("../../handlers/error");
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
			message: ERROR.INTERNAL_SERVER_ERROR.message
		});
	}
};

module.exports = {
	get_list_of_sellers
};