import React from 'react';
import styles from './Navbar.module.css';
import { NavLink, Link } from 'react-router-dom';


export default function Navbar() {

    return (
        <div id={styles.navbarContainer}>
            <div id={styles.navMeta}>
                <Link className={styles.homeLink} to="/">
                    <div id={styles.logoContainer}>
                        <span>Logverse</span>
                    </div>
                </Link>
            </div>

            <div id={styles.navListContainer}>
                <ul id={styles.navList}>
                    <li className={styles.navLi}><NavLink className={styles.navLink} activeClassName={styles.activeLink} to='/manage'>Manage</NavLink></li>
                </ul>
            </div>
        </div>
    )
}