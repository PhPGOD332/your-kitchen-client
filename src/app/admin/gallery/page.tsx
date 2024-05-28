'use client';

import { isUserHaveRights } from '@/features/isUserHaveRights';
import MiniLoading from '@/shared/MiniLoading';
import { pagesLinks } from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deletePhoto, getPhotos } from '@/store/photo.slice';
import { checkAuth } from '@/store/user.slice';
import { UserRoles } from '@/types/UserRoles';
import AdminSidebar from '@/widgets/AdminSidebar/AdminSidebar';
import Link from 'next/link';
import { useEffect, type MouseEvent } from 'react';
import { FaCopy } from 'react-icons/fa';
import styles from '../Page.module.scss';

// Тексты
const texts = {
	buttonText: '+ Добавить фото',
	titleText: 'Галерея',
};

const GalleryPage = () => {
	const userStore = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();
	const photoStore = useAppSelector((store) => store.photos);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
			dispatch(getPhotos());
		}
	}, []);

	const deleteImage = (photoId: string) => {
		dispatch(deletePhoto(photoId));
	};

	const copyPath = (event: MouseEvent, photoName: string) => {
		let target = event.currentTarget;
		target.classList.add(styles.success);
		navigator.clipboard.writeText(photoName);

		setTimeout(() => {
			target.classList.remove(styles.success);
		}, 1000);
	};

	if (userStore.isLoading) {
		return (
			<div className={styles.page}>
				<div className={styles.container}>
					<MiniLoading className={styles.preloader} />
				</div>
			</div>
		);
	}

	if (!userStore.isLoading && !userStore.isAuth) {
		return (
			<div className={styles.page}>
				<div className={styles.container}>
					<p className={styles.authText}>{`Ошибка, авторизируйтесь`}</p>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.page}>
			{userStore.isAuth && <AdminSidebar store={userStore} />}
			<div className={styles.container}>
				<div className={styles.string}>
					<h2 className={styles.title}>
						{texts.titleText} ({photoStore.photos.length})
					</h2>
					{isUserHaveRights(userStore.user, UserRoles.Admin) && (
						<Link
							href={pagesLinks.adminGalleryNew}
							className={styles.addButton}
						>
							{texts.buttonText}
						</Link>
					)}
				</div>
				{photoStore.photos && photoStore.photos.length > 0 && (
					<div className={styles.photos}>
						{photoStore.photos.map((photo, i) => (
							<div className={styles.photoPreview} key={i}>
								<img
									src={photo.name}
									draggable={false}
									alt={`Фото ${i + 1}`}
									className={styles.previewPhoto}
								/>
								<button
									type='button'
									className={styles.deleteButton}
									onClick={() => deleteImage(photo._id)}
								>
									×
								</button>
								<button
									type='button'
									className={styles.copyButton}
									onClick={(event) => copyPath(event, photo.name)}
								>
									<FaCopy />
								</button>
								<p className={styles.photoTitle}>{photo.name}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default GalleryPage;
