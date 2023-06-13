const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
	title: { type: String, required: true },
	image: { type: String, required: false },
	description: { type: String, required: false },
	price: { type: Number, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category"
	},
	time_created: { type: Number, default: () => Date.now() }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product; 