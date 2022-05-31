const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary')
const auth = require("../auth");
const fs = require('fs')





// Connect cloudinary to our backend
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET
})


// Upload image
// http://localhost:4000/marketplace/upload
router.post('/upload', auth.verify, (req, res) => {
	try{
		
		if(!req.files || Object.keys(req.files).length === 0)
			return res.status(400).json('No files were uploaded.')

		const file = req.files.file;
		if(file.size > 3072*3072) {
			removeTmp(file.tempFilePath)
			return res.status(400).json({msg: "Size too large"})

		}

		cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "Ecommerce"}, async(err, result) => {
			if(err) throw err;

			removeTmp(file.tempFilePath)
			res.json({public_id: result.public_id, url: result.secure_url})
		})


	}catch(err) {
		return res.status(500).json({msg: err.message})
	}

})



// Delete image
// http://localhost:4000/marketplace/delete
router.post('/delete', (req, res) => {
	try{
		const {public_id} = req.body;
		if(!public_id) return res.status(400).json({msg: 'No images Selected.'});

		cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
			if(err) throw err;

			return res.json({msg: "Deleted image"})
		})

	} catch (err) {
		return res.status(500).json({msg: err.message})
	}
	
})



const removeTmp = (path) => {
		fs.unlink(path, err=>{
			if(err) throw err;
		})
	}




module.exports = router