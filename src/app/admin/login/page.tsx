'use client';

import { pagesLinks } from '@/shared/constants';
import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/user.slice';
import { IError } from '@/types/IError';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './LoginPage.module.scss';

interface TInputs {
	email: string;
	password: string;
}

// Тексты
const texts = {
	buttonText: 'Войти',
	titleText: 'Войти в админ панель',
	errorText: 'Неправильные данные',
};

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TInputs>();
	const [error, setError] = useState<IError>({ isError: false, value: '' });

	const dispatch = useAppDispatch();

	const router = useRouter();

	const onSubmit: SubmitHandler<TInputs> = async (data) => {
		const response = await dispatch(
			login({
				email: data.email,
				password: data.password,
			}),
		);
		if (!response.payload) {
			setError({
				isError: true,
				value: 'Неправильные данные',
			});
		}
		if (response.payload) {
			setError({
				isError: false,
				value: '',
			});
			router.push(pagesLinks.admin);
		}
	};

	return (
		<div className={styles.loginPage}>
			<div className={styles.container}>
				<h2 className={styles.title}>{texts.titleText}</h2>
				{error.isError && <p className={styles.error}>{texts.errorText}</p>}
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<input
						type='text'
						className={styles.input}
						{...register('email', {
							required: 'Введите ваш email',
						})}
					/>
					<input
						type='password'
						className={styles.input}
						{...register('password', {
							required: 'Введите ваш пароль',
						})}
					/>
					<button type='submit' className={styles.button}>
						{texts.buttonText}
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
