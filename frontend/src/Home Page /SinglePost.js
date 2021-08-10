import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './SinglePost.css';
import { FcLike } from 'react-icons/fc';

Modal.setAppElement('#root');

const SinglePost = ({ post, userName }) => {
	const [isPostModalOpen, setIsPostModalOpen] = useState(false);
	const [name, setName] = useState('');
	const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);
	const [liked, setLiked] = useState('');
	const [likeButtonText, setLikeButtonText] = useState('');
	const [likedButtonClass, setLikedButtonClass] = useState();
	const [comments, setComments] = useState('');
	const [entry, setEntry] = useState('');

	const postId = post._id;
	const likes = post.likes;
	const userId = JSON.parse(localStorage.getItem('userInfo')).id;

	useEffect(() => {
		if (likes.includes(userName)) {
			setLiked(true);
			setLikeButtonText('Liked');
			setLikedButtonClass('home-page-liked-btn');
		} else {
			setLiked(false);
			setLikeButtonText('Like');
			setLikedButtonClass('home-page-like-btn');
		}
	}, [likes, userName, comments, entry]);

	useEffect(() => {
		let mounted = true;

		axios
			.get(`http://localhost:5000/comments/${postId}`)
			.then((res) => {
				if (mounted) {
					return setComments(res.data.data);
				}
			})
			.catch((err) => console.log(err));

		axios
			.get(`http://localhost:5000/users/${post.userId}`)
			.then((res) => {
				if (mounted) {
					return setName(res.data.username);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		return () => (mounted = false);
	}, [post.userId, postId, comments, entry]);

	let handleLikes = Function;
	let handleEntry = Function;

	if (userName !== '') {
		handleLikes = () => {
			if (liked === false && !likes.includes(userName)) {
				setNumberOfLikes(numberOfLikes + 1);
				likes.push(userName);
				setLikeButtonText('Liked');
				setLikedButtonClass('home-page-liked-btn');
			} else if (liked === true && likes.includes(userName)) {
				setNumberOfLikes(numberOfLikes - 1);
				likes.splice(likes.indexOf(userName), 1);
				setLikeButtonText('Like');
				setLikedButtonClass('home-page-like-btn');
			}

			const newPost = {
				likes: likes,
			};

			axios
				.put(`http://localhost:5000/posts/${postId}`, newPost)
				.then((res) => res.data)
				.catch((err) => console.log(err));
		};

		handleEntry = async (e) => {
			e.preventDefault();
			const newEntry = {
				content: entry,
				userId,
				postId,
			};
			await axios
				.post('http://localhost:5000/comments/', newEntry)
				.then((res) => {
					setEntry('');
					console.log(res.data);
				})
				.catch((err) => console.log(err));
		};
	}

	return (
		<div className='home-page-single-post-container'>
			<h3 className='home-page-post-title'>{post.title}</h3>
			<h5>Author: {name}</h5>
			<br />
			{post.body.split(' ').length > 50 ? (
				<p className='home-page-post-body'>
					{post.body.split(' ').slice(0, 49).join(' ')}...{' '}
					<small>
						<a
							href='/#'
							onClick={(e) => {
								e.preventDefault();
								setIsPostModalOpen(true);
							}}>
							continue reading &raquo;
						</a>
					</small>
				</p>
			) : (
				<p className='home-page-post-body'>{post.body}</p>
			)}
			<br />
			{post.imageUrls.length > 5 ? (
				<>
					<div div className='home-page-post-images-container '>
						{post.imageUrls.slice(0, 5).map((imageUrl, index) => (
							<img
								src={imageUrl}
								alt='pic'
								key={index}
								className='home-page-post-image'
							/>
						))}
					</div>
					<div style={{ textAlign: 'center' }}>
						<small>
							<a
								href='/#'
								onClick={(e) => {
									setIsPostModalOpen(true);
									e.preventDefault();
								}}>
								Click here
							</a>{' '}
							to see all images{' '}
						</small>
					</div>
				</>
			) : (
				<div className='home-page-post-images-container '>
					{post.imageUrls.map((imageUrl, index) => (
						<img
							src={imageUrl}
							alt='pic'
							key={index}
							className='home-page-post-image'
						/>
					))}
				</div>
			)}
			<br />
			{post.videoUrl.length !== 0 ? (
				<div className='home-page-post-video-container'>
					<ReactPlayer
						controls
						url={post.videoUrl[0]}
						height='280px'
						width='500px'
					/>
				</div>
			) : null}

			<div className='home-page-post-likes-container'>
				{userName === '' ? (
					<p>
						<FcLike /> <span> Likes {numberOfLikes}</span>
					</p>
				) : (
					<button
						className={likedButtonClass}
						onClick={() => {
							setLiked(!liked);
							setTimeout(() => {
								handleLikes();
							}, 100);
						}}>
						{likeButtonText} {numberOfLikes}
					</button>
				)}
			</div>

			<div className='home-page-comments-container'>
				<h4>Comments</h4>
				<small>
					{comments.length !== 0 &&
						comments.map((comment, index) => (
							<p key={index}>
								{index + 1}. {comment.content} ({comment.userId.username})
							</p>
						))}
				</small>

				<form
					onSubmit={(e) => {
						handleEntry(e);
					}}>
					<input
						placeholder='Write a comment...'
						value={entry}
						onChange={(e) => setEntry(e.target.value)}
					/>
					<button type='submit'>Submit</button>
				</form>
			</div>

			<br />
			<hr />
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
				}}>
				<h3 className='home-page-post-modal-title'>{post.title}</h3>
				<p>{post.body}</p>

				<br />

				<h5>Author: {name}</h5>
				<div className='home-page-post-modal-images-container'>
					{post.imageUrls.map((imageUrl, index) => (
						<img
							src={imageUrl}
							alt='pic'
							key={index}
							className='home-page-post-modal-single-image'
						/>
					))}
				</div>

				<div className='home-page-post-modal-go-back-btn-container'>
					<button
						className='home-page-post-modal-go-back-btn'
						onClick={() => setIsPostModalOpen(false)}>
						Go Back
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default SinglePost;
