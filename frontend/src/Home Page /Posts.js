import React from 'react';
import SinglePost from './SinglePost';

const Posts = ({ posts }) => {
	return (
		<div>
			{posts.length !== 0 &&
				posts.map((post) => <SinglePost post={post} key={post._id} />)}
		</div>
	);
};

export default Posts;
