import React from 'react';
import styles from './Gamer.module.css';

const Gamer = (props) => {
	const { gamer } = props;

	return (
		<div className={styles.gamerWrapper}>
			<span>Player Name: {gamer.name}</span>
			<span>Total Money Paid: &#8377;{gamer.totalMoneyPaid}</span>
			<span>Total Time Played: {gamer.totalTime} min</span>
		</div>
	);
};

export default Gamer;
