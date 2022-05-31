// to access the model
const User = require("../model/user");
const Product = require("../model/product");


// encrpted password and authorization
const bcrypt = require('bcrypt');
const auth = require('../auth');



// User Registration
module.exports.userRegistration = (reqBody) => {
	return User.find({ email: reqBody.email }).then(result => {
		if(result.length > 0){
			return ({message: "User already exists."});
		}else{
			// if no duplicate found
			// Create new user
			let newUser = new User ({
				firstName: reqBody.firstName,
				lastName: reqBody.lastName,
				email: reqBody.email,
				password: bcrypt.hashSync(reqBody.password, 10),
				mobile: reqBody.mobile
			})

			// Save new user
			return newUser.save().then((error, user) => {
				// if user registration failed
				if(error){
					return false;
				}else{
					// User registration success
					return true;
				}
			})
		}
	})
}



// User authentication
module.exports.userLogin = (reqBody) => {
	// Find the email of the user
	return User.findOne({ email: reqBody.email }).then( result => {
		// if not found
		if(result == null){
			return false;
		}else{
			// Compare the provided password with the encrypted password.
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			// if the password match
			if(isPasswordCorrect){
				return { accessToken : auth.createAccessToken(result.toObject()) }
			}else{
				// password does not match
				return false;
			}
		}
	})
}


// get details of user
module.exports.getProfile = (data) => {
	return User.findById(data).then(result => {

		result.password = "";

		return result;
	})
}







// Set user as admin
module.exports.setAdmin = (reqBody) => {
	// Find the email of the user
	return User.findOne({ email: reqBody.email }).then(result => {
		// if not found
		if(result == null){
			return false;
		}else{
			// if found.
			result.isAdmin = true;

			// save the changes
			return result.save().then((result, error) => {
				if(error){
					return false;
				}else{
					return true;
				}
			})

		}
	})
}





// add to cart
module.exports.makeOrder = async (data) => {

			// Update the user
			let isUserUpdated = await User.findById(data.userId).then(user => {

				user.cart.push({
					productId: data.productId,
					productName: data.productName,
					description: data.description,
					price: data.price,
					stock: data.stock,
					images: data.images,
					quantity: data.quantity,
					subtotal: data.subtotal
				});

				// save
				return user.save().then((user, error) => {
				if(error) {
					return false;
				}else {
					return true
				}
			})
		});

		if(isUserUpdated) {
			return true
		}else{
			return false
		}

	};





// Retrieve aunthenticated user's order
module.exports.userOrder = (data) => {

	return User.findById(data.userId, {cart: 1, _id: 0}).then((result, err) => {
		if(err){
			return false;
		}else{
			return result
		}
	})
}

// Retrieve aunthenticatedorder
module.exports.orders = (userId) => {

	return User.findById(userId, {cart: 1, _id: 0}).then((result, err) => {
		if(err){
			return false;
		}else{
			return result
		}
	})
}







// Get all users
module.exports.allUsers = () => {
	return User.find({}).then(result => {
		return result;
	})
}




// Retrieve all Pending order(admin)
module.exports.addtoCart = () => {
	return User.find({"cart.pending": "true"}).then(result => {
		return result;
	})
}



