import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminUsersTable from './AdminUsersTable';
import './AdminUsers.css';

const AdminUsers = ({ welcomeMessage, dashboardLink }) => {
	const [users, setUsers] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:5000/users/')
			.then((res) => {
				setUsers(res.data.response);
			})
			.catch((err) => console.log(err));

		welcomeMessage(false);
		dashboardLink(true);
	}, [welcomeMessage, dashboardLink]);

	return (
		<div className='admin-dashboard-users-container'>
			{users.length !== 0 &&
				users.map((user, index) => <AdminUsersTable user={user} key={index} />)}
		</div>
	);
};

export default AdminUsers;
