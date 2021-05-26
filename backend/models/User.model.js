const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		fullName: { type: String, required: true, lowercase: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		role: { type: String, default: 'instructor' },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('user', UserSchema);
