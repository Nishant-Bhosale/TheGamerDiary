import React, { useState } from 'react';
import styles from './Devices.module.css';

import { useSelector } from 'react-redux';
//Importing single device component
import ActiveDevice from './Device/ActiveDevice';
import Device from './Device/Device';

export default function Devices() {
    const devices = useSelector(state => state.Pcs.data);
    let userDevice = null;

    const activeDevices = devices.filter(device => device.isOccupied === true);
    activeDevices.map((device, index) => {
        if (device.currentGamer._id == localStorage.getItem('gamerId')) {
            userDevice = activeDevices[index];
        }
    })
    if (userDevice) {
        return (
            <ActiveDevice userDevice={userDevice} />
        )
    } else {
        return (
            <div id={styles.devicesContainer}>
                {
                    devices.map((device, index) => {
                        return <Device key={index} device={device} />
                    })
                }
            </div>
        )
    }
}
