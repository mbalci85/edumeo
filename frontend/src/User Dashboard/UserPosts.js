import React from 'react';
import UserPost from './UserPost';

const UserPosts = ({ posts }) => {
	return (
		<div>
			{posts.length !== 0 &&
				posts.map((post) => <UserPost post={post} key={post._id} />)}
		</div>
	);
};

export default UserPosts;
