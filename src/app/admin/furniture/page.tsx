'use client';

import { isUserHaveRights } from '@/features/isUserHaveRights';
import { Icons } from '@/shared/IconsComponents/Icons';
import MiniLoading from '@/shared/MiniLoading';
import { pagesLinks } from '@/shared/constants';
import { deleteFurniture, getAllFurniture } from '@/store/furniture.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { checkAuth } from '@/store/user.slice';
import { UserRoles } from '@/types/UserRoles';
import AdminSidebar from '@/widgets/AdminSidebar/AdminSidebar';
import FurnitureItem from '@/widgets/FurnitureItem/FurnitureItem';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../Page.module.scss';

// Тексты
const texts = {
	buttonText: '+ Добавить мебель',
	titleText: 'Мебель',
	onMainPageText: 'На главной',
};

const FurniturePage = () => {
	const userStore = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();
	const furnitureStore = useAppSelector((store) => store.furniture);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
			dispatch(getAllFurniture());
		}
	}, []);

	const removeFurniture = async (id: string) => {
		if (
			localStorage.getItem('token') &&
			isUserHaveRights(userStore.user, UserRoles.Admin)
		) {
			dispatch(deleteFurniture(id));
		}
	};

	if (furnitureStore.isLoading) {
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
						{texts.titleText} ({furnitureStore.allFurniture.length})
					</h2>
					{isUserHaveRights(userStore.user, UserRoles.Admin) && (
						<Link
							href={pagesLinks.adminFurnitureNew}
							className={styles.addButton}
						>
							{texts.buttonText}
						</Link>
					)}
				</div>
				<div className={styles.kitchens}>
					{furnitureStore.allFurniture &&
						furnitureStore.allFurniture
							.slice(0)
							.reverse()
							.map((furniture, index) => (
								<div className={styles.kitchenLink} key={index}>
									{isUserHaveRights(userStore.user, UserRoles.Admin) && (
										<button
											type='button'
											className={styles.removeButton}
											onClick={() => removeFurniture(furniture.slug)}
										>
											<Icons.remove className={styles.removeIcon} />
										</button>
									)}

									<Link href={`/admin/furniture/${furniture.slug}`}>
										<FurnitureItem furniture={furniture} />
									</Link>
								</div>
							))}
				</div>
			</div>
		</div>
	);
};

export default FurniturePage;
