import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from './Login';

import './App.css';
import RegistrationForm from './RegistrationForm';
import WelcomePage from './WelcomePage';

const App = () => {
	const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
	const [showPageLinks, setShowPageLinks] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [dashboardLink, setDashboardLink] = useState(false);
	const [token, setToken] = useState([]);
	const [signOutMessage, setSignOutMessage] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setToken(localStorage.getItem('token'));
			if (token.length !== 0) {
				setShowPageLinks(false);
				setIsLoggedIn(true);
				setDashboardLink(true);
			}
		}, 0.000001);
	}, [token]);

	return (
		<div className="container">
			<h1 className="home-page-title">EDUMEO</h1>

			<Router>
				<div className="home-page-links">
					<Link
						to="/"
						className="home-page-links"
						onClick={() => {
							if (isLoggedIn === false) {
								setShowPageLinks(true);
							} else {
								setDashboardLink(true);
							}
							setShowWelcomeMessage(true);
						}}
					>
						Home{' '}
					</Link>

					{showPageLinks ? (
						<>
							<Link to="/register" className="home-page-links">
								| Register |
							</Link>
							<Link to="/login" className="home-page-links">
								Log In
							</Link>
						</>
					) : null}

					{isLoggedIn === true && dashboardLink === true ? (
						<Link
							to="/dashboard"
							className="home-page-links"
							onClick={() => setDashboardLink(false)}
						>
							| Go to Dashboard
						</Link>
					) : null}

					{isLoggedIn === true ? (
						<Link
							to="/"
							className="home-page-links"
							onClick={() => {
								setShowWelcomeMessage(true);
								setShowPageLinks(true);
								setIsLoggedIn(false);
								setDashboardLink(false);
								setSignOutMessage(true);
								localStorage.setItem('token', []);
								localStorage.setItem('userInfo', {});
							}}
						>
							{' '}
							| Log Out
						</Link>
					) : null}
				</div>

				{signOutMessage === true ? (
					<div>
						<small>
							You have signed out successfully. You might need to refresh
							the page
						</small>
					</div>
				) : null}

				{showWelcomeMessage ? (
					<h1 className="home-page-welcome-message">Welcome to Edumeo!</h1>
				) : null}

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

				<Route
					exact
					path="/dashboard"
					render={() => (
						<WelcomePage
							welcomeMessage={setShowWelcomeMessage}
							pageLinks={setShowPageLinks}
							logIn={setIsLoggedIn}
							dashboardLink={setDashboardLink}
						/>
					)}
				/>
			</Router>
		</div>
	);
};

export default App;
