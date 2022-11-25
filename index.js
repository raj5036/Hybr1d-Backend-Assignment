const express = require("express");
const mongoose = require("mongoose");

const app = express();

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

app.get("/", (req, res) => {
	res.send("Ok");
});

app.listen("3001", () => {
	console.log("Server is running on 3001");
});