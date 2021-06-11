import React from 'react';
import SinglePost from './SinglePost';
import './Posts.css';

const Posts = ({ posts }) => {
	return (
		<div className="home-page-all-posts-container">
			{posts.length !== 0 &&
				posts.map((post) => <SinglePost post={post} key={post._id} />)}
		</div>
	);
};

export default Posts;
