import { IWorker } from '@/types/IWorker';
import Image from 'next/image';
import styles from './Worker.module.scss';

interface Props {
	worker: IWorker;
}

const Worker = ({ worker }: Props) => {
	return (
		<div
			className={styles.worker}
			itemScope
			itemType='https://schema.org/Person'
		>
			<Image
				src={worker.photo}
				alt={worker.firstName}
				className={styles.img}
				width={320}
				height={375}
				draggable={false}
			/>
			<div className={styles.info}>
				<p className={styles.name}>
					<span itemProp='givenName'>{worker.firstName}</span>
					<span> </span>
					<span itemProp='familyName'>{worker.lastName}</span>
				</p>
				<p className={styles.workerInfo} itemProp='jobTitle'>
					{worker.jobTitle} / Опыт работы: <span>{worker.experience}</span>
				</p>
			</div>
		</div>
	);
};

export default Worker;
