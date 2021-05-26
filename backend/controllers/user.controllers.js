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

exports.createUser = async (req, res) => {
	const { fullName, email, password } = req.body;

	const newUser = await new UserModel({
		fullName,
		email,
		password,
	});

	newUser
		.save()
		.then((response) =>
			res.json({
				status: true,
				message: 'Successfully created a new user',
				response,
			}),
		)
		.catch((err) => res.json({ message: err }));
};
