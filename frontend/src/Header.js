import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({
	showWelcomeMessage,
	showPageLinks,
	isLoggedIn,
	dashboardLink,
	signOutMessage,
	setShowWelcomeMessage,
	setShowPageLinks,
	setIsLoggedIn,
	setDashboardLink,
	setSignOutMessage,
}) => {
	return (
		<div className="container">
			<h1 className="home-page-title">EDUMEO</h1>

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
							setTimeout(() => {
								window.location.reload();
							}, 1750);
						}}
					>
						{' '}
						| Log Out
					</Link>
				) : null}
			</div>

			{signOutMessage === true ? (
				<div className="homepage-signout-msg">
					<small>You have signed out successfully.</small>
				</div>
			) : null}

			{showWelcomeMessage ? (
				<h1 className="home-page-welcome-message">Welcome to Edumeo!</h1>
			) : null}
		</div>
	);
};

export default Header;
