import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import './Login.css';

const Login = ({ welcomeMessage, pageLinks, signOutMessage }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [wrongPasswordEmail, setWrongPasswordEmail] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const history = useHistory();

	useEffect(() => {
		welcomeMessage(false);
		pageLinks(false);
		signOutMessage(false);
	}, [welcomeMessage, pageLinks, signOutMessage]);

	const logIn = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setWrongPasswordEmail(false);
		const response = await axios
			.post('http://localhost:5000/users/signin', {
				email,
				password,
			})
			.then((res) => {
				setIsLoading(false);
				return res.data;
			})
			.catch((err) => console.log(err));
		if (response.status) {
			localStorage.setItem('token', JSON.stringify(response.token));
			localStorage.setItem('userInfo', JSON.stringify(response));
			setTimeout(() => {
				window.location.reload();
			}, 0.0001);

			history.push('/dashboard');
		} else {
			setWrongPasswordEmail(true);
		}
	};

	return (
		<div className="container">
			<h1>Login Form</h1>
			<form className="login-form" onSubmit={logIn}>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					placeholder="Enter your email"
					value={email}
					required
					type="email"
					onChange={(e) => {
						setEmail(e.target.value);
						setWrongPasswordEmail(false);
					}}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					placeholder="Enter password"
					value={password}
					required
					onChange={(e) => {
						setPassword(e.target.value);
						setWrongPasswordEmail(false);
					}}
				/>

				<button type="submit" className="login-btn">
					Log In
				</button>
				{isLoading ? (
					<small className="login-form-loading-msg">
						Checking your credentials ................
					</small>
				) : null}
				{!isLoading ? (
					<p style={{ textAlign: 'center' }}>
						Don't have an account?{' '}
						<a href="/register" className="sign-up-link">
							Sign Up
						</a>
					</p>
				) : null}
				{wrongPasswordEmail ? (
					<small className="wrong-email-password">
						Wrong email or password!!!
					</small>
				) : null}
			</form>
		</div>
	);
};

export default Login;
