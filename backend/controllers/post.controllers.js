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
