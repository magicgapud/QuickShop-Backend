const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First name is required"]
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"]
	},
	email: {
		type: String,
		required: [true, "Email is required"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	mobile: {
		type: String,
		required: [true, "Mobile number is required"]
	},
	cart: [
		{
			productId:{
				type: String,
				required: [true, "ProductId is required"]
			},
			orderOn:{
				type: Date,
				default: new Date().toLocaleString()
			},
			productName:{
				type: String
			},
			description:{
				type: String
			},
			price:{
				type: Number
			},
			stock:{
				type: Number
			},
			images:{
				type: Array
			},
			quantity: {
				type: Number
			},
			subtotal: {
				type: Number
			}
		}
	]
})




module.exports = mongoose.model("User", userSchema);