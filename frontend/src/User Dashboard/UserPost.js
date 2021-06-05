import React from 'react';

const UserPost = ({ post }) => {
	return (
		<div style={{ display: 'inline-flex' }}>
			<div
				style={{
					border: '1px solid',
					margin: '8px',
					width: '300px',
					height: '200px',
				}}
			>
				<h4>TITLE</h4>
				{post.title} <br />
				<h4>BODY</h4>
				{post.body}
				<br />
				<button>See Details</button>
			</div>
		</div>
	);
};

export default UserPost;
