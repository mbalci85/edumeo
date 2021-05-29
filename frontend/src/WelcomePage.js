import React, { useState, useEffect } from 'react';

const WelcomePage = () => {
	const [name, setName] = useState('');

	useEffect(() => {
		setName(JSON.parse(localStorage.getItem('userInfo')).fullName);
	}, []);

	return <div>Welcome {name}</div>;
};

export default WelcomePage;
