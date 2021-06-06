import React from 'react';
import axios from 'axios';

const UserPost = ({ post }) => {
	const deletePost = (id) => {
		axios
			.delete(`http://localhost:5000/posts/delete/${id}`)
			.then((res) => res.data)
			.catch((err) => {
				console.log(err);
			});

		setTimeout(() => {
			window.location.reload();
		}, 500);
	};
	return (
		<div className="dashboard-all-posts-container">
			<div className="dashboard-post-card-container">
				<h3 className="dashboard-post-card-title">{post.title}</h3> <br />
				<p>{post.body.split(' ').slice(0, 30).join(' ')}.....</p>
				<br />
				<div className="dashboard-post-card-btn-container">
					<button type="button" className="dashboard-post-card-btn">
						See Details
					</button>
					<button type="button" className="dashboard-post-card-btn">
						Update
					</button>
					<button
						type="button"
						className="dashboard-post-card-btn"
						onClick={() => deletePost(post._id)}
					>
						Delete
					</button>
					<input type="checkbox" id="checkbox" />
					<label htmlFor="checkbox">Publish</label>
				</div>
			</div>
		</div>
	);
};

export default UserPost;
