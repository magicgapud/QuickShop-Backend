const jwt = require("jsonwebtoken");
const secret = "SecretMessage";


// Token Creation

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {})
}




// Token Verification

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if(typeof token !== "undefined"){
		
		console.log(token);

		token = token.slice(7, token.length)

		return jwt.verify(token, secret, (err, data) => {
			// if JWT is not valid
			if(err){
				return res.send({ auth: "failed" })
			}else{
				// if JWT is valid
				next()
			}
		})

	}else{
		return res.send({ auth: "token undefined" })
	}
};




// Token decryption

module.exports.decode = (token) => {
	if(typeof token !== "undefined"){

		token = token.slice(7, token.length)

		return jwt.verify(token, secret, (err, data) => {
			if(err){
				return null
			}else{

				return jwt.decode(token, { complete: true }).payload
			}
		})
	}else{
		// token does not exist
		return null
	}
}