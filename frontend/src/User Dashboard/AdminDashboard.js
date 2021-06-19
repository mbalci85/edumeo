import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
	const [users, setUsers] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:5000/users/')
			.then((res) => setUsers(res.data))
			.catch((err) => console.log(err));
		console.log(users);
	});

	return <div>Hello World!!!</div>;
};

export default AdminDashboard;
