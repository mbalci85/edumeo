const jwt = require('jsonwebtoken');

const isAdmin = async (req, res, next) => {
	const token =
		req.params.token ||
		req.body.token ||
		req.headers['x-access-token'] ||
		req.headers.token;
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
		if (err) {
			return res
				.sendStatus(403)
				.json({ message: 'You are not authorized to access' });
		}
		if (data.role === 'admin') {
			next();
		} else {
			res.sendStatus(403).json({
				message: 'You are not authorized to access..',
			});
		}
	});
};

module.exports = isAdmin;
