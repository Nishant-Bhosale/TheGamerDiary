import React, { useState } from 'react';
import styles from './Devices.module.css';

import { useSelector } from 'react-redux';

import { CircularProgress } from '@mui/material';
//Importing single device component
import ActiveDevice from './Device/ActiveDevice';
import Device from './Device/Device';

export default function Devices() {
	const devicesData = useSelector((state) => state.Pcs);
	const devices = devicesData.data;

	let userDevice = null;

	const activeDevices = devices.filter((device) => device.isOccupied === true);
	const freeDevices = devices.filter(device => device.isOccupied === false);

	activeDevices.map((device, index) => {
		if (device.currentGamer._id === localStorage.getItem('gamerId')) {
			userDevice = activeDevices[index];
		}
	});
	if (!devicesData.hasFetched) {
		return (
			<div id={styles.spinnerContainer}>
				<CircularProgress />
			</div>
		)
	}
	else {
		if (userDevice) {
			return <ActiveDevice userDevice={userDevice} />;
		} else {
			return (
				<div id={styles.devicesContainer}>
					{freeDevices.map((device, index) => {
						return <Device key={index} device={device} />;
					})}
				</div>
			);
		}
	}
}
