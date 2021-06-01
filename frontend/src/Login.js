import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import './App.css';

const Login = ({ welcomeMessage, pageLinks, signOutMessage }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [wrongPasswordEmail, setWrongPasswordEmail] = useState(false);

	const history = useHistory();

	useEffect(() => {
		welcomeMessage(false);
		pageLinks(false);
		signOutMessage(false);
	}, [welcomeMessage, pageLinks, signOutMessage]);

	const logIn = async (e) => {
		e.preventDefault();
		const response = await axios
			.post('http://localhost:5000/users/signin', {
				email,
				password,
			})
			.then((res) => res.data)
			.catch((err) => console.log(err));
		if (response.status) {
			localStorage.setItem('token', JSON.stringify(response.token));
			localStorage.setItem('userInfo', JSON.stringify(response));

			history.push('/dashboard');
		} else {
			setWrongPasswordEmail(true);
		}
	};

	return (
		<div className="container">
			<h1>Login Form</h1>
			<form className="sign-up-form" onSubmit={logIn}>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="fullname"
					type="password"
					placeholder="Enter password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button type="submit" className="register-btn">
					Log In
				</button>
				<p style={{ textAlign: 'center' }}>
					Don't have an account?{' '}
					<a href="/register" className="log-in-link">
						Sign Up
					</a>
				</p>
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
