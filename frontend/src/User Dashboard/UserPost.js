import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const UserPost = ({ post }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

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
				<p>{post.body.split(' ').slice(0, 29).join(' ')}</p>
				<br />
				{post.body.split(' ').length > 29 ? (
					<button
						type="button"
						className="dashboard-post-card-btn"
						onClick={() => setIsModalOpen(true)}
					>
						Read All
					</button>
				) : null}
				<Modal
					isOpen={isModalOpen}
					onRequestClose={() => setIsModalOpen(false)}
					style={{
						overlay: {
							backgroundColor: '#f5f5f5',
						},
						content: {
							width: '60%',
							height: '75%',
							margin: 'auto',
							padding: '30px',
							lineHeight: '1.6',
						},
					}}
				>
					<h3 className="read-all-modal-title">{post.title}</h3>
					<h5>{post.body}</h5>
					<div className="read-all-modal-go-back-btn-container">
						<button
							className="read-all-modal-go-back-btn"
							onClick={() => setIsModalOpen(false)}
						>
							Go Back
						</button>
					</div>
				</Modal>
				<div className="dashboard-post-card-btn-container">
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
