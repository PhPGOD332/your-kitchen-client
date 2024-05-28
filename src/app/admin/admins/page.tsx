'use client';

import { isUserHaveRights } from '@/features/isUserHaveRights';
import { Icons } from '@/shared/IconsComponents/Icons';
import MiniLoading from '@/shared/MiniLoading';
import { pagesLinks } from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { checkAuth, deleteUser, getUsers } from '@/store/user.slice';
import { IError } from '@/types/IError';
import { IUser } from '@/types/IUser';
import { UserRoles } from '@/types/UserRoles';
import AdminSidebar from '@/widgets/AdminSidebar/AdminSidebar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../Page.module.scss';

// Тексты
const texts = {
	title: 'Пользователи админ панели',
	buttonText: '+ Добавить',
};

const isAdmin = (user: IUser) =>
	user.role.value === UserRoles.Admin ? styles.isAdmin : styles.isEditor;

const AdminsPage = () => {
	const userStore = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();
	const [error, setError] = useState<IError>({ isError: false, value: '' });

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
		}
	}, []);

	useEffect(() => {
		if (isUserHaveRights(userStore.user, UserRoles.Admin)) {
			setError({
				isError: false,
				value: '',
			});
			dispatch(getUsers(userStore.user));
		} else {
			setError({
				isError: true,
				value: 'У вас нет прав на просмотр этой страницы',
			});
		}
	}, [userStore.user]);

	const removeAdmin = (id: string) => {
		if (id === userStore.user._id) {
			setError({
				isError: true,
				value: 'Вы не можете удалить свой аккаунт',
			});
			return;
		}

		if (
			id !== userStore.user._id &&
			userStore.user.role.value === UserRoles.Admin
		) {
			dispatch(deleteUser(id));
		}
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

	if (
		!userStore.isLoading &&
		!userStore.isAuth &&
		userStore.users.length === 0
	) {
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
				{isUserHaveRights(userStore.user, UserRoles.Admin) && (
					<>
						<h2 className={styles.title}>
							{texts.title} ({userStore.users.length})
						</h2>
						<Link href={pagesLinks.adminAdminsNew} className={styles.addButton}>
							{texts.buttonText}
						</Link>
					</>
				)}
				{error.isError && <p className={styles.error}>{error.value}</p>}
				<div className={styles.admins}>
					{userStore.users &&
						userStore.users.length !== 0 &&
						userStore.users.map((user) => (
							<div className={styles.adminWrapper} key={user._id}>
								<Link
									href={`/admin/admins/${user._id}`}
									className={styles.admin}
								>
									<p className={`${styles.adminRole} ${isAdmin(user)}`}>
										{user.role.label}
									</p>
									<p className={styles.adminText}>{user.email}</p>
								</Link>
								{user._id !== userStore.user._id && (
									<button
										type='button'
										className={styles.removeAdminButton}
										onClick={() => removeAdmin(user._id)}
									>
										<Icons.remove className={styles.removeIcon} />
									</button>
								)}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default AdminsPage;
