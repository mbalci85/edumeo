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

exports.getPostById = async (req, res) => {
	await PostModel.findOne({ _id: req.params.postid }, (err, data) => {
		if (err) {
			res.json({ message: err });
		} else {
			res.json(data);
		}
	});
};

exports.getPostsByTitle = async (req, res) => {
	await PostModel.find({ title: req.params.title }, (err, data) => {
		if (err) {
			res.json({ message: err });
		} else {
			res.json(data);
		}
	});
};

exports.getPostsByUserId = async (req, res) => {
	await PostModel.find({ userId: req.params.userid }, (err, data) => {
		if (err) {
			res.json({ message: err });
		} else {
			res.json(data);
		}
	});
};

exports.createPost = async (req, res) => {
	const { title, body, author, isDeleted, userId } = req.body;
	const newPost = new PostModel({
		title,
		body,
		isDeleted,
		author,
		userId,
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

exports.removePost = async (req, res) => {
	await PostModel.findByIdAndUpdate(
		{ _id: req.params.postid },
		{ isDeleted: true },
	)
		.then((data) =>
			res.json({ message: 'Post is successfully removed', data }),
		)
		.catch((err) => res.json({ message: err }));
};

exports.deletePost = async (req, res) => {
	await PostModel.findByIdAndDelete({ _id: req.params.postid })
		.then((data) =>
			res.json({ message: 'Post is successfully deleted', data }),
		)
		.catch((err) => res.json({ message: err }));
};
