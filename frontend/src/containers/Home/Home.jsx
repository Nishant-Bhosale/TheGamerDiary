import React from 'react';
import styles from './Home.module.css';

import Devices from '../Devices/Devices';


export default function Home() {
    return (
        <div>
            <h1>This is the home page</h1>
            <Devices />
        </div>
    )
}
