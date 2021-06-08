import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const UserPost = ({ post }) => {
	const [isReadAllModalOpen, setIsReadAllModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [newTitle, setNewTitle] = useState(post.title);
	const [newBody, setNewBody] = useState(post.body);
	const [updateMsg, setUpdateMsg] = useState(false);

	const postId = post._id;

	console.log(post.isPublished);

	const publishPost = async () => {
		const publishedPost = {
			isPublished: !post.isPublished,
		};
		await axios
			.put(`http://localhost:5000/posts/${postId}`, publishedPost)
			.then((res) => res.data)
			.catch((err) => console.log(err));
		window.location.reload();
	};

	const updatePost = async (e) => {
		e.preventDefault();
		const newPost = {
			title: newTitle,
			body: newBody,
		};
		await axios
			.put(`http://localhost:5000/posts/${postId}`, newPost)
			.then((res) => res.data)
			.catch((err) => console.log(err));
		setUpdateMsg(true);
		setTimeout(() => {
			setIsUpdateModalOpen(false);
		}, 2000);
		setTimeout(() => {
			window.location.reload();
		}, 2001);
	};

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
				{post.body.split(' ').length > 29 ? (
					<>
						<p className="dashboard-post-card-body">
							{post.body.split(' ').slice(0, 29).join(' ')}...
						</p>
						<br />
						<button
							type="button"
							className="dashboard-post-card-read-more-btn"
							onClick={() => setIsReadAllModalOpen(true)}
						>
							Read More
						</button>
					</>
				) : (
					<p className="dashboard-post-card-body">
						{post.body.split(' ').slice(0, 29).join(' ')}
					</p>
				)}
				<Modal
					isOpen={isReadAllModalOpen}
					onRequestClose={() => setIsReadAllModalOpen(false)}
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
					<h3 className="read-all-modal-title">{post.title}</h3>
					<p>{post.body}</p>
					<div className="read-all-modal-go-back-btn-container">
						<button
							className="read-all-modal-go-back-btn"
							onClick={() => setIsReadAllModalOpen(false)}
						>
							Go Back
						</button>
					</div>
				</Modal>
				<div className="dashboard-post-card-btn-container">
					<button
						type="button"
						className="dashboard-post-card-btn"
						onClick={() => setIsUpdateModalOpen(true)}
					>
						Update
					</button>
					<Modal
						isOpen={isUpdateModalOpen}
						onRequestClose={() => setIsUpdateModalOpen(false)}
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
						<form
							className="update-post-modal-form"
							onSubmit={updatePost}
						>
							<input
								value={newTitle}
								onChange={(e) => setNewTitle(e.target.value)}
							/>
							<textarea
								value={newBody}
								onChange={(e) => setNewBody(e.target.value)}
							/>
							<button
								type="submit"
								className="update-post-modal-form-btn"
							>
								Update
							</button>
							{updateMsg ? (
								<small className="update-post-modal-form-success-msg">
									You have updated your post successfully
								</small>
							) : null}
						</form>
					</Modal>
					<button
						type="button"
						id="dashboard-post-card-delete-btn"
						className="dashboard-post-card-btn"
						onClick={() => deletePost(post._id)}
					>
						Delete
					</button>
					<input
						type="checkbox"
						id="checkbox"
						checked={post.isPublished}
						onChange={() => publishPost()}
					/>
					<label
						htmlFor="checkbox"
						className="dashboard-post-card-publish-label"
					>
						Publish
					</label>
				</div>
			</div>
		</div>
	);
};

export default UserPost;
