const mongoose = require('mongoose');
const CommentModel = require('../models/Comment.model');

exports.getAll = async (req, res) => {
	try {
		const { page, limit } = req.query;
		const response = await CommentModel.find()
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.populate('userId', 'username firstname lastname')
			.populate('postId', 'title');
		const total = await CommentModel.find().countDocuments();
		const pages = limit === undefined ? 1 : Math.ceil(total / limit);

		res.json({ total, pages, response });
	} catch (error) {
		res.json(error);
	}
};

exports.getCommentByPostId = async (req, res) => {
	const { page, limit } = req.query;
	const total = await CommentModel.find({ postId: req.params.postid }).countDocuments();
	const pages = limit === undefined ? 1 : Math.ceil(total / limit);
	await CommentModel.find({ postId: req.params.postid }, (err, data) => {
		if (err) {
			res.json({ message: err });
		} else {
			res.json({ total, pages, data });
		}
	})
		.limit(limit * 1)
		.skip((page - 1) * limit)
		.populate('userId', 'username firstname lastname')
		.populate('postId', 'title');
};

exports.create = async (req, res) => {
	const { content, userId, postId, isActive, isDeleted } = req.body;
	const newComment = await CommentModel({
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
