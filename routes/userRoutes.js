const express = require("express");
const router = express.Router();

// to access other files
const auth = require("../auth");
const UserController = require("../controllers/userControllers");



// User registration
// http://localhost:4000/marketplace/users/registration
router.post("/registration", (req, res) => {
	UserController.userRegistration(req.body).then(result => res.send(result))
});



// User authentication
// http://localhost:4000/marketplace/users/login
router.post("/login", (req, res) => {
	UserController.userLogin(req.body).then(result => {
		res.send(result)
	})
});



// User details
// http://localhost:4000/marketplace/users/details
router.get("/details", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	UserController.getProfile(userData.id).then(result => res.send(result))
})





// Set user as admin
// http://localhost:4000/marketplace/users/setAdmin
router.post("/setAdmin", auth.verify, (req, res) => {
		const data = {
			isAdmin: auth.decode(req.headers.authorization).isAdmin
		}

		if(data.isAdmin){
			UserController.setAdmin(req.body).then(result => res.send(result))
		}else{
			res.send({auth: "You are not an admin"})
		}
})



// Make an order
// http://localhost:4000/marketplace/users/order
router.post("/order", (req, res) => {
	const data = {
		userId: auth.decode(req.headers.authorization).id,
		admin: auth.decode(req.headers.authorization).isAdmin,
		productId: req.body.productId,
		productName: req.body.productName,
		description: req.body.description,
		price: req.body.price,
		stock: req.body.stock,
		images: req.body.images,
		quantity: req.body.quantity,
		subtotal: req.body.subtotal
	}
		console.log(data)
		if(!data.admin){
			UserController.makeOrder(data).then(result => res.send(result));
		}else{
			res.send({auth: "You are not allowed to purchase. you are an admin"})
		}
		
		
});




// Retrieve aunthenticated user's order
// http://localhost:4000/marketplace/users/myOrder
router.get("/myOrder", auth.verify, (req, res) => {

	const data = {
		userId: auth.decode(req.headers.authorization).id
	}

	UserController.userOrder(data).then(result => res.send(result))
});


// Retrieve aunthenticated order
// http://localhost:4000/marketplace/users/orders/:userId
router.get("/orders/:userId", auth.verify, (req, res) => {
	UserController.orders(req.params.userId).then(result => res.send(result))
});




// Get all users
// http://localhost:4000/marketplace/users/allUsers
router.get("/allUsers", auth.verify, (req, res) => {


	const data = {isAdmin: auth.decode(req.headers.authorization).isAdmin}

	// if user is an admin.
	if(data.isAdmin){
		UserController.allUsers().then(result => res.send(result))
	}else{
		// if user is not an admin
		res.send({auth: "You are not an admin"})
	}

});




// Retrieve all Pending order(added to cart)
// http://localhost:4000/marketplace/users/pendingOrders
router.get("/pendingOrders", auth.verify, (req, res) => {

	const data = {isAdmin: auth.decode(req.headers.authorization).isAdmin}

	// if user is an admin.
	if(data.isAdmin){
		UserController.addtoCart().then(result => res.send(result))
	} else {
		// if user is not an admin
		res.send({auth: "You are not an admin"})	
	}
});




router.get("/cart", )





module.exports = router;