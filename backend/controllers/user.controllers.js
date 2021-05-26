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
