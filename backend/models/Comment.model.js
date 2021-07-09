const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
	{
		title: String,
		content: String,
		userId: { type: Schema.Types.ObjectId, ref: 'user' },
		postId: { type: Schema.Types.ObjectId, ref: 'post' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('comment', CommentSchema);
