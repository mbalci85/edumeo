import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from './Login';

import './App.css';
import RegistrationForm from './RegistrationForm';
import WelcomePage from './WelcomePage';

const App = () => {
	return (
		<div className="container">
			<h1 className="home-page-title">EDUMEO</h1>
			<Router>
				<div className="home-page-links">
					<Link to="/" className="home-page-links">
						Home |
					</Link>
					<Link to="/register" className="home-page-links">
						Register |
					</Link>
					<Link to="/login" className="home-page-links">
						{' '}
						Login
					</Link>
				</div>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={RegistrationForm} />
				<Route exact path="/dashboard" component={WelcomePage} />
			</Router>
		</div>
	);
};

export default App;
