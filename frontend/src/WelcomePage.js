import React, { useState, useEffect } from 'react';
import './App.css';

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

	return (
		<div>
			<div className="dashboard-welcome-msg">
				<h4>Welcome {name}</h4>
			</div>

			<div>
				<form className="post-form">
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
				</form>
			</div>
		</div>
	);
};

export default WelcomePage;
