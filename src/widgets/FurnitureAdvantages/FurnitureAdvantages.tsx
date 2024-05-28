import advantage1 from '@/shared/icons/book.svg';
import advantage2 from '@/shared/icons/hammer.svg';
import advantage3 from '@/shared/icons/hand.svg';
import advantage5 from '@/shared/icons/settings_2.svg';
import advantage4 from '@/shared/icons/tumba.svg';
import {
	StaticImageData,
	StaticImport,
} from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './FurnitureAdvantages.module.scss';

interface IAdvantage {
	icon: StaticImport | StaticImageData;
	title: string | ReactNode;
	text?: string | ReactNode;
}

const advantages: IAdvantage[] = [
	{
		icon: advantage1,
		title: 'Реализация любого проекта',
		text: 'Эскизы дорабатываются с учетом пожеланий заказчика, либо разрабатываются с нуля',
	},
	{
		icon: advantage2,
		title: 'Широкий выбор материалов и фурнитуры',
	},
	{
		icon: advantage3,
		title: 'Разные стилевые решения',
		text: 'От классики до хай-тека и лофта',
	},
	{
		icon: advantage4,
		title: 'Любая дополнительная комплектация',
		text: 'Заказать мебель по индивидуальным размерам можно с подсветкой, дополнительными отсеками, ящиками и другой комплектацией',
	},
	{
		icon: advantage5,
		title: 'Инженерная сложность',
		text: 'Можем сделать нестандартные размеры, нетиповую геометрию – возможности нашей фирмы не ограничены',
	},
];

export const FurnitureAdvantages = () => {
	return (
		<div className={styles.advantages}>
			<div className={styles.container}>
				<h2 className={styles.title}>
					Преимущества производства мебели на заказ
				</h2>
				<div className={styles.items}>
					{advantages.map((advantage, index) => (
						<div
							className={`${styles.item} ${index === 3 ? styles.more : ''}`}
							key={index}
						>
							<Image
								src={advantage.icon}
								alt='Преимущество'
								className={styles.icon}
								draggable={false}
							/>
							<p className={styles.itemTitle}>{advantage.title}</p>
							{advantage.text && (
								<p className={styles.itemText}>{advantage.text}</p>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
