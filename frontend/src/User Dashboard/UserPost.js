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
	const [newImages, setNewImages] = useState([]);
	const [newVideo, setNewVideo] = useState([]);
	const [updateMsg, setUpdateMsg] = useState(false);
	const [deleteVideo, setDeleteVideo] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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

	let indices = [];

	const handleDeletePic = (e) => {
		let checked = [];
		let remainingUrls = [];

		if (!indices.includes(e.target.value * 1)) {
			indices.push(e.target.value * 1);
		} else {
			const removeIndex = indices.indexOf(e.target.value * 1);
			indices.splice(removeIndex, 1);
		}

		checked.push(e.target.checked);

		remainingUrls = post.imageUrls.filter((url, index) => !indices.includes(index));
		sessionStorage.setItem('remainingUrls', JSON.stringify(remainingUrls));
		sessionStorage.setItem('checked', JSON.stringify(checked));
	};

	const handleDeleteVideo = (e) => {
		setDeleteVideo(e.target.checked);
	};

	const updatePost = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData();

		if (newImages.length !== 0) {
			for (let i = 0; i < newImages.length; i++) {
				const formsData = new FormData();
				formsData.append('file', newImages[i]);
				formsData.append('upload_preset', 'mbalci85');

				await axios
					.post(
						`https://api.cloudinary.com/v1_1/mustafabalci/image/upload`,
						formsData
					)
					.then((res) => formData.append('imageUrls', res.data.url))
					.catch((err) => console.log(err));
			}
		}

		if (newVideo.length !== 0) {
			const formVideoData = new FormData();
			formVideoData.append('file', newVideo);
			formVideoData.append('upload_preset', 'mbalci85');

			await axios
				.post(
					'https://api.cloudinary.com/v1_1/mustafabalci/auto/upload',
					formVideoData
				)
				.then((res) => formData.append('videoUrl', res.data.url))
				.catch((err) => console.log(err));
		}

		const newUrls = formData.getAll('imageUrls');
		const savedUrls = JSON.parse(sessionStorage.getItem('remainingUrls'));
		const numberChecked = JSON.parse(sessionStorage.getItem('checked'));

		const videoUrl = formData.getAll('videoUrl');

		let imageUrls = [];

		if (savedUrls.length !== 0 || numberChecked.length !== 0) {
			imageUrls = newUrls.concat(savedUrls);
		} else {
			imageUrls = newUrls.concat(post.imageUrls);
		}

		const newPost = {
			title: newTitle,
			body: newBody,
			imageUrls: imageUrls,
			videoUrl: deleteVideo ? [] : videoUrl,
		};

		await axios
			.put(`http://localhost:5000/posts/${postId}`, newPost)
			.then((res) => {
				setIsLoading(false);
				return res.data;
			})
			.catch((err) => console.log(err));

		setUpdateMsg(true);
		sessionStorage.setItem('checked', JSON.stringify([]));
		sessionStorage.setItem('remainingUrls', JSON.stringify([]));

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
		<div className='dashboard-all-posts-container'>
			<div className='dashboard-post-card-container'>
				<h3 className='dashboard-post-card-title'>{post.title}</h3>

				<br />

				{post.body.split(' ').length > 50 ? (
					<p className='dashboard-post-card-body'>
						{post.body.split(' ').slice(0, 49).join(' ')}...{' '}
						<small>
							<a
								href='https://'
								className='dashboard-post-card-read-more-btn'
								onClick={(e) => {
									e.preventDefault();
									setIsReadMoreModalOpen(true);
								}}>
								continue reading &raquo;
							</a>
						</small>
					</p>
				) : (
					<p className='dashboard-post-card-body'>{post.body}</p>
				)}

				<br />

				{post.imageUrls.length > 5 ? (
					<>
						<div className='dashboard-post-card-images-container'>
							{post.imageUrls.slice(0, 5).map((imageUrl, index) => (
								<img
									src={imageUrl}
									alt='pic'
									key={index}
									className='dashboard-post-card-image'
								/>
							))}
						</div>

						<div>
							<small>
								<a
									href='/#'
									onClick={(e) => {
										setIsReadMoreModalOpen(true);
										e.preventDefault();
									}}>
									Click here
								</a>{' '}
								to see all images{' '}
							</small>
						</div>
					</>
				) : post.imageUrls.length !== 0 && !post.imageUrls.includes(null) ? (
					<div className='dashboard-post-card-images-container'>
						{post.imageUrls.map((imageUrl, index) => (
							<img
								src={imageUrl}
								alt='pic'
								key={index}
								className='dashboard-post-card-image'
							/>
						))}
					</div>
				) : null}

				<br />

				{post.videoUrl.length !== 0 ? (
					<div className='dashboard-post-card-video-container'>
						<ReactPlayer
							controls
							url={post.videoUrl[0]}
							height='280px'
							width='500px'
						/>
					</div>
				) : null}

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
					}}>
					<h3 className='read-all-modal-title'>{post.title}</h3>
					<p>{post.body}</p>
					{!post.imageUrls.includes(null) ? (
						<div className='read-all-modal-images-container'>
							{post.imageUrls.map((imageUrl, index) => (
								<img
									src={imageUrl}
									alt='pic'
									key={index}
									className='read-all-modal-single-image'
								/>
							))}
						</div>
					) : null}

					<div className='read-all-modal-go-back-btn-container'>
						<button
							className='read-all-modal-go-back-btn'
							onClick={() => setIsReadMoreModalOpen(false)}>
							Go Back
						</button>
					</div>
				</Modal>

				<div className='dashboard-post-card-btn-container'>
					<button
						type='button'
						className='dashboard-post-card-btn'
						onClick={() => setIsUpdateModalOpen(true)}>
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
								width: '65%',
								height: '75%',
								margin: 'auto',
								padding: '30px 50px',
								lineHeight: '1.6',
								textAlign: 'justify',
							},
						}}>
						<form className='update-post-modal-form' onSubmit={updatePost}>
							<input
								value={newTitle}
								onChange={(e) => {
									setNewTitle(e.target.value);
								}}
							/>
							<textarea
								value={newBody}
								onChange={(e) => {
									setNewBody(e.target.value);
								}}
							/>

							<label htmlFor='update-post-modal-form-add-image'>
								Add Image(s)
							</label>
							<input
								type='file'
								multiple
								className='update-post-modal-form-add-image'
								onChange={(e) => {
									setNewImages(e.target.files);
								}}
							/>

							{post.videoUrl.length === 0 ? (
								<>
									<label htmlFor='update-post-modal-form-add-video'>
										Add a Video
									</label>
									<input
										type='file'
										id='update-post-modal-form-add-video'
										className='update-post-modal-form-add-video'
										onChange={(e) => {
											setNewVideo(e.target.files[0]);
										}}
									/>
								</>
							) : null}

							{post.imageUrls.length !== 0 ? (
								<div className='update-post-modal-form-images-container'>
									{post.imageUrls.map((imageUrl, index) => (
										<div
											style={{ display: 'inline-block' }}
											key={index}>
											<img
												src={imageUrl}
												alt='pic '
												height='200px'
												width='275px'
												className='update-post-modal-form-image'
											/>
											<br />
											<div className='update-post-modal-delete-pic-container'>
												<label htmlFor='update-post-modal-delete-pic'>
													Delete
												</label>
												<input
													type='checkbox'
													className='update-post-modal-delete-pic'
													value={index}
													onChange={handleDeletePic}
												/>
											</div>
										</div>
									))}
								</div>
							) : null}

							{post.videoUrl.length !== 0 ? (
								<div style={{ display: 'inline-block' }}>
									<div className='update-post-modal-form-video-container'>
										<ReactPlayer
											controls
											url={post.videoUrl[0]}
											height='280px'
											width='500px'
										/>
									</div>
									<div className='update-post-modal-delete-video-container'>
										<label htmlFor='update-post-modal-delete-video'>
											Delete
										</label>
										<input
											type='checkbox'
											id='update-post-modal-delete-video'
											className='update-post-modal-delete-video'
											onChange={handleDeleteVideo}
										/>
									</div>
								</div>
							) : null}

							<button type='submit' className='update-post-modal-form-btn'>
								Update
							</button>
							{updateMsg ? (
								<small className='update-post-modal-form-success-msg'>
									You have updated your post successfully
								</small>
							) : null}

							{isLoading ? (
								<small className='update-post-modal-form-loading-msg'>
									Your post is being updated.............
								</small>
							) : null}
						</form>
					</Modal>

					<button
						type='button'
						id='dashboard-post-card-delete-btn'
						className='dashboard-post-card-btn'
						onClick={() => deletePost(post._id)}>
						Delete
					</button>
					<input
						type='checkbox'
						id='checkbox'
						checked={post.isPublished}
						onChange={() => publishPost()}
					/>

					<label
						htmlFor='checkbox'
						className='dashboard-post-card-publish-label'>
						Publish
					</label>
				</div>
			</div>
		</div>
	);
};

export default UserPost;
