const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateToken = (user)=>{
	return jwt.sign(
		{id:user._id,
		 status:user.status,
		 username: user.email,
		 accountType:user.accountType
		}, 
		process.env.JWTPRIVATEKEY,
		{expiresIn: '1d'}
		)
}

const login =  async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).json({ message: "Invalid Email or Password" });

		const isValidPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isValidPassword)
			return res.status(401).json({ message: "Invalid Email or Password" });

		if (!user.status){
			const accessToken = generateToken(user);
			return res.status(200).json({
				email:user.email,
				accessToken: accessToken, 
				message: "Please register " });
		}
		
		const accessToken = generateToken(user);
		res.status(200).json({
			email:user.email,
			status: user.status,
			accountType: user.accountType,
			accessToken: accessToken, 
			message: "logged in successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
}


module.exports = {
    login
};