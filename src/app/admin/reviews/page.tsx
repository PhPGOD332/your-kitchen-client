'use client';

import { isUserHaveRights } from '@/features/isUserHaveRights';
import { Icons } from '@/shared/IconsComponents/Icons';
import MiniLoading from '@/shared/MiniLoading';
import { pagesLinks } from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteReview, getReviews } from '@/store/reviews.slice';
import { checkAuth } from '@/store/user.slice';
import { UserRoles } from '@/types/UserRoles';
import AdminSidebar from '@/widgets/AdminSidebar/AdminSidebar';
import Review from '@/widgets/Reviews/Review';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../Page.module.scss';

// Тексты
const texts = {
	buttonText: '+ Добавить отзыв',
	titleText: 'Отзывы',
};

const ReviewsPage = () => {
	const userStore = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();
	const reviewStore = useAppSelector((store) => store.reviews);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
			dispatch(getReviews());
		}
	}, []);

	const removeReview = async (id: string) => {
		if (
			localStorage.getItem('token') &&
			isUserHaveRights(userStore.user, UserRoles.Admin)
		) {
			dispatch(deleteReview(id));
		}
	};

	if (reviewStore.isLoading) {
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
						{texts.titleText} ({reviewStore.reviews.length})
					</h2>
					{isUserHaveRights(userStore.user, UserRoles.Admin) && (
						<Link
							href={pagesLinks.adminReviewsNew}
							className={styles.addButton}
						>
							{texts.buttonText}
						</Link>
					)}
				</div>
				<div className={styles.reviews}>
					{reviewStore.reviews &&
						reviewStore.reviews
							.slice(0)
							.reverse()
							.map((review, index) => (
								<div className={styles.reviewLink} key={index}>
									{isUserHaveRights(userStore.user, UserRoles.Admin) && (
										<button
											type='button'
											className={styles.removeReviewButton}
											onClick={() => removeReview(review._id)}
										>
											<Icons.remove className={styles.removeIcon} />
										</button>
									)}
									<Link href={`/admin/reviews/${review._id}`}>
										<Review review={review} />
									</Link>
								</div>
							))}
				</div>
			</div>
		</div>
	);
};

export default ReviewsPage;
