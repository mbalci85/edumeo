const CommentModel = require('../models/Comment.model');

exports.getAll = async (req, res) => {
	try {
		const { page, limit } = req.query;
		const response = await CommentModel.find()
			.sort({ createdAt: -1 })
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.populate('userId', 'username firstname lastname')
			.populate('postId', 'title');
		const total = await CommentModel.find().count();
		res.json({ total: total, response });
	} catch (error) {
		res.json(error);
	}
};

exports.create = async (req, res) => {
	const { title, content, userId, postId, isActive, isDeleted } = req.body;
	const newComment = await CommentModel({
		title,
		content,
		userId,
		postId,
		isActive,
		isDeleted,
	});

	newComment
		.save()
		.then((response) =>
			res.json({
				status: true,
				message: 'New comment is created successfully',
				response,
			})
		)
		.catch((err) => res.json({ status: false, message: err }));
};
