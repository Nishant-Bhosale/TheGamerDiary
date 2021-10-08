import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <div id={styles.footerContainer}>
            <div id={styles.copyInfo}>
                <span>&copy; 2021 Logverse &#8482; All rights reserved.</span>
            </div>
            <div id={styles.socialHandles}>
                <ul id={styles.socialList}>
                    <li><a href="#" className={styles.socials} >INSTAGRAM</a></li>
                    <li><a href="#" className={styles.socials} >GITHUB</a></li>
                    <li><a href="#" className={styles.socials} >LINKEDIN</a></li>
                </ul>
            </div>
        </div>
    )
}
