const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { ERROR } = require("../../handlers/error");
const User = require("../../models/User");

const handle_user_registration = async (req, res) => {
	try {
		const {firstname, lastname, email, password, avatar, type} = req.body;
		
		//Check if user already exists
		const user = await User.findOne({email: email});
		if (user) {
			return res.status(ERROR.USER_ALREADY_EXISTS.status).send(ERROR.USER_ALREADY_EXISTS.message);
		}
		
		//Encrypt user entered password
		const salt = await bcrypt.genSalt();
		const hashed_password = await bcrypt.hash(password, salt);

		const new_user = {
			user_id: uuid.v4(),
			firstname: firstname,
			lastname: lastname,
			email: email, 
			password: hashed_password,
			type: type
		};

		if (avatar) {
			new_user.avatar = avatar;
		}

		const response = await User.create(new_user);
		res.status(201).json({
			code: "SUCCESS",
			message: "New user created"
		});
	} catch (error) {
		console.error("Error occurred while creating new user ", error);
	}
};

const handle_user_login = (req, res) => {};

module.exports = {
	handle_user_registration,
	handle_user_login
};