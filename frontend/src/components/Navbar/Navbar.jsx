import React from 'react';
import styles from './Navbar.module.css';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<div id={styles.navbarContainer}>
			<div id={styles.navMeta}>
				<Link className={styles.homeLink} to="/">
					<div id={styles.logoContainer}>
						<span>GamerDiary</span>
					</div>
				</Link>
			</div>
			<div id={styles.manage}>
				<NavLink
					className={styles.navLink}
					activeClassName={styles.activeLink}
					to="/manage"
				>
					Manage
				</NavLink>
			</div>
		</div>
	);
}
