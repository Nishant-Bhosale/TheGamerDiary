import React from 'react';
import styles from './Gamer.module.css';

const Gamer = (props) => {
	const { gamer } = props;

	return (
		<div className={styles.gamerWrapper}>
			<h3>Player Name: {gamer.name}</h3>
			<div>
				Total Money Paid: <strong>Rs.</strong>
				{gamer.totalMoneyPaid}
			</div>
			<div>Total Time Played: {gamer.totalTime} min</div>
		</div>
	);
};

export default Gamer;
