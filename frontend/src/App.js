import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

import './App.css';
import RegistrationForm from './RegistrationForm';
import UserDashboard from './User Dashboard/UserDashboard';
import Posts from './Home Page /Posts';
import Header from './Header';
import AdminDashboard from '../src/User Dashboard/AdminDashboard';
import AdminUsers from './User Dashboard/AdminUsers';

const App = () => {
	const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
	const [showPageLinks, setShowPageLinks] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [dashboardLink, setDashboardLink] = useState(false);
	const [token, setToken] = useState('');
	const [signOutMessage, setSignOutMessage] = useState(false);
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [userName, setUserName] = useState('');
	const [numberOfPublishedPosts, setNumberOfPublishedPosts] = useState();

	const API_BASE_URL = 'http://localhost:5000';

	useEffect(() => {
		let mounted = true;
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));

		if (userInfo && Object.entries(userInfo).length !== 0) {
			setUserName(userInfo.username);
		}

		if (token === null) {
			localStorage.setItem('token', JSON.stringify([]));
		}

		if (page) {
			axios
				.get(`${API_BASE_URL}/posts/ispublished/true?page=${page}&limit=${limit}`)
				.then((res) => {
					if (mounted) {
						return setPosts(res.data);
					}
				})
				.catch((err) => console.log(err));
		}
		axios
			.get(`${API_BASE_URL}/posts/ispublished/true`)
			.then((res) => {
				setNumberOfPublishedPosts(res.data.length);
			})
			.catch((err) => console.log(err));

		return () => (mounted = false);
	}, [token, page, limit]);

	useEffect(() => {
		setTimeout(() => {
			if (localStorage.getItem('token')) {
				setToken(localStorage.getItem('token'));
			}

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
				<div className='container'>
					<Route
						exact
						path='/'
						render={() => (
							<Posts
								posts={posts}
								userName={userName}
								setPage={setPage}
								page={page}
								numberOfPages={
									numberOfPublishedPosts === 0
										? 1
										: Math.ceil(numberOfPublishedPosts / limit)
								}
							/>
						)}
					/>

					{token.length === 0 ? (
						<Route
							exact
							path='/login'
							render={() => (
								<Login
									welcomeMessage={setShowWelcomeMessage}
									pageLinks={setShowPageLinks}
									signOutMessage={setSignOutMessage}
								/>
							)}
						/>
					) : (
						<Route path='/' />
					)}

					{token.length === 0 ? (
						<Route
							exact
							path='/register'
							render={() => (
								<RegistrationForm
									welcomeMessage={setShowWelcomeMessage}
									pageLinks={setShowPageLinks}
									signOutMessage={setSignOutMessage}
								/>
							)}
						/>
					) : (
						<Route path='/' />
					)}

					{token.length !== 0 ? (
						<Route
							path='/dashboard/'
							render={() => (
								<UserDashboard
									welcomeMessage={setShowWelcomeMessage}
									pageLinks={setShowPageLinks}
									logIn={setIsLoggedIn}
									dashboardLink={setDashboardLink}
								/>
							)}
						/>
					) : null}

					{token.length !== 0 ? (
						<Route
							exact
							path='/admin-dashboard'
							render={() => (
								<AdminDashboard
									welcomeMessage={setShowWelcomeMessage}
									dashboardLink={setDashboardLink}
								/>
							)}
						/>
					) : null}

					<Route
						exact
						path='/admin-dashboard/users'
						render={() => (
							<AdminUsers
								welcomeMessage={setShowWelcomeMessage}
								dashboardLink={setDashboardLink}
							/>
						)}
					/>
				</div>
			</Switch>
		</Router>
	);
};

export default App;
