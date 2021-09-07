import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { useHistory } from 'react-router';

const AdminDashboard = ({ welcomeMessage, dashboardLink }) => {
	const [users, setUsers] = useState('');
	const [posts, setPosts] = useState('');

	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const history = useHistory();
	const API_BASE_URL = 'http://localhost:5000';

	useEffect(() => {
		axios
			.get(`${API_BASE_URL}/users`)
			.then((res) => {
				setUsers(res.data.response);
			})
			.catch((err) => console.log(err));

		axios
			.get(`${API_BASE_URL}/posts`)
			.then((res) => {
				setPosts(res.data.results);
			})
			.catch((err) => console.log(err));

		welcomeMessage(false);
		dashboardLink(true);
	}, [welcomeMessage, dashboardLink]);

	return (
		<>
			<div>
				<h4 className='dashboard-welcome-msg'>Welcome {userInfo.firstname}</h4>
			</div>
			<div className='admin-dashboard-tables-container'>
				<div
					className='admin-dashboard-users-table'
					onClick={() => history.push(`/admin-dashboard/users`)}>
					<h1>USERS</h1>
					<h3>{users.length}</h3>
				</div>

				<div className='admin-dashboard-posts-table'>
					<h1>POSTS</h1>
					<h3>{posts.length}</h3>
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
