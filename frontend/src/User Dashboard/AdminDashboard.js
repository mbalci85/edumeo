import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AdminDashboard.css';

Modal.setAppElement('#root');

const AdminDashboard = ({ welcomeMessage, dashboardLink }) => {
	const [users, setUsers] = useState('');
	const [posts, setPosts] = useState('');
	const [isUsersTableOpen, setIsUsersTableOpen] = useState(false);
	const [isPostsTableOpen, setIsPostsTableOpen] = useState(false);

	const userInfo = JSON.parse(localStorage.getItem('userInfo'));

	useEffect(() => {
		axios
			.get('http://localhost:5000/users/')
			.then((res) => {
				setUsers(res.data.response);
			})
			.catch((err) => console.log(err));

		axios
			.get('http://localhost:5000/posts')
			.then((res) => {
				setPosts(res.data.results);
				console.log(res.data.results);
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
				<div className='admin-dashboard-users-table'>
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
