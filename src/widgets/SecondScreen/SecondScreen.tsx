import kitchen1 from '@/data/images/kitchen1.webp';
import kitchen2 from '@/data/images/kitchen2.webp';
import woman1 from '@/data/images/woman1.webp';
import Image from 'next/image';
import styles from './SecondScreen.module.scss';

const SecondScreen = () => {
	return (
		<div className={styles.secondScreen}>
			<h2 className={styles.title}>Если вы еще не заказали кухню</h2>
			<div className={styles.container}>
				<div className={styles.ellipse}></div>
				<p className={styles.first}>01</p>
				<p className={styles.second}>02</p>
				{/* Left side */}
				<div className={styles.card}>
					<p className={styles.text1}>Скорее всего вы:</p>
					<div className={styles.cardWrapper}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 228 280'
							className={styles.cardBg}
						>
							<path
								d='M228 30C228 24.4772 223.514 20.0329 218.008 19.5977C182.246 16.7706 150.79 6.7499e-06 114 9.9662e-06C77.1366 1.31889e-05 45.9053 16.7849 9.9926 19.6013C4.48667 20.0331 2.13986e-06 24.4772 2.62268e-06 30L2.18678e-05 250.138C2.22852e-05 254.913 2.81745 259.211 7.29789 260.86C23.4776 266.816 64.8437 280 114 280C163.156 280 204.522 266.816 220.702 260.86C225.183 259.211 228 254.913 228 250.138L228 30Z'
								fill='white'
							/>
						</svg>
						<p className={styles.cardAsk}>?</p>
						<Image
							src={kitchen1}
							alt='Kitchen 1'
							className={styles.cardImg}
							draggable={false}
						/>
						<p className={styles.cardText}>
							Понимаете, какую хотите кухню, <span>но без деталей</span>
						</p>
					</div>
				</div>
				{/* Center */}
				<Image
					src={woman1}
					alt='Woman'
					className={styles.woman}
					draggable={false}
				/>
				{/* Right side */}
				<div className={styles.card2}>
					<p className={styles.text2}>Либо:</p>
					<div className={styles.cardWrapper}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 228 280'
							className={styles.cardBg}
						>
							<path
								d='M228 30C228 24.4772 223.514 20.0329 218.008 19.5977C182.246 16.7706 150.79 6.7499e-06 114 9.9662e-06C77.1366 1.31889e-05 45.9053 16.7849 9.9926 19.6013C4.48667 20.0331 2.13986e-06 24.4772 2.62268e-06 30L2.18678e-05 250.138C2.22852e-05 254.913 2.81745 259.211 7.29789 260.86C23.4776 266.816 64.8437 280 114 280C163.156 280 204.522 266.816 220.702 260.86C225.183 259.211 228 254.913 228 250.138L228 30Z'
								fill='white'
							/>
						</svg>
						<p className={styles.cardAsk}>?</p>
						<Image
							src={kitchen2}
							alt='Kitchen 1'
							className={styles.card2Img}
							draggable={false}
						/>
						<p className={styles.cardText}>
							Ничего не подходит, <span>не знаете, какую кухню хотите</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SecondScreen;
