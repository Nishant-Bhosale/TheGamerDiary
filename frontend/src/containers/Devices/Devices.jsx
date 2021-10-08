import React from 'react';
import styles from './Devices.module.css';

import { useSelector } from 'react-redux';
//Importing single device component
import Device from './Device/Device';

export default function Devices() {
    const devices = useSelector(state => state.Pcs.data);
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
