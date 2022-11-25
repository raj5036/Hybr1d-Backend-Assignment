const express = require("express");
const mongoose = require("mongoose");
const { config } = require("./config");
const auth = require("./routes/auth");
const buyer = require("./routes/buyer");
const seller = require("./routes/seller");

//Connect to db
mongoose.connect(
	'mongodb://localhost:27017/twitterDB',
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
app.use(`${config['BASE_API_PATH']}/buyers`, buyer);
app.use(`${config['BASE_API_PATH']}/sellers`, seller);

app.listen(config['SERVER_PORT'], () => {
	console.log("Server is running on ", config['SERVER_PORT']);
});