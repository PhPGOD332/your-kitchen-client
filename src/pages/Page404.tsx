import image404 from '@/data/images/404.svg';
import kitchen404img from '@/data/images/kitchen404.svg';
import { pagesLinks } from '@/shared/constants';
import { OrangeButton } from '@/shared/ui';
import Image from 'next/image';
import styles from './ErrorPage.module.scss';

interface Props {
	title?: string;
	link?: string;
	buttonText?: string;
}

const Page404 = ({ link, title, buttonText }: Props) => (
	<div className={styles.page}>
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.column}>
					<h2 className={styles.title}>
						{title ? title : 'Извините, страницы не существует'}
					</h2>
					<Image
						src={image404}
						alt='Ошибка'
						className={styles.errorImg}
						draggable={false}
					/>
					<div className={styles.buttonWrapper}>
						<OrangeButton
							href={link ? link : pagesLinks.main}
							className={styles.button}
						>
							{buttonText ? buttonText : 'Вернуться на главную'}
						</OrangeButton>
					</div>
				</div>
				<div className={styles.column}>
					<Image
						src={kitchen404img}
						alt='Кухня'
						className={styles.kitchenImg}
						draggable={false}
						priority
					/>
				</div>
			</div>
		</div>
	</div>
);

export default Page404;
