const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		author: { type: String },
		isPublished: { type: Boolean, default: false },
		userId: { type: mongoose.Types.ObjectId, ref: 'users' },
		imageUrls: { type: Array },
		videoUrl: { type: Array },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('post', PostSchema);
