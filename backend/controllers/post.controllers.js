const mongoose = require('mongoose');

const PostModel = require('../models/Post.model');

exports.getAllPosts = async (req, res) => {
	try {
		const { page, limit } = req.query;
		const response = await PostModel.find()
			.sort({ createdAt: -1 })
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.populate('userId', 'firstname lastname');
		const total = await PostModel.countDocuments();
		const pages = limit === undefined ? 1 : Math.ceil(total / limit);
		res.json({ total, pages, response });
	} catch (error) {
		res.json({ message: error });
	}
	// const { page = 1, limit = 5 } = req.query;
	// await PostModel.aggregate(
	// 	[
	// 		{
	// 			$skip: (page - 1) * limit,
	// 		},
	// 		{
	// 			$limit: limit * 1,
	// 		},
	// 		{
	// 			$sort: { createdAt: -1 },
	// 		},
	// 	],
	// 	(err, results) => {
	// 		if (err) {
	// 			res.status(500).json(err);
	// 		} else {
	// 			res.json({ total: results.length, results });
	// 		}
	// 	}
	// );
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

exports.getPublishedPosts = async (req, res) => {
	const { page, limit } = req.query;
	await PostModel.find({ isPublished: req.params.ispublished }, (err, data) => {
		if (err) {
			res.json({ message: err });
		} else {
			res.json(data);
		}
	})
		.sort({ $natural: -1 })
		.limit(limit * 1)
		.skip((page - 1) * limit);
};

exports.getPostsByUserId = async (req, res) => {
	const { page, limit } = req.query;
	await PostModel.find({ userId: req.params.userid }, (err, data) => {
		if (err) {
			res.json({ message: err });
		} else {
			res.json(data);
		}
	})
		.sort({ $natural: -1 })
		.limit(limit * 1)
		.skip((page - 1) * limit);
};

exports.createPost = async (req, res) => {
	const { title, body, author, isPublished, userId, imageUrls, videoUrl, likes } =
		req.body;
	const newPost = new PostModel({
		title,
		body,
		isPublished,
		author,
		userId,
		imageUrls,
		videoUrl,
		likes,
	});
	newPost.save().then((response) =>
		res
			.json({
				status: true,
				message: 'New post is created successfully',
				response,
			})
			.catch((error) => res.json({ status: false, message: error }))
	);
};

exports.updatePost = async (req, res) => {
	await PostModel.findByIdAndUpdate({ _id: req.params.postid }, { $set: req.body })
		.then((data) => res.json({ message: 'Post is successfully updated', data }))
		.catch((err) => res.json({ message: err }));
};

exports.publishPost = async (req, res) => {
	await PostModel.findByIdAndUpdate({ _id: req.params.postid }, { isPublished: true })
		.then((data) => res.json({ message: 'Post is successfully removed', data }))
		.catch((err) => res.json({ message: err }));
};

exports.deletePost = async (req, res) => {
	await PostModel.findByIdAndDelete({ _id: req.params.postid })
		.then((data) => res.json({ message: 'Post is successfully deleted', data }))
		.catch((err) => res.json({ message: err }));
};
