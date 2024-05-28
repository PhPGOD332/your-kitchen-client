'use client';

import { OrangeButton } from '@/shared/ui';
import { type IArticle } from '@/types/IArticle';
import { useState } from 'react';
import ArticleCard from './ArticleCard';
import styles from './Articles.module.scss';

type Props = {
	articles: IArticle[];
};

const Articles = ({ articles }: Props) => {
	const [articlesPerPage, setArticlePerPage] = useState(9);

	const showMore = () => {
		setArticlePerPage((prev) => prev + 9);
	};

	return (
		<div className={styles.articlesPage}>
			<div className={styles.container}>
				<div className={styles.titleWrapper}>
					<h1 className={styles.title}>Статьи и полезные материалы</h1>
					<h2 className={styles.subtitle}>
						В процессе выбора мебели для кухни всегда возникает множество
						вопросов. Мы стараемся держать вас в курсе всех самых важных и
						актуальных тем и публикуем полезную информацию.
					</h2>
				</div>
				{articles && articles.length !== 0 && (
					<div className={styles.articles}>
						{articles.slice(0, articlesPerPage).map((article) => (
							<ArticleCard
								article={article}
								href={`/articles/${article.link || article._id}`}
								key={article._id}
							/>
						))}
					</div>
				)}
				{!articles ||
					(articles.length === 0 && (
						<p className={styles.error}>Статей пока нет</p>
					))}
				{articles.length > articlesPerPage && (
					<div className={styles.buttonWrapper}>
						<OrangeButton onClick={showMore} arrow='down' center>
							Показать еще
						</OrangeButton>
					</div>
				)}
			</div>
		</div>
	);
};

export default Articles;
