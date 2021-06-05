const mongoose = require('mongoose');

const PostModel = require('../models/Post.model');

exports.getAllPosts = async (req, res) => {
	try {
		const response = await PostModel.find();
		res.json(response);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.createPost = async (req, res) => {
	const { title, body, author } = req.body;
	const newPost = new PostModel({
		title,
		body,
		author,
	});
	newPost.save().then((response) =>
		res
			.json({
				status: true,
				message: 'New post is created successfully',
				response,
			})
			.catch((error) => res.json({ status: false, message: error })),
	);
};

exports.updatePost = async (req, res) => {
	await PostModel.findByIdAndUpdate(
		{ _id: req.params.postid },
		{ $set: req.body },
	)
		.then((data) =>
			res.json({ message: 'Post is successfully updated', data }),
		)
		.catch((err) => res.json({ message: err }));
};
