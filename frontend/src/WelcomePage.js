import React, { useState, useEffect } from 'react';

const WelcomePage = ({ welcomeMessage, pageLinks, logOut }) => {
	const [name, setName] = useState('');

	useEffect(() => {
		setName(JSON.parse(localStorage.getItem('userInfo')).fullName);
		welcomeMessage(false);
		pageLinks(false);
		logOut(false);
	}, [welcomeMessage, pageLinks, logOut]);

	return <div>Welcome {name}</div>;
};

export default WelcomePage;
