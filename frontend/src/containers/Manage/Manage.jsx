import React, { useState, useEffect } from 'react';
import styles from './Manage.module.css';
import { useHistory } from 'react-router';
import Gamer from '../../components/Gamer/Gamer';
import axios from 'axios';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { adminLogout } from '../Admin/adminSlice';

export default function Manage() {
	const [gamers, setGamers] = useState([]);
	const [anotherDateGamers, setAnotherDateGamers] = useState([]);
	const [date, setDate] = useState(null);
	const [text, setText] = useState('');

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		axios
			.post(
				'/gamers',
				{ date: moment(new Date()).format('MM/DD/YYYY') },
				config,
			)
			.then((res) => {
				setGamers(res.data.gamers);
			});
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('adminJwtToken');
		dispatch(adminLogout());
		history.push('/');
	};

	const handleDate = (e) => {
		if (e.target.value !== '' || e.target.value !== null) {
			setDate(moment(e.target.value).format('MM/DD/YYYY'));
		}
	};

	const getDayInfo = (e) => {
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		if (date !== null) {
			axios
				.post('/gamers', { date }, config)
				.then((res) => {
					if (res.data.gamers !== undefined) {
						setAnotherDateGamers(res.data.gamers);
					} else {
						setAnotherDateGamers([]);
						setText(`Players not found on ${date}`);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setText('Please enter a date');
		}
	};

	return (
		<div className={styles.adminWrapper}>
			<h1>Today's Gamers</h1>
			{gamers.map((gamer) => {
				return <Gamer id={gamer._id} gamer={gamer} />;
			})}
			<Button
				variant="contained"
				startIcon={<Logout />}
				className={styles.logoutBtn}
				onClick={handleLogout}
			>
				logout
			</Button>
			<input type="date" id="dateInput" onChange={handleDate} />
			<button onClick={getDayInfo} className={styles.infoBtn}>
				Get Info
			</button>
			{anotherDateGamers.length > 0 ? (
				anotherDateGamers.map((gamer) => {
					return <Gamer id={gamer._id} gamer={gamer} />;
				})
			) : (
				<h3 style={{ color: 'antiquewhite' }}>{text}</h3>
			)}
		</div>
	);
}
