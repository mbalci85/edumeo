import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import UserPosts from './UserPosts';

const WelcomePage = ({ welcomeMessage, pageLinks, logIn, dashboardLink }) => {
	const [name, setName] = useState('');
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [blankNote, setBlankNote] = useState(false);
	const [createPostNote, setCreatePostNote] = useState(false);
	const [posts, setPosts] = useState('');
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));

	useEffect(() => {
		if (userInfo) {
			setName(JSON.parse(localStorage.getItem('userInfo')).fullName);
		}
		welcomeMessage(false);
		pageLinks(false);
		logIn(true);
		dashboardLink(false);
	}, [welcomeMessage, pageLinks, userInfo, logIn, dashboardLink]);

	useEffect(() => {
		axios
			.get('http://localhost:5000/posts')
			.then((res) => setPosts(res.data))
			.catch((err) => console.log(err));
	}, [setPosts]);

	const createPost = (e) => {
		e.preventDefault();
		setBlankNote(false);
		setCreatePostNote(false);
		if (title.trim() !== '' && body.trim() !== '') {
			axios
				.post('http://localhost:5000/posts', {
					title,
					body,
				})
				.then((res) => res.data)
				.catch((err) => console.log(err));
			setTitle('');
			setBody('');
			setCreatePostNote(true);
		} else {
			setBlankNote(true);
		}
	};

	return (
		<div>
			<div className="dashboard-welcome-msg">
				<h4>Welcome {name}</h4>
			</div>

			<div>
				<form className="post-form" onSubmit={createPost}>
					<label htmlFor="title">Title</label>
					<input
						id="title"
						placeholder="Enter your title..."
						type="text"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
							setCreatePostNote(false);
							setBlankNote(false);
						}}
					/>
					<label htmlFor="body">Post</label>
					<textarea
						id="body"
						placeholder="Enter your post body..."
						type="text"
						value={body}
						onChange={(e) => {
							setBody(e.target.value);
							setCreatePostNote(false);
							setBlankNote(false);
						}}
					/>
					<button className="create-post-btn">Create Post</button>
					{blankNote ? (
						<small>Title or post body can not be blank</small>
					) : null}
					{createPostNote ? (
						<small>You have published your post successfully</small>
					) : null}
				</form>
			</div>
			<div className="dashboard-posts-list-container">
				<h2 className="dashboard-posts-list-container-title">My Posts</h2>
				<div>
					<UserPosts posts={posts} />
				</div>
			</div>
		</div>
	);
};

export default WelcomePage;
