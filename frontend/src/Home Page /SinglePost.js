import React from 'react';

const SinglePost = ({ post }) => {
	return (
		<div>
			<h4>{post.title}</h4>
			<p>{post.body}</p>
		</div>
	);
};

export default SinglePost;
