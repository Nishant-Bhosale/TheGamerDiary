import React, { useState, useEffect } from 'react';
import styles from './Manage.module.css';
import { useHistory } from 'react-router';
import Gamer from '../../components/Gamer/Gamer';
import axios from 'axios';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Button, TextField, CircularProgress } from '@mui/material';
import { CloudDownload, Remove } from '@mui/icons-material';
//Handling dynamic date
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Logout } from '@mui/icons-material';
import { adminLogout } from '../Admin/adminSlice';
//importing Alert component
import AlertUtil from '../../utils/AlertUtil';

export default function Manage() {
	const [gamers, setGamers] = useState([]);
	const [specificDayGamers, setspecificDayGamers] = useState([]);


	const [totalMoney, setTotalMoney] = useState(0);
	const [totalTime, setTotalTime] = useState(0);

	const [specificTotalMoney, setSpecifcTotalMoney] = useState(0);
	const [specificTotalTime, setSpecificTotalTime] = useState(0);

	const dispatch = useDispatch();
	const history = useHistory();

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const [response, setResponse] = useState({})
	//For handling fetch today error
	const [open, setOpen] = useState(false);
	//For handling fetch specific date error
	const [specifcFetchOpen, setSpecificFetchOpen] = useState(false);

	//Handling fetch loading
	const [loading, setLoading] = useState(false);
	//Handling dynamic fetch loading
	const [specificDateLoading, setSpecificDateLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
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

				res.data.gamers.map((gamer) => {
					money += gamer.totalMoneyPaid;
					time += gamer.totalTime;
				});
				setTotalMoney(money);
				setTotalTime(time);
				setLoading(false);
			})
			.catch(() => {
				setResponse(prev => ({
					...prev,
					message: 'Failed to fetch users',
					operation: 'warning'
				}))
				setOpen(true);
				setLoading(false);
			});
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('adminJwtToken');
		dispatch(adminLogout());
		history.push('/');
	};

	const [date, setDate] = useState(null);
	const handleDate = (value) => {
		if (value !== '' || value !== null) {
			setDate(moment(value).format('MM/DD/YYYY'));
		}
	};

	const getDayInfo = (e) => {
		e.preventDefault();
		if (date !== null) {
			setSpecificDateLoading(true);
			axios
				.post('/gamers', { date }, config)
				.then((response) => {
					if (response.data.gamers !== undefined) {
						setspecificDayGamers(response.data.gamers);
						setSpecificDateLoading(false);
						let money = 0;
						let time = 0;

						response.data.gamers.map((gamer) => {
							money += gamer.totalMoneyPaid;
							time += gamer.totalTime;
						});

						setSpecifcTotalMoney(money);
						setSpecificTotalTime(time);

					} else {
						setspecificDayGamers([]);
						setResponse(prev => ({
							...prev,
							message: response.data.message,
							operation: 'info'
						}))
						setSpecificFetchOpen(true);
						setSpecificDateLoading(false);
					}
				})
				.catch(() => {
					setResponse(prev => ({
						...prev,
						message: 'Internal server error',
						operation: 'warning'
					}))
					setSpecificFetchOpen(true);
					setSpecificDateLoading(false);
				});
		} else {
			setResponse(prev => ({
				...prev,
				message: 'Please enter a valid date',
				operation: 'info'
			}))
			setSpecificFetchOpen(true);
		}
	};

	const handleRemove = () => {
		setspecificDayGamers([]);
		setSpecifcTotalMoney(0);
		setSpecificTotalTime(0);
		setSpecificFetchOpen(false)
		setDate(null);
		setResponse({})
	}

	const changeOpen = () => setOpen(false);
	const changeSpecifcFetchOpen = () => setSpecificFetchOpen(false);

	return (
		<div className={styles.adminPageContainer}>
			<div id={styles.adminMetaContainer}>
				<span id={styles.managerHeading}>Todays Realtime updates</span>
				<Button
					variant="contained"
					startIcon={<Logout />}
					className={styles.logoutBtn}
					onClick={handleLogout}
				>
					logout
				</Button>
			</div>
			<AlertUtil className={styles.adminAlert} message={response.message} type={response.operation} open={open} changeOpen={changeOpen} />
			{loading && <div className={styles.adminLoadingContainer}><CircularProgress /></div>}
			{(gamers.length !== 0 && !loading) && <div className={styles.dayInfo}>
				<div className={styles.infoDiv}>
					<span>Total Active users</span>
					<span>{gamers.length}</span>
				</div >
				<div className={styles.infoDiv}>
					<span>Total Revenue</span>
					<span>&#8377;{totalMoney}</span>
				</div>
				<div className={styles.infoDiv}>
					<span>Total Time spent</span>
					<span>{totalTime}</span>
				</div>
			</div>}

			{(gamers.length != 0 && !loading) && <div id={styles.activeUsersContainer}>
				{gamers.map((gamer) => {
					return <Gamer key={gamer._id} gamer={gamer} />;
				})}
			</div>}
			{gamers.length == 0 && <span id={styles.fetchHeading}>No record found for today</span>}
			<span id={styles.fetchHeading}>Fetch Users from a specific date</span>
			<div className={styles.dateInputWrapper}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						label="Select Date"
						value={date}
						onChange={(newValue) => {
							handleDate(newValue);
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
				<Button variant="outlined" color="primary" startIcon={<CloudDownload />} onClick={getDayInfo}>
					Get Report
				</Button>
				<Button variant="outlined" color="error" startIcon={<Remove />} onClick={handleRemove}>
					Hide Report
				</Button>
			</div>
			{specificDateLoading && <div className={styles.adminLoadingContainer}><CircularProgress /></div>}
			{
				(specificDayGamers.length > 0 && !specificDateLoading) ? (
					specificDayGamers.map((gamer) => {
						return <Gamer key={gamer._id} gamer={gamer} />
					})
				) : (
					<div className={styles.adminAlertContainer}>
						<AlertUtil message={response.message} type={response.operation} open={specifcFetchOpen} changeOpen={changeSpecifcFetchOpen} />
					</div>
				)
			}
			{(!specificDateLoading && specificDayGamers.length !== 0) && <div className={styles.dayInfo}>
				<div className={styles.infoDiv}>
					<span>Total users</span>
					<span>{specificDayGamers.length}</span>
				</div >
				<div className={styles.infoDiv}>
					<span>Total Revenue</span>
					<span>&#8377;{specificTotalMoney}</span>
				</div>
				<div className={styles.infoDiv}>
					<span>Total Time spent</span>
					<span>{specificTotalTime}</span>
				</div>
			</div>}
		</div >
	);
}
