const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { ERROR } = require("../../handlers/error");
const User = require("../../models/User");

const handle_user_registration = async (req, res) => {
	try {
		const {firstname, lastname, username, password, avatar, type} = req.body;
		
		//Check if user already exists
		const user = await User.findOne({username: username});
		if (user) {
			return res.status(ERROR.USER_ALREADY_EXISTS.status).send(ERROR.USER_ALREADY_EXISTS.message);
		}
		
		//Encrypt user entered password
		const salt = await bcrypt.genSalt();
		const hashed_password = await bcrypt.hash(password, salt);

		const new_user = {
			firstname: firstname,
			lastname: lastname,
			username: username, 
			password: hashed_password,
			type: type
		};

		if (avatar) {
			new_user.avatar = avatar;
		}

		const response = await User.create(new_user);
		new_user.id = response._id.toString();

		let access_token=jwt.sign(new_user, process.env.ACCESS_TOKEN_SECRET);
		res.status(201).json({
			code: "SUCCESS",
			data: response,
			access_token: access_token
		});
	} catch (error) {
		console.error("Error occurred while creating new user ", error);
	}
};

const handle_user_login = async (req, res) => {
	const {username, password} = req.body;

	const user = req.user;
	let is_valid_password = await bcrypt.compare(password, user.password);
    
    if (!is_valid_password) {
        res.status(ERROR.WRONG_CREDENTIALS_ERROR.status).send(ERROR.WRONG_CREDENTIALS_ERROR.message);
        return;
    }

	let payload = {
		id: user._id.toString(),
		username: user.username,
		firstname: user.firstname,
		lastname : user.lastname,
		type: user.type
	};
	
	let access_token=jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

	res.status(200).json({
		success: true,
		msg: 'Login successful',
		token: access_token,
	  }); 
};

module.exports = {
	handle_user_registration,
	handle_user_login
};