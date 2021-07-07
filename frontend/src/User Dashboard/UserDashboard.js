import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import PostBoard from './PostBoard';
import './UserDashboard.css';

const UserDashboard = ({ welcomeMessage, pageLinks, logIn, dashboardLink }) => {
	const [name, setName] = useState('');
	const [showPostBoard, setShowPostBoard] = useState(true);

	const userInfo = JSON.parse(localStorage.getItem('userInfo'));

	useEffect(() => {
		if (userInfo) {
			setName(JSON.parse(localStorage.getItem('userInfo')).firstname);
		}
		welcomeMessage(false);
		pageLinks(false);
		logIn(true);
		dashboardLink(false);
	}, [welcomeMessage, pageLinks, userInfo, logIn, dashboardLink]);
	return (
		<>
			<div>
				<h4 className='dashboard-welcome-msg'>Welcome {name}</h4>
			</div>

			{userInfo.role === 'admin' ? (
				<Link
					to='/admin-dashboard'
					onClick={() => {
						setShowPostBoard(false);
					}}>
					Admin Dashboard
				</Link>
			) : null}

			<PostBoard />
		</>
	);
};

export default UserDashboard;
