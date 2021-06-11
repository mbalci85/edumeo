import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './UserPost.css';
import ReactPlayer from 'react-player';
Modal.setAppElement('#root');

const UserPost = ({ post }) => {
	const [isReadMoreModalOpen, setIsReadMoreModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [newTitle, setNewTitle] = useState(post.title);
	const [newBody, setNewBody] = useState(post.body);
	const [updateMsg, setUpdateMsg] = useState(false);

	const postId = post._id;

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
				<h3 className="dashboard-post-card-title">{post.title}</h3>
				<br />
				{post.body.split(' ').length > 50 ? (
					<>
						<p className="dashboard-post-card-body">
							{post.body.split(' ').slice(0, 49).join(' ')}...{' '}
							<small>
								<a
									href="https://"
									className="dashboard-post-card-read-more-btn"
									onClick={(e) => {
										e.preventDefault();
										setIsReadMoreModalOpen(true);
									}}
								>
									continue reading &gt;
								</a>
							</small>
						</p>

						<br />
						<div className="dashboard-post-card-images-container">
							{post.imageUrls.slice(0, 5).map((imageUrl, index) => (
								<img
									src={imageUrl}
									alt="pic"
									key={index}
									className="dashboard-post-card-image"
								/>
							))}
						</div>
						{post.imageUrls.length > 5 ? (
							<div>
								<small>
									<a
										href="/#"
										onClick={(e) => {
											setIsReadMoreModalOpen(true);
											e.preventDefault();
										}}
									>
										Click here
									</a>{' '}
									to see more images{' '}
								</small>
							</div>
						) : null}
						<br />
						{post.videoUrl.length !== 0 ? (
							<div className="dashboard-post-card-video-container">
								<ReactPlayer
									controls
									url={post.videoUrl[0]}
									height="280px"
									width="500px"
								/>
							</div>
						) : null}
					</>
				) : post.body.split(' ').length <= 49 &&
				  post.imageUrls.length > 5 ? (
					<>
						<p className="dashboard-post-card-body">{post.body}</p>
						<br />
						<div className="dashboard-post-card-images-container">
							{post.imageUrls.slice(0, 5).map((imageUrl, index) => (
								<img
									src={imageUrl}
									alt="pic"
									key={index}
									className="dashboard-post-card-image"
								/>
							))}
						</div>
						<br />
						<small>
							<a
								href="/#"
								onClick={(e) => {
									setIsReadMoreModalOpen(true);
									e.preventDefault();
								}}
							>
								Click here
							</a>{' '}
							to see more images{' '}
						</small>
						<br />
						{post.videoUrl.length !== 0 ? (
							<div className="dashboard-post-card-video-container">
								<ReactPlayer
									controls
									url={post.videoUrl[0]}
									height="280px"
									width="500px"
								/>
							</div>
						) : null}
					</>
				) : (
					<>
						<p className="dashboard-post-card-body">
							{post.body}
							<br />
							<div className="dashboard-post-card-images-container">
								{post.imageUrls.map((imageUrl, index) => (
									<img
										src={imageUrl}
										alt="pic"
										key={index}
										className="dashboard-post-card-image"
									/>
								))}
							</div>
						</p>
						{post.videoUrl.length !== 0 ? (
							<div className="dashboard-post-card-video-container">
								<ReactPlayer
									controls
									url={post.videoUrl[0]}
									height="280px"
									width="500px"
								/>
							</div>
						) : null}
					</>
				)}

				<Modal
					isOpen={isReadMoreModalOpen}
					onRequestClose={() => setIsReadMoreModalOpen(false)}
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
					<div className="read-all-modal-images-container">
						{post.imageUrls.map((imageUrl, index) => (
							<img
								src={imageUrl}
								alt="pic"
								key={index}
								className="read-all-modal-single-image"
							/>
						))}
					</div>

					<div className="read-all-modal-go-back-btn-container">
						<button
							className="read-all-modal-go-back-btn"
							onClick={() => setIsReadMoreModalOpen(false)}
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

							<input
								type="file"
								className="update-post-modal-form-add-media"
							/>
							<small
								className="update-post-modal-form-add-media-note"
								style={{ color: 'red' }}
							>
								When you upload new images, previous one(s) will be
								removed if you have already added
							</small>

							<div className="update-post-modal-form-images-container">
								{post.imageUrls.map((imageUrl, index) => (
									<img
										src={imageUrl}
										alt="pic "
										key={index}
										height="200px"
										width="275px"
										className="update-post-modal-form-image"
									/>
								))}
							</div>
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
