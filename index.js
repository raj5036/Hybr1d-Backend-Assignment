require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const { config } = require("./config");
const { validate, ValidationError, Joi } = require('express-validation')
const auth = require("./routes/auth");
const buyer = require("./routes/buyer");
const seller = require("./routes/seller");

//Connect to db
mongoose.connect(
	`${config['MONGO_CONNECTION_URL']}/e-commerce-marketplace`,
	{
		useNewUrlParser:true,
		useUnifiedTopology:true,
	}
);

//Check connection
const db = mongoose.connection;
db.once('open', () => {
	console.log("Connected to DB");
});

const app = express();
app.use(express.json());

app.use(`${config['BASE_API_PATH']}/auth`, auth);
app.use(`${config['BASE_API_PATH']}/buyer`, buyer);
app.use(`${config['BASE_API_PATH']}/seller`, seller);

app.use((err, req, res, next) => {
	if (err instanceof ValidationError) {
	  return res.status(400).json(err);
	}
	return res.status(500).json(err);
  })

app.listen(config['SERVER_PORT'], () => {
	console.log("Server is running on", config['SERVER_PORT']);
});