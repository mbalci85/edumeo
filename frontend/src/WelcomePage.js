import React, { useState, useEffect } from 'react';
import './App.css';
// import axios from 'axios';

const WelcomePage = ({ welcomeMessage, pageLinks, logIn, dashboardLink }) => {
	const [name, setName] = useState('');
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
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

	const publish = async (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<div className="dashboard-welcome-msg">
				<h4>Welcome {name}</h4>
			</div>

			<div>
				<form className="post-form" onSubmit={publish}>
					<label htmlFor="title">Title</label>
					<input
						id="title"
						placeholder="Enter your title..."
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<label htmlFor="body">Post</label>
					<textarea
						id="body"
						placeholder="Enter your post body..."
						type="text"
						value={body}
						onChange={(e) => setBody(e.target.value)}
					/>
					<button className="publish-btn">Publish</button>
				</form>
			</div>
		</div>
	);
};

export default WelcomePage;
