const CommentModel = require('../models/Comment.model');

exports.getAll = async (req, res) => {
	try {
		const { page, limit } = req.query;
		const response = await CommentModel.find()
			.sort({ createdAt: -1 })
			.limit(limit * 1)
			.skip((page - 1) * limit);
		const total = await CommentModel.find().length();
		res.json({ total: total, response });
	} catch (error) {
		res.json(error);
	}
};
