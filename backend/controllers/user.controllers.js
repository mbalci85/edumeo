const mongoose = require('mongoose');

const UserModel = require('../models/User.model');

exports.getAllUsers = async (req, res) => {
	try {
		const response = await UserModel.find();
		res.json(response);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.getUserById = async (req, res) => {
	await UserModel.findById({ _id: req.params.userid }, (err, data) => {
		if (err) {
			res.json({ message: err });
		} else {
			res.json(data);
		}
	});
};
