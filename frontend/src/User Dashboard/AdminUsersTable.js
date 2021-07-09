import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AdminUsersTable.css';
Modal.setAppElement('#root');

const AdminUsersTable = ({ user }) => {
	const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
	const [isUserPostsOpen, setIsUserPostsOpen] = useState(false);
	const [posts, setPosts] = useState('');
	const [role, setRole] = useState(user.role);

	useEffect(() => {
		axios.get(`http://localhost:5000/posts/userid/${user._id}`).then((res) => {
			setPosts(res.data);
		});
	}, [user._id]);

	const handleRole = async (e) => {
		await axios
			.put(`http://localhost:5000/users/${user._id}`, {
				role: e.target.value,
			})
			.then((res) => {
				console.log(res.data);
				return res.data;
			})
			.catch((err) => console.log(err));
		window.location.reload();
	};

	return (
		<div className='admin-user-table-container'>
			<h2>
				{user.firstname} {user.lastname}
			</h2>
			<div>
				<small id='admin-dashboard-edit-role'>Edit Role</small>
				<select
					id='admin-dashboard-edit-role'
					value={role}
					onChange={(e) => {
						setRole(e.target.value);
						console.log(e.target.value);
						console.log(role);
						handleRole(e);
					}}>
					<option value='admin'>Admin</option>
					<option value='user'>User</option>
				</select>
				<button
					type='submit'
					className='admin-user-table-user-btn'
					onClick={() => setIsUserDetailsOpen(true)}>
					User Details
				</button>

				<Modal
					isOpen={isUserDetailsOpen}
					onRequestClose={() => setIsUserDetailsOpen(false)}
					style={{
						overlay: {
							backgroundColor: '#f5f5f5',
						},
						content: {
							width: '60%',
							height: '75%',
							margin: 'auto',
							padding: '30px 50px',
							lineHeight: '1.6',
							textAlign: 'justify',
						},
					}}>
					<h1 className='admin-user-table-user-modal-title'>
						{user.firstname} {user.lastname}
					</h1>
					<p>
						<strong>Username:</strong> {user.username}
					</p>
					<br />
					<p>
						<strong>Email:</strong> {user.email}
					</p>
					<br />
					<p>
						<strong>Role:</strong> {user.role}
					</p>
				</Modal>

				<button
					type='submit'
					className='admin-user-table-user-btn'
					onClick={() => setIsUserPostsOpen(true)}>
					User Posts
				</button>

				<Modal
					isOpen={isUserPostsOpen}
					onRequestClose={() => setIsUserPostsOpen(false)}
					style={{
						overlay: {
							backgroundColor: '#f5f5f5',
						},
						content: {
							width: '60%',
							height: '75%',
							margin: 'auto',
							padding: '30px 50px',
							lineHeight: '1.6',
							textAlign: 'justify',
						},
					}}>
					{posts.length !== 0 &&
						posts.map((post, index) => {
							return (
								<div key={index}>
									<h1 className='admin-user-table-user-modal-post-title'>
										{post.title}
									</h1>
									<p>{post.body}</p>
									<div className='admin-user-table-user-modal-post-img-container'>
										{post.imageUrls.length > 0 ? (
											<img
												src={post.imageUrls}
												alt='pic'
												className='admin-user-table-user-modal-post-img'
											/>
										) : null}
									</div>
									<br />
								</div>
							);
						})}
				</Modal>

				<button type='submit' className='admin-user-table-user-btn'>
					Delete
				</button>
			</div>
		</div>
	);
};

export default AdminUsersTable;
