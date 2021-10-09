import React, { useState } from 'react';
import styles from './Admin.module.css';
import axios from 'axios';
import { useHistory } from 'react-router';

//Redux specifc
import { useDispatch } from 'react-redux';
import { getAdminStatus } from './adminSlice';
//MUI specific
import { Button } from '@mui/material';
import { Login as LogIcon } from '@mui/icons-material';

//Info Alert
import AlertUtil from '../../utils/AlertUtil';

export default function Admin() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [formInput, setFormInput] = useState({});

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setFormInput((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const [response, setResponse] = useState({});
	const [open, setOpen] = useState(false);

	const handleResponse = (data) => {
		setResponse((prev) => ({
			...prev,
			message: data.message,
			auth: data.authentication,
		}));
		setOpen(true);
		if (data.authentication) {
			localStorage.setItem('adminJwtToken', data.jwtToken);
			dispatch(getAdminStatus(localStorage.getItem('adminJwtToken')));
			setTimeout(() => {
				history.push('/manage');
			}, 2000);
		}
	};
	const handleError = (err) => {
		if (err.status === 404) {
			setResponse((prev) => ({
				...prev,
				message: "Admin doesn't exist",
				auth: false,
			}));
		} else if (err.status === 500) {
			setResponse((prev) => ({
				...prev,
				message: 'Internal server error',
				auth: false,
			}));
		}
		setOpen(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const checkAuth = async () => {
			try {
				const response = await axios({
					method: 'POST',
					url: '/api/admin',
					data: formInput,
				});
				handleResponse(response.data);
			} catch (err) {
				handleError(err.response);
			}
		};
		checkAuth();
		setFormInput({});
	};
	const changeOpen = () => setOpen(false);
	return (
		<div id={styles.formContainer}>
			<form action="#" id={styles.loginForm} onSubmit={handleSubmit}>
				<AlertUtil
					message={response.message}
					type={response.auth ? 'success' : 'warning'}
					open={open}
					changeOpen={changeOpen}
				/>
				<span className={styles.formHeading}>Login to manage</span>
				<input
					className={styles.loginInput}
					type="email"
					name="email"
					value={formInput.email || ''}
					onChange={handleChange}
					placeholder="Email"
					required
				/>
				<input
					className={styles.loginInput}
					type="password"
					name="password"
					value={formInput.password || ''}
					onChange={handleChange}
					placeholder="Password"
					required
				/>
				<Button variant="contained" startIcon={<LogIcon />} type="submit">
					Login
				</Button>
			</form>
		</div>
	);
}
