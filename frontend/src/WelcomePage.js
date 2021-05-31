import React, { useState, useEffect } from 'react';

const WelcomePage = ({
	welcomeMessage,
	pageLinks,
	logOut,
	logIn,
	dashboardLink,
}) => {
	const [name, setName] = useState('');
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));

	useEffect(() => {
		if (userInfo) {
			setName(JSON.parse(localStorage.getItem('userInfo')).fullName);
		}
		welcomeMessage(false);
		pageLinks(false);
		logOut(false);
		logIn(true);
		dashboardLink(false);
	}, [welcomeMessage, pageLinks, logOut, userInfo, logIn, dashboardLink]);

	return <div>Welcome {name}</div>;
};

export default WelcomePage;
