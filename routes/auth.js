const express = require("express");
const validate = require("express-validation");
const { handle_user_registration, handle_user_login } = require("../controllers/user_controller/user_controller");
const { user_signup_validation, user_login_validation } = require("../controllers/user_controller/user_validation");
const { check_if_user_exists } = require("../middlewares/authentication");

const router = express.Router();

router.post(
	'/register', 
	validate(user_signup_validation), 
	handle_user_registration
);

router.post(
	'/login', 
	validate(user_login_validation),
	check_if_user_exists,
	handle_user_login
);

module.exports = router;