const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserModel = require('../models/User.model');

exports.getAllUsers = async (req, res) => {
	try {
		const { page, limit } = req.query;
		const response = await UserModel.find()
			.sort({ createdAt: -1 })
			.limit(limit * 1)
			.skip((page - 1) * limit);
		res.json({ total: response.length, response });
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
	const { username, firstname, lastname, email, password } = req.body;

	const salt = await bcrypt.genSalt(16);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await new UserModel({
		username,
		firstname,
		lastname,
		email,
		password: hashedPassword,
	});

	newUser
		.save()
		.then((response) =>
			res.json({
				status: true,
				message: 'Signed up successfully',
				response,
			})
		)
		.catch((err) =>
			res.json({
				status: false,
				message:
					err.keyPattern.username === 1
						? 'username'
						: err.keyPattern.email === 1
						? 'email'
						: err,
			})
		);
};

exports.signIn = async (req, res) => {
	const { email, password } = req.body;

	await UserModel.findOne({ email })
		.then(async (data) => {
			if (await bcrypt.compare(password, data.password)) {
				const token = jwt.sign(
					{ name: email, role: data.role },
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: '1h',
					}
				);
				res.json({
					status: true,
					username: data.username,
					firstname: data.firstname,
					lastname: data.lastname,
					email: data.email,
					id: data._id,
					token: token,
					role: data.role,
				});
			} else {
				res.json({ status: false, message: 'You entered wrong password' });
			}
		})
		.catch((err) => res.json({ message: 'This email does not exist..', err }));
};

exports.updateUser = async (req, res) => {
	await UserModel.findByIdAndUpdate({ _id: req.params.userid }, { $set: req.body })
		.then((data) => res.json({ message: 'This user is successfully updated', data }))
		.catch((err) => res.json({ message: err }));
};

exports.removeUser = async (req, res) => {
	await UserModel.findByIdAndDelete({ _id: req.params.userid })
		.then((data) => res.json({ message: 'This user is successfully removed', data }))
		.catch((err) => res.json({ message: err }));
};
