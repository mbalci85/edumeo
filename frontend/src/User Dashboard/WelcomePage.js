import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import UserPosts from './UserPosts';
import './WelcomePage.css';

const WelcomePage = ({ welcomeMessage, pageLinks, logIn, dashboardLink }) => {
	const [name, setName] = useState('');
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [blankNote, setBlankNote] = useState(false);
	const [createPostNote, setCreatePostNote] = useState(false);
	const [posts, setPosts] = useState([]);
	const [userId, setUserId] = useState('');
	const [uploadedImages, setUploadedImages] = useState([]);
	const [uploadedVideo, setUploadedVideo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [numberOfPosts, setNumberOfPosts] = useState();
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));

	useEffect(() => {
		if (userInfo) {
			setName(JSON.parse(localStorage.getItem('userInfo')).firstname);
			setUserId(JSON.parse(localStorage.getItem('userInfo')).id);
		}
		welcomeMessage(false);
		pageLinks(false);
		logIn(true);
		dashboardLink(false);
	}, [welcomeMessage, pageLinks, userInfo, logIn, dashboardLink]);

	useEffect(() => {
		let mounted = true;

		if (page) {
			axios
				.get(
					`http://localhost:5000/posts/userid/${userId}?page=${page}&limit=${limit}`
				)
				.then((res) => {
					if (mounted) {
						return setPosts(res.data);
					}
				})
				.catch((err) => console.log(err));
		}

		axios
			.get(`http://localhost:5000/posts/`)
			.then((res) => setNumberOfPosts(res.data.total))
			.catch((err) => console.log(err));

		return () => (mounted = false);
	}, [userId, page, limit]);

	const createPost = async (e) => {
		e.preventDefault();
		setBlankNote(false);
		setCreatePostNote(false);
		setIsLoading(true);
		const formData = new FormData();
		if (title.trim() !== '' && body.trim() !== '') {
			if (uploadedImages.length !== 0) {
				for (let i = 0; i < uploadedImages.length; i++) {
					const formsData = new FormData();
					formsData.append('file', uploadedImages[i]);
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
			if (uploadedVideo.length !== 0) {
				const formVideoData = new FormData();
				formVideoData.append('file', uploadedVideo);
				formVideoData.append('upload_preset', 'mbalci85');

				await axios
					.post(
						'https://api.cloudinary.com/v1_1/mustafabalci/auto/upload',
						formVideoData
					)
					.then((res) => formData.append('videoUrl', res.data.url))
					.catch((err) => console.log(err));
			}
		} else {
			setBlankNote(true);
		}

		const imageUrls = formData.getAll('imageUrls');
		const videoUrl = formData.getAll('videoUrl');

		await axios
			.post('http://localhost:5000/posts', {
				title,
				body,
				userId,
				imageUrls,
				videoUrl,
			})
			.then((res) => {
				setIsLoading(false);
				return res.data;
			})
			.catch((err) => console.log(err));

		setTitle('');
		setBody('');
		setCreatePostNote(true);

		setTimeout(() => {
			window.location.reload();
		}, 1250);
	};

	return (
		<div className='dashboard-container'>
			<div className='dashboard-welcome-msg'>
				<h4>Welcome {name}</h4>
			</div>

			<div>
				<form className='post-form' onSubmit={createPost}>
					<label htmlFor='title'>Title</label>
					<input
						id='title'
						className='post-form-post-title'
						placeholder='Enter your title...'
						type='text'
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
							setCreatePostNote(false);
							setBlankNote(false);
							setIsLoading(false);
						}}
					/>
					<label htmlFor='body'>Post</label>
					<textarea
						id='body'
						placeholder='Enter your post body...'
						type='text'
						value={body}
						onChange={(e) => {
							setBody(e.target.value);
							setCreatePostNote(false);
							setBlankNote(false);
							setIsLoading(false);
						}}
					/>
					<label id='post-form-add-image'>Add Image(s)</label>
					<input
						type='file'
						multiple
						id='post-form-add-image'
						className='post-form-add-media'
						onChange={(e) => {
							setUploadedImages(e.target.files);
							setIsLoading(false);
						}}
					/>

					<label id='post-form-add-video'>Add a Video</label>
					<input
						type='file'
						id='post-form-add-video'
						className='post-form-add-media'
						onChange={(e) => {
							setUploadedVideo(e.target.files[0]);
							setIsLoading(false);
						}}
					/>

					<button className='create-post-btn'>Create Post</button>

					{blankNote ? (
						<small className='create-post-failure-note'>
							Title or post body can not be blank
						</small>
					) : null}
					{createPostNote ? (
						<small className='create-post-success-note'>
							You have created a post successfully
						</small>
					) : null}

					{isLoading && !blankNote ? (
						<small className='create-post-loading-msg'>
							Your post is being created.............
						</small>
					) : null}
				</form>
			</div>
			<div className='dashboard-posts-list-container'>
				<h2 className='dashboard-posts-list-container-title'>My Posts</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						console.log(page);
					}}>
					<label className='dashboard-posts-list-pagination-label'>
						Page <strong>{page}</strong>
					</label>
					<br />
					<div>
						1{' '}
						<input
							type='range'
							min='1'
							max={Math.ceil(numberOfPosts / limit)}
							value={page}
							className='dashboard-posts-list-pagination-input'
							onChange={(e) => {
								e.preventDefault();
								setPage(e.target.value);
							}}
						/>{' '}
						{numberOfPosts === 0 ? 1 : Math.ceil(numberOfPosts / limit)}
					</div>
				</form>
				<div>
					<UserPosts posts={posts} />
				</div>
			</div>
		</div>
	);
};

export default WelcomePage;
