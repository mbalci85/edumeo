import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';

const RegistrationForm = ({ welcomeMessage, pageLinks, signOutMessage }) => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordNotMatch, setPasswordNotMatch] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [registered, setRegistered] = useState(false);
	const [blankFullName, setBlankFullName] = useState(false);
	const [passwordLength, setPasswordLength] = useState(false);

	useEffect(() => {
		welcomeMessage(false);
		pageLinks(false);
		signOutMessage(false);
	}, [welcomeMessage, pageLinks, signOutMessage]);

	const register = (e) => {
		if (fullName.trim() !== '') {
			if (password.length > 5) {
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
								localStorage.setItem(
									'token',
									JSON.stringify(response.token),
								);
								localStorage.setItem(
									'userInfo',
									JSON.stringify(response),
								);
							}
						});
				} else {
					setPasswordNotMatch(true);
					setPasswordLength(false);
				}
			} else {
				setPasswordLength(true);
			}
		} else {
			setBlankFullName(true);
		}
		e.preventDefault();
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
							required
						/>
						{blankFullName ? (
							<small className="register-form-validation-warning">
								This field can not be blank
							</small>
						) : null}
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{emailExists ? (
							<small className="register-form-validation-warning">
								This email address exists. Enter another one!
							</small>
						) : null}
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						{passwordLength ? (
							<small className="register-form-validation-warning">
								Enter at least 6 characters
							</small>
						) : null}
						<label htmlFor="confirm-password">Confirm Password</label>
						<input
							id="confirm-password"
							type="password"
							placeholder="Confirm your password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						{passwordNotMatch ? (
							<small className="register-form-validation-warning">
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
				<div className="registration-msg">
					<h3>You have registered successfully</h3> <br />
					<h4>
						<Link to="/login" className="log-in-link">
							Click here{' '}
						</Link>{' '}
						to log in
					</h4>
				</div>
			) : null}
		</>
	);
};

export default RegistrationForm;
