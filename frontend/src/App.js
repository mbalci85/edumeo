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
	const [dashboardLink, setDashboardLink] = useState(false);

	return (
		<div className="container">
			<h1 className="home-page-title">EDUMEO</h1>

			<Router>
				<div className="home-page-links">
					<Link
						to="/"
						className="home-page-links"
						onClick={() => {
							setShowWelcomeMessage(true);

							if (logOut) {
								setShowPageLinks(true);
							} else {
								setDashboardLink(true);
							}
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
					{!logOut ? (
						<>
							<Link to="/dashboard" className="home-page-links">
								| Go to Dashboard
							</Link>
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
						</>
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
					path="/dashboard/"
					render={() => (
						<WelcomePage
							welcomeMessage={setShowWelcomeMessage}
							pageLinks={setShowPageLinks}
							logOut={setLogOut}
						/>
					)}
				/>
			</Router>
		</div>
	);
};

export default App;
