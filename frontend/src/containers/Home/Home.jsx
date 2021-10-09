import React from 'react';
import styles from './Home.module.css';

import Devices from '../Devices/Devices';


export default function Home() {
    return (
        <div>
            <span id={styles.homeDashboardHeading}>Dashboard</span>
            <Devices />
        </div>
    )
}
