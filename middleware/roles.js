const accountTypeCheck = (role) => {

	return (req, res, next) => {
		if (req.user.accountType === role) {
			next();
		} else {
			res.status(403).json({ error: true, message: "You are not authorized person for this service" });
		}
	};
};
module.exports = accountTypeCheck