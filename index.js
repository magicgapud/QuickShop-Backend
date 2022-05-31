const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
require("dotenv").config();

// routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/upload")



// Server
const app = express();



// Allows all resources/origin to access the backend application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(fileUpload({
	useTempFiles: true
}))


// url
// http://localhost:4000/marketplace/users
app.use("/marketplace/users", userRoutes);
// http://localhost:4000/marketplace/products
app.use("/marketplace/products", productRoutes);
// http://localhost:4000/marketplace
app.use("/marketplace", uploadRoutes);



// Connect to the MongoDB Connection
mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));



// Listen to port 4000
app.listen(process.env.PORT, () => {
	console.log(`API is now listening on port ${process.env.PORT}`)
});