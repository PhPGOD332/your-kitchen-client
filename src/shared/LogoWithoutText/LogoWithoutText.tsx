import logoWithoutText from '@/data/images/logo.webp';
import Image from 'next/image';
import Link from 'next/link';
import { pagesLinks } from '../constants';
import styles from './LogoWithoutText.module.scss';

const Logo = () => {
	return (
		<Link href={pagesLinks.main} className={styles.logo}>
			<Image
				src={logoWithoutText}
				alt='Твоя кухня'
				draggable={false}
				priority
				className={styles.logoImg}
			/>
		</Link>
	);
};

export default Logo;
