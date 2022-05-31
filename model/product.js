const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: [true, "Product name is required"]
	},
	description: {
		type: String,
		required: [true, "Description is required"]
	},
	price: {
		type: Number,
		required: [true, "Price is required"]
	},
	stock: {
		type: Number,
		required: [true, "stock is required"]
	},
	images: {
		type: Object,
	},

	category: {
		type: String,
		required: [true, "Category is required"]
	},

	isActive: {
		type: Boolean,
		default: true
	}
})



module.exports = mongoose.model("Product", productSchema);