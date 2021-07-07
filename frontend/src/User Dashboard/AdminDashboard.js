import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ welcomeMessage, dashboardLink }) => {
	const [users, setUsers] = useState('');

	const userInfo = JSON.parse(localStorage.getItem('userInfo'));

	useEffect(() => {
		axios
			.get('http://localhost:5000/users/')
			.then((res) => {
				console.log(res.data.response);
				setUsers(res.data.response);
			})
			.catch((err) => console.log(err));

		welcomeMessage(false);
		dashboardLink(true);
	}, []);

	return <div>Welcome {userInfo.firstname}</div>;
};

export default AdminDashboard;
