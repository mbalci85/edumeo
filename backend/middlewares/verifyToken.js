const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
	const token =
		req.params.token ||
		req.body.token ||
		req.headers['x-access-token'] ||
		req.headers.token;
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
		if (err) {
			return res
				.sendStatus(403)
				.json({ message: 'You are not authorized to access...' });
		}
		next();
	});
};

module.exports = isAuth;
