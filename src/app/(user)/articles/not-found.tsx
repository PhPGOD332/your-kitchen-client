import Page404 from '@/pages/Page404';
import { pagesData } from '@/shared/constants';
import { Metadata } from 'next';
import '../../styles';

export const metadata: Metadata = {
	title: '404: Страница не найдена',
	description: 'Страницы не существует',
};

const NotFound = () => {
	return (
		<Page404
			title='Извините, статья не найдена'
			buttonText='Вернуться к статьям'
			link={`/${pagesData.articles.name}`}
		/>
	);
};

export default NotFound;
