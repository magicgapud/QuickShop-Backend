const Product = require("../model/product");



// Add a product
module.exports.addProduct = (reqBody) => {
	let newProduct = new Product ({
		productName: reqBody.productName,
		description: reqBody.description,
		price: reqBody.price,
		stock: reqBody.stock,
		images: reqBody.images,
		category: reqBody.category
	})


	// save the new product
	return newProduct.save().then((newProduct, error) => {
		// if not successful.
		if(error){
			return false;
		}else{
			// if successful
			return true;
		}
	})
};



// Get all active products
module.exports.active = () => {
	return Product.find({isActive: true}).then(result => {
		return result;
	})
};



// Get all products
module.exports.getAll = () => {
	return Product.find({}).then(result => {
		return result;
	})
};





// Get specific product
module.exports.getSpecific = (reqBody) => {
	return Product.findById(reqBody).then(result => {
		return result;
	})
};




// Change product to inactive
module.exports.changeInactive = (reqParams) => {

	let updateActiveField = {
		isActive : false
	}


	return Product.findByIdAndUpdate(reqParams, updateActiveField).then((product, error) => {
		
		if(error){
			return false;
		}else{
			return true;
		}
	})
};

// Change product to active
module.exports.changeActive = (reqParams) => {

	let updateActiveField = {
		isActive : true
	}


	return Product.findByIdAndUpdate(reqParams, updateActiveField).then((product, error) => {
		
		if(error){
			return false;
		}else{
			return true;
		}
	})
};


// // Get all active product
// module.exports.getActive = () => {
// 	return Product.find({ isActive: true }).then(result => {
// 		return result;
// 	})
// };




// Change stock of the specific product
module.exports.changeQuantity = (productId, reqBody) => {
	return Product.findById(productId).then(result => {
		if(result == null){
			return false;
		}else{
			result.productName = reqBody.productName;
			result.description = reqBody.description;
			result.price = reqBody.price;
			result.stock = reqBody.stock;
			// Save the update
			return result.save().then(result => {
				return true;
			})
		}
	})
};


/*// Change the price of the specific product
module.exports.changePrice = (productId, reqBody) => {
	return Product.findById(productId).then(result => {
		// if not found.
		if(result == null){
			return false;
		}else{

			result.price = reqBody.price;
			return result.save().then(result => {
				return result;
			})
		}
	})
};*/