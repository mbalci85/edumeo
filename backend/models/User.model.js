const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		firstname: String,
		lastname: { type: String },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		role: { type: String, default: 'user' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
