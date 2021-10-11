import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import cyberPunk from '../../images/cyperpunk.jpg';
import assasinsCreed from '../../images/asc.jpg';
import nfs from '../../images/nfs.jpg';
import styles from './Banner.module.css';
const Banner = () => {
	return (
		<Carousel
			autoPlay
			infiniteLoop
			interval={2000}
			showStatus={false}
			useKeyboardArrows={true}
			dynamicHeight={false}
			showThumbs={false}
			showIndicators={true}
		>
			<div className={styles.carouselDiv}>
				<img loading="lazy" src={cyberPunk} alt="" />
			</div>
			<div className={styles.carouselDiv}>
				<img loading="lazy" src={assasinsCreed} alt="" />
			</div>
			<div className={styles.carouselDiv}>
				<img loading="lazy" src={nfs} alt="" />
			</div>
		</Carousel>
	);
};

export default Banner;
