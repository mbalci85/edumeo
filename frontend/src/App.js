import React from 'react';
import './App.css';

const App = () => {
	return (
		<div className="container">
			<h1>Registration Form</h1>
			<form className="sign-up-form">
				<label html for="fullname">
					Full Name
				</label>
				<input id="fullname" placeholder="Enter your full name" />
				<label html for="email">
					Email
				</label>
				<input id="email" placeholder="Enter your email" />
				<label html for="password">
					Password
				</label>
				<input id="fullname" type="password" placeholder="Enter password" />
				<label html for="confirm-password">
					Confirm Password
				</label>
				<input
					id="confirm-password"
					type="password"
					placeholder="Confirm password"
				/>
				<button type="submit" className="register-btn">
					Register
				</button>
				<p>
					If you have already registered, click{' '}
					<span className="log-in-link">Log In</span>
				</p>
			</form>
		</div>
	);
};

export default App;
