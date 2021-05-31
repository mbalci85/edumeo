import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from './Login';

import './App.css';
import RegistrationForm from './RegistrationForm';
import WelcomePage from './WelcomePage';

const App = () => {
	const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
	const [showPageLinks, setShowPageLinks] = useState(true);
	const [logOut, setLogOut] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [dashboardLink, setDashboardLink] = useState(true);

	return (
		<div className="container">
			<h1 className="home-page-title">EDUMEO</h1>

			<Router>
				<div className="home-page-links">
					<Link
						to="/"
						className="home-page-links"
						onClick={() => {
							if (logOut) {
								setShowPageLinks(true);
								setDashboardLink(false);
							} else if (isLoggedIn) {
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

					{isLoggedIn && dashboardLink ? (
						<Link
							to="/dashboard"
							className="home-page-links"
							onClick={() => setDashboardLink(true)}
						>
							| Go to Dashboard
						</Link>
					) : null}

					{!logOut ? (
						<Link
							to="/"
							className="home-page-links"
							onClick={() => {
								setShowWelcomeMessage(true);
								setShowPageLinks(true);
								setLogOut(true);
								localStorage.setItem('token', []);
								localStorage.setItem('userInfo', {});
							}}
						>
							{' '}
							| Log Out
						</Link>
					) : null}
				</div>
				{showWelcomeMessage ? (
					<h1 className="home-page-welcome-message">Welcome to Edumeo!</h1>
				) : null}

				<Route
					exact
					path="/login"
					render={() => (
						<Login
							welcomeMessage={setShowWelcomeMessage}
							pageLinks={setShowPageLinks}
						/>
					)}
				/>
				<Route
					exact
					path="/register"
					render={() => (
						<RegistrationForm
							welcomeMessage={setShowWelcomeMessage}
							pageLinks={setShowPageLinks}
						/>
					)}
				/>

				<Route
					exact
					path="/dashboard"
					render={() => (
						<WelcomePage
							welcomeMessage={setShowWelcomeMessage}
							pageLinks={setShowPageLinks}
							logOut={setLogOut}
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
