import React, { useState, useEffect } from 'react';

const WelcomePage = ({ welcomeMessage, pageLinks, logOut }) => {
	const [name, setName] = useState('');
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));

	useEffect(() => {
		if (userInfo) {
			setName(JSON.parse(localStorage.getItem('userInfo')).fullName);
		}
		welcomeMessage(false);
		pageLinks(false);
		logOut(false);
	}, [welcomeMessage, pageLinks, logOut, userInfo]);

	return <div>Welcome {name}</div>;
};

export default WelcomePage;
