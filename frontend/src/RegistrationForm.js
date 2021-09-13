import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { Link } from 'react-router-dom';

const RegistrationForm = ({ welcomeMessage, pageLinks, signOutMessage }) => {
	const [username, setUsername] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordNotMatch, setPasswordNotMatch] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [usernameExists, setUsernameExists] = useState(false);
	const [registered, setRegistered] = useState(false);
	const [blankUsername, setBlankUsername] = useState(false);
	const [passwordLength, setPasswordLength] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		welcomeMessage(false);
		pageLinks(false);
		signOutMessage(false);
	}, [welcomeMessage, pageLinks, signOutMessage]);

	const register = (e) => {
		setIsLoading(true);
		setBlankUsername(false);
		setEmailExists(false);
		setPasswordNotMatch(false);
		setPasswordLength(false);
		if (username.trim() !== '') {
			if (password.length > 5) {
				if (password === confirmPassword) {
					axios
						.post('http://localhost:5000/users/signup', {
							username,
							firstname,
							lastname,
							email,
							password,
						})
						.then(async (res) => {
							if (!res.data.status && res.data.message === 'email') {
								setEmailExists(true);
								setUsernameExists(false);
								setPassword('');
								setConfirmPassword('');
								setPasswordNotMatch(false);
								setIsLoading(false);
							} else if (
								!res.data.status &&
								res.data.message === 'username'
							) {
								setEmailExists(false);
								setUsernameExists(true);
								setPassword('');
								setConfirmPassword('');
								setPasswordNotMatch(false);
								setIsLoading(false);
							} else {
								setRegistered(true);
								const response = await axios
									.post('http://localhost:5000/users/signin', {
										username,
										email,
										password,
									})
									.then((res) => {
										setIsLoading(false);
										return res.data;
									})
									.catch((err) => console.log(err));
								localStorage.setItem(
									'token',
									JSON.stringify(response.token)
								);
								localStorage.setItem(
									'userInfo',
									JSON.stringify(response)
								);
							}
						});
				} else {
					setIsLoading(false);
					setPasswordNotMatch(true);
					setPasswordLength(false);
					setBlankUsername(false);
					setEmailExists(false);
					setUsernameExists(false);
				}
			} else {
				setIsLoading(false);
				setPasswordLength(true);
				setBlankUsername(false);
				setEmailExists(false);
				setPasswordNotMatch(false);
				setUsernameExists(false);
			}
		} else {
			setIsLoading(false);
			setBlankUsername(true);
			setEmailExists(false);
			setPasswordNotMatch(false);
			setPasswordLength(false);
			setUsernameExists(false);
		}
		e.preventDefault();
	};

	return (
		<>
			{!registered ? (
				<div className='container'>
					<h1>Registration Form</h1>
					<form className='sign-up-form' onSubmit={register}>
						<label htmlFor='username'>Username</label>
						<input
							id='username'
							placeholder='Enter a username'
							value={username}
							onChange={(e) => {
								setUsername(e.target.value.trim());
								setBlankUsername(false);
								setPasswordNotMatch(false);
								setPasswordLength(false);
								setEmailExists(false);
							}}
							required
						/>
						{blankUsername ? (
							<small className='register-form-validation-warning'>
								This field can not be blank
							</small>
						) : null}

						{usernameExists ? (
							<small className='register-form-validation-warning'>
								This username exists. Enter another one!
							</small>
						) : null}

						<label htmlFor='firstname'>First Name</label>
						<input
							id='firstname'
							placeholder='Enter your first name'
							value={firstname}
							onChange={(e) => {
								setFirstname(e.target.value.trim());
								setBlankUsername(false);
								setPasswordNotMatch(false);
								setPasswordLength(false);
								setEmailExists(false);
								setUsernameExists(false);
							}}
							required
						/>

						<label htmlFor='lastname'>Last Name</label>
						<input
							id='lastname'
							placeholder='Enter your last name'
							value={lastname}
							onChange={(e) => {
								setLastname(e.target.value.trim());
								setBlankUsername(false);
								setPasswordNotMatch(false);
								setPasswordLength(false);
								setEmailExists(false);
								setUsernameExists(false);
							}}
							required
						/>

						<label htmlFor='email'>Email</label>
						<input
							id='email'
							type='email'
							placeholder='Enter your email'
							value={email}
							onChange={(e) => {
								setEmail(e.target.value.trim());
								setEmailExists(false);
								setPasswordNotMatch(false);
								setPasswordLength(false);
								setBlankUsername(false);
								setUsernameExists(false);
							}}
							required
						/>
						{emailExists ? (
							<small className='register-form-validation-warning'>
								This email address exists. Enter another one!
							</small>
						) : null}

						<label htmlFor='password'>Password</label>
						<input
							id='password'
							type='password'
							placeholder='Enter your password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value.trim());
								setPasswordLength(false);
								setEmailExists(false);
								setPasswordNotMatch(false);
								setBlankUsername(false);
								setUsernameExists(false);
							}}
							required
						/>
						{passwordLength ? (
							<small className='register-form-validation-warning'>
								Enter at least 6 characters.
							</small>
						) : null}
						<label htmlFor='confirm-password'>Confirm Password</label>
						<input
							id='confirm-password'
							type='password'
							placeholder='Confirm your password'
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value.trim());
								setPasswordNotMatch(false);
								setPasswordLength(false);
								setEmailExists(false);
								setBlankUsername(false);
								setUsernameExists(false);
							}}
							required
						/>
						{passwordNotMatch ? (
							<small className='register-form-validation-warning'>
								Password does not match
							</small>
						) : null}

						<button type='submit' className='register-btn'>
							Register
						</button>
						{isLoading ? (
							<small className='register-form-loading-msg'>
								Checking your credentials ..................
							</small>
						) : null}
						{!isLoading ? (
							<p>
								If you have already registered, click{' '}
								<a href='/login' className='log-in-link'>
									<span>Log In</span>
								</a>
							</p>
						) : null}
					</form>
				</div>
			) : null}
			{registered ? (
				<div className='registration-msg'>
					<h3>You have registered successfully</h3> <br />
					<h4>
						<Link to='/login' className='log-in-link'>
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
