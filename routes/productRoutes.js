const express = require("express");
const router = express.Router();

// to access other file
const ProductController = require("../controllers/productControllers");
const auth = require("../auth");



// Add a products
// http://localhost:4000/marketplace/products/addProduct
router.post("/addProduct", auth.verify, (req, res) => {


	// determine if there are uploaded photo
	const {productName, description, price, stock, images, category} = req.body;

	if(!images) return res.status(400).json({msg: "No image upload"})


	// determine if the user is an admin.
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	// if the user is an admin
	if(data.isAdmin){
		ProductController.addProduct(req.body).then(result => res.send(result))
	}else{
		// if not an admin.
		res.send({auth: "You are not an admin"});
	}
});




// Get all active products
// http://localhost:4000/marketplace/products/active
router.get("/active", (req, res) => {
	ProductController.active().then(result => res.send(result))
});


// Get all products
// http://localhost:4000/marketplace/products/all
router.get("/all", (req, res) => {
	ProductController.getAll().then(result => res.send(result))
});




// Get specific product
// http://localhost:4000/marketplace/products/:productId
router.get("/:productId", (req, res) => {
	ProductController.getSpecific(req.params.productId).then(result => res.send(result))
});




// Change product to inactive
// http://localhost:4000/marketplace/products/archive/
router.put("/archive/:productId", auth.verify, (req, res) => {

	// determine if the user is an admin.
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	// if the user is an admin.
	if(data.isAdmin){
		ProductController.changeInactive(req.params.productId).then(result => res.send(result))
	}else{
		// if the user is NOT an admin.
		res.send({auth: "You are not an admin"})
	}

});


// Change product to active
// http://localhost:4000/marketplace/products/activate/
router.put("/activate/:productId", auth.verify, (req, res) => {

	// determine if the user is an admin.
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	// if the user is an admin.
	if(data.isAdmin){
		ProductController.changeActive(req.params.productId).then(result => res.send(result))
	}else{
		// if the user is NOT an admin.
		res.send({auth: "You are not an admin"})
	}

});


// // Get all active product
// // http://localhost:4000/marketplace/products/active
// router.get("/active", (req, res) => {
// 	ProductController.getActive().then(result => res.send(result))
// });




// Change the stock of the  specific product
// http://localhost:4000/marketplace/products/:productId/edit
router.put("/:productId/edit", auth.verify, (req, res) => {

	// determine if the user is an admin.
	const data = {isAdmin: auth.decode(req.headers.authorization).isAdmin}

	// if the user is an admin.
	if(data.isAdmin){
		ProductController.changeQuantity(req.params.productId, req.body).then(result => res.send(result))
	}else{
		// if the user is not an admin
		res.send({auth: "You are not an admin"});
	}
});






/*// Change the price of the specific product
// http://localhost:4000/marketplace/products/:productId/changePrice
router.put("/:productId/changePrice", auth.verify, (req, res) => {

	// determine if the user is an admin
	const data = {isAdmin: auth.decode(req.headers.authorization).isAdmin};

	// if the user is an admin.
	if(data.isAdmin){
		ProductController.changePrice(req.params.productId, req.body).then(result => res.send(result));
	}else{
		// if the user is not an admin.
		res.send({auth: "You are not an admin"});
	}
});
*/













module.exports = router;