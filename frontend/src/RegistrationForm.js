import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const RegistrationForm = ({ welcomeMessage, pageLinks }) => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordNotMatch, setPasswordNotMatch] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [registered, setRegistered] = useState(false);

	useEffect(() => {
		welcomeMessage(false);
		pageLinks(false);
	}, [welcomeMessage, pageLinks]);

	const register = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			axios
				.post('http://localhost:5000/users/signup', {
					fullName,
					email,
					password,
				})
				.then(async (res) => {
					if (!res.data.status) {
						setEmailExists(true);
						setPassword('');
						setConfirmPassword('');
						setPasswordNotMatch(false);
					} else {
						setRegistered(true);
						const response = await axios
							.post('http://localhost:5000/users/signin', {
								email,
								password,
							})
							.then((res) => res.data)
							.catch((err) => console.log(err));
						localStorage.setItem('token', JSON.stringify(response.token));
						localStorage.setItem('userInfo', JSON.stringify(response));
					}
				});
		} else {
			setPasswordNotMatch(true);
		}
	};

	return (
		<>
			{!registered ? (
				<div className="container">
					<h1>Registration Form</h1>
					<form className="sign-up-form" onSubmit={register}>
						<label htmlFor="fullname">Full Name</label>
						<input
							id="fullname"
							placeholder="Enter your full name"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
						/>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{emailExists ? (
							<small className="email-exists">
								This email address exists. Enter another one!
							</small>
						) : null}
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label htmlFor="confirm-password">Confirm Password</label>
						<input
							id="confirm-password"
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						{passwordNotMatch ? (
							<small className="password-not-match">
								Password does not match
							</small>
						) : null}

						<button type="submit" className="register-btn">
							Register
						</button>
						<p>
							If you have already registered, click{' '}
							<a href="/login" className="log-in-link">
								<span>Log In</span>
							</a>
						</p>
					</form>
				</div>
			) : null}
			{registered ? (
				<div>
					<h3>You have registered successfully</h3>
					<h4>
						<a href="/login" className="log-in-link">
							Click here
						</a>{' '}
						to log in
					</h4>
				</div>
			) : null}
		</>
	);
};

export default RegistrationForm;
