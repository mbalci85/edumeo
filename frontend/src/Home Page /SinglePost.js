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
			<h3 className="home-page-post-title">{post.title}</h3>
			<p>Author: {name}</p>
			<br />

			{post.body.split(' ').length > 50 ? (
				<>
					<p className="home-page-post-body">
						{post.body.split(' ').slice(0, 49).join(' ')}...
					</p>
					<button
						type="button"
						className="home-page-post-read-more-btn"
						onClick={() => setIsPostModalOpen(true)}
					>
						Read More
					</button>
				</>
			) : (
				<p className="home-page-post-body">
					{post.body.split(' ').slice(0, 29).join(' ')}
				</p>
			)}
			<br />

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
			>
				<h3 className="home-page-post-modal-title">{post.title}</h3>
				<p>{post.body}</p>
				<br />
				<p>Author: {name}</p>
				<div className="home-page-post-modal-go-back-btn-container">
					<button
						className="home-page-post-modal-go-back-btn"
						onClick={() => setIsPostModalOpen(false)}
					>
						Go Back
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default SinglePost;
