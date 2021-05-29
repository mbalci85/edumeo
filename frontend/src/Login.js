import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import './App.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();

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
			history.push('/dashboard');
		} else {
			alert('Wrong Email or password');
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
						<span>Sign Up</span>
					</a>
				</p>
			</form>
		</div>
	);
};

export default Login;
