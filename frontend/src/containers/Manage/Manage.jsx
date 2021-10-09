import React, { useState, useEffect } from 'react';
import './Manage.module.css';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { adminLogout } from '../Admin/adminSlice';

export default function Manage() {
	const dispatch = useDispatch();
	const history = useHistory();

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	useEffect(() => {
		axios.post('/gamers', { date: '10/09/2021' }, config).then((res) => {
			console.log(res.data);
		});
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('adminJwtToken');
		dispatch(adminLogout());
		history.push('/');
	};

	return (
		<div>
			<h1>This is the managers page</h1>
			<Button variant="contained" startIcon={<Logout />} onClick={handleLogout}>
				logout
			</Button>
		</div>
	);
}
