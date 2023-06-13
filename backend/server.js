const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors');

const routes = require("./routes")

const PORT = 4000;
const CONNECTION_STRING = "mongodb://localhost:27017/uniabjmarket";

mongoose.connect(CONNECTION_STRING,{
	useNewUrlParser: true,
	useUnifiedTopology:true
});

mongoose.connection.on("open",()=>console.log("Mongo Running"));
mongoose.connection.on("error",(err)=>console.log(err.massage))

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(routes)

app.listen(PORT);
console.log("App is running on port :" + PORT);