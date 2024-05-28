import man from '@/data/images/smiling_man.png';
import Image from 'next/image';
import styles from './CustomerChoice.module.scss';

interface CustomerChoiceProps {
	title?: string;
}

export const CustomerChoice = ({
	title = 'Почему нас выбирают клиенты?',
}: CustomerChoiceProps) => {
	return (
		<div className={styles.choisePage}>
			<div className={styles.container}>
				<h3 className={styles.title}>{title}</h3>
				<div className={styles.string}>
					{/* Левая часть */}
					<div className={styles.texts}>
						<div className={styles.text}>
							<p className={styles.number}>1. </p>
							<p>
								Собственное <span>автоматизированное</span> производство
							</p>
						</div>
						<div className={styles.text}>
							<p className={styles.number}>2. </p>
							<p>
								<span>Бесплатная разработка</span> дизайн-проекта и расчет
								стоимости: на сайте, в мессенджерах, по звонку или при личной
								встрече с дизайнером
							</p>
						</div>
						<div className={styles.text}>
							<p className={styles.number}>3. </p>
							<p>
								<span>Доступные цены:</span> недорогую мебель вы сможете купить
								без наценок за счет исключения посредников
							</p>
						</div>
					</div>
					{/* Средняя часть */}
					<div className={styles.wrapper}>
						<div className={styles.ellipse}></div>
						<div className={styles.person}>
							<Image
								src={man}
								alt='Рабочий'
								className={styles.middleImage}
								draggable={false}
							/>
						</div>
					</div>
					{/* Правая часть */}
					<div className={styles.texts}>
						<div className={styles.text}>
							<p className={styles.number}>4. </p>
							<p>
								Гарантия сроком <span>24 месяца</span>
							</p>
						</div>
						<div className={styles.text}>
							<p className={styles.number}>5. </p>
							<p>
								<span>Богатый опыт</span> в реализации как простых, так и
								сложных проектов мебели
							</p>
						</div>
						<div className={styles.text}>
							<p className={styles.number}>6. </p>
							<p>
								Мебель представлена <span>в широком ассортименте</span>
							</p>
						</div>
						<div className={styles.text}>
							<p className={styles.number}>7. </p>
							<p>
								<span>Собственный штат специалистов:</span> замерщиков,
								дизайнеров, проектировщиков, сборщиков, экспертов-консультантов
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
