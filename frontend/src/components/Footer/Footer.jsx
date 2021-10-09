import React from 'react';
import styles from './Footer.module.css';
import { Instagram, GitHub, LinkedIn } from '@mui/icons-material';

export default function Footer() {
    const mediaQuery = window.matchMedia('(max-width: 400px)');
    return (
        <div id={styles.footerContainer}>
            <div id={styles.copyInfo}>
                <span>&copy; 2021 Gamer Diary &#8482; {!mediaQuery.matches ? "All rights reserved." : ""}</span>
            </div>
            <div id={styles.socialHandles}>
                <ul id={styles.socialList}>
                    <li><a href="#" className={styles.socials} id={styles.ig} ><Instagram fontSize="large" /></a></li>
                    <li><a href="https://github.com/Nishant-Bhosale/HackSprint_PS16_BinaryBeasts" target="_blank" className={styles.socials} id={styles.git}><GitHub fontSize="large" /></a></li>
                    <li><a href="#" className={styles.socials} id={styles.ln}><LinkedIn fontSize="large" /></a></li>
                </ul>
            </div>
        </div>
    )
}
