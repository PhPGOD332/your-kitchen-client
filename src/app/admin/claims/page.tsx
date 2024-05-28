'use client';

import { isUserHaveRights } from '@/features/isUserHaveRights';
import MiniLoading from '@/shared/MiniLoading';
import { getClaims } from '@/store/claims.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { checkAuth } from '@/store/user.slice';
import { IError } from '@/types/IError';
import { UserRoles } from '@/types/UserRoles';
import AdminClaim from '@/widgets/AdminClaim/AdminClaim';
import AdminSidebar from '@/widgets/AdminSidebar/AdminSidebar';
import { useEffect, useState } from 'react';
import styles from './Claims.module.scss';

// Тексты
const texts = {
	title: 'Заявки',
};

const ClaimsPage = () => {
	const claimsStore = useAppSelector((store) => store.claims);
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
			dispatch(getClaims());
		} else {
			setError({
				isError: true,
				value: 'У вас нет прав на просмотр этой страницы',
			});
		}
	}, [userStore.user]);

	if (claimsStore.isLoading) {
		return (
			<div className={styles.adminPage}>
				<div className={styles.container}>
					<MiniLoading className={styles.preloader} />
				</div>
			</div>
		);
	}

	if (
		!userStore.isLoading &&
		!userStore.isAuth &&
		claimsStore.claims.length === 0
	) {
		return (
			<div className={styles.claimsPage}>
				<div className={styles.container}>
					<p className={styles.authText}>{`Ошибка, авторизируйтесь`}</p>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.claimsPage}>
			{userStore.isAuth && <AdminSidebar store={userStore} />}
			<div className={styles.container}>
				{isUserHaveRights(userStore.user, UserRoles.Admin) && (
					<h2 className={styles.title}>
						{texts.title} ({claimsStore.claims.length})
					</h2>
				)}
				{error.isError && <p className={styles.error}>{error.value}</p>}
				{isUserHaveRights(userStore.user, UserRoles.Admin) && (
					<div className={styles.claims}>
						{!claimsStore.isLoading &&
							claimsStore.claims &&
							claimsStore.claims
								.slice()
								.reverse()
								.map((claim, index) => (
									<AdminClaim propsClaim={claim} key={index} />
								))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ClaimsPage;
