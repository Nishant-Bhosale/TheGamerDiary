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
	const [totalMoney, setTotalMoney] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const dispatch = useDispatch();
	const history = useHistory();

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	useEffect(() => {
		axios
			.post(
				'/gamers',
				{ date: moment(new Date()).format('MM/DD/YYYY') },
				config,
			)
			.then((res) => {
				if (res.data.gamers !== undefined) {
					setGamers(res.data.gamers);
				}
				let money = 0;
				let time = 0;

				res.data.gamers.forEach((gamer) => {
					money += gamer.totalMoneyPaid;
					time += gamer.totalTime;
				});

				setTotalMoney(money);
				setTotalTime(time);
			})
			.catch((err) => {
				console.log(err);
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
						setText(`Gamers not found on ${date}`);
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
				return <Gamer key={gamer._id} gamer={gamer} />;
			})}
			<div id={styles.adminOptions}>
				<Button
					variant="contained"
					startIcon={<Logout />}
					className={styles.logoutBtn}
					onClick={handleLogout}
				>
					logout
				</Button>

			</div>

			<div className={styles.dayInfo}>
				<h3>Total Gamers Today: {gamers.length}</h3>
				<div>
					Total Money Earned: <strong>Rs.</strong>
					{totalMoney}
				</div>
				<div>Total Time Played: {totalTime} min</div>
			</div>
			<input type="date" id="dateInput" onChange={handleDate} />
			<Button onClick={getDayInfo} className={styles.infoBtn} variant="contained" color="primary">
				Get Info
			</Button>
			{anotherDateGamers.length > 0 ? (
				anotherDateGamers.map((gamer) => {
					return (
						<>
							<Gamer key={gamer._id} gamer={gamer} />
						</>
					);
				})
			) : (
				<h3 style={{ color: 'antiquewhite' }}>{text}</h3>
			)}
		</div>
	);
}
