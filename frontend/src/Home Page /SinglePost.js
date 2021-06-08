import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const SinglePost = ({ post }) => {
	const [isPostModalOpen, setIsPostModalOpen] = useState(false);
	const [name, setName] = useState('');

	useEffect(() => {
		let mounted = true;
		axios
			.get(`http://localhost:5000/users/${post.userId}`)
			.then((res) => {
				if (mounted) {
					return setName(res.data.fullName);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		return () => (mounted = false);
	}, [post.userId]);
	return (
		<div className="home-page-single-post-container">
			<h4 className="home-page-post-title">{post.title}</h4>

			{post.body.split(' ').length > 50 ? (
				<>
					<p className="home-page-post-body">
						{post.body.split(' ').slice(0, 49).join(' ')}...
					</p>
					<button
						type="button"
						className="dashboard-post-card-read-more-btn"
						onClick={() => setIsPostModalOpen(true)}
					>
						Read More
					</button>
				</>
			) : (
				<p className="dashboard-post-card-body">
					{post.body.split(' ').slice(0, 29).join(' ')}
				</p>
			)}
			<br />
			{name}
			<Modal
				isOpen={isPostModalOpen}
				onRequestClose={() => setIsPostModalOpen(false)}
				style={{
					overlay: {
						backgroundColor: '#f5f5f5',
					},
					content: {
						width: '60%',
						height: '75%',
						margin: 'auto',
						padding: '30px 50px',
						lineHeight: '1.6',
						textAlign: 'justify',
					},
				}}
			></Modal>
		</div>
	);
};

export default SinglePost;
