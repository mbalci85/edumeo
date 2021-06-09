import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

import './App.css';
import RegistrationForm from './RegistrationForm';
import WelcomePage from './User Dashboard/WelcomePage';
import Posts from './Home Page /Posts';
import Header from './Header';

const App = () => {
	const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
	const [showPageLinks, setShowPageLinks] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [dashboardLink, setDashboardLink] = useState(false);
	const [token, setToken] = useState('');
	const [signOutMessage, setSignOutMessage] = useState(false);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (token === null) {
			localStorage.setItem('token', []);
		}
		let mounted = true;
		axios
			.get('http://localhost:5000/posts/')
			.then((res) => {
				if (mounted) {
					return setPosts(res.data.filter((post) => post.isPublished));
				}
			})
			.catch((err) => console.log(err));

		return () => (mounted = false);
	}, [token]);

	useEffect(() => {
		setTimeout(() => {
			setToken(localStorage.getItem('token'));
			if (token && token.length !== 0) {
				setShowPageLinks(false);
				setIsLoggedIn(true);
				setDashboardLink(true);
			}
		}, 0.000001);
	}, [token]);

	return (
		<Router>
			<Header
				showWelcomeMessage={showWelcomeMessage}
				showPageLinks={showPageLinks}
				isLoggedIn={isLoggedIn}
				dashboardLink={dashboardLink}
				signOutMessage={signOutMessage}
				setShowWelcomeMessage={setShowWelcomeMessage}
				setShowPageLinks={setShowPageLinks}
				setIsLoggedIn={setIsLoggedIn}
				setDashboardLink={setDashboardLink}
				setSignOutMessage={setSignOutMessage}
			/>
			<Switch>
				<div className="container">
					<Route exact path="/" render={() => <Posts posts={posts} />} />

					{token.length === 0 ? (
						<Route
							exact
							path="/login"
							render={() => (
								<Login
									welcomeMessage={setShowWelcomeMessage}
									pageLinks={setShowPageLinks}
									signOutMessage={setSignOutMessage}
								/>
							)}
						/>
					) : (
						<Route path="/" />
					)}

					{token.length === 0 ? (
						<Route
							exact
							path="/register"
							render={() => (
								<RegistrationForm
									welcomeMessage={setShowWelcomeMessage}
									pageLinks={setShowPageLinks}
									signOutMessage={setSignOutMessage}
								/>
							)}
						/>
					) : (
						<Route path="/" />
					)}

					{token.length !== 0 ? (
						<Route
							exact
							path="/dashboard/"
							render={() => (
								<WelcomePage
									welcomeMessage={setShowWelcomeMessage}
									pageLinks={setShowPageLinks}
									logIn={setIsLoggedIn}
									dashboardLink={setDashboardLink}
								/>
							)}
						/>
					) : null}
				</div>
			</Switch>
		</Router>
	);
};

export default App;
