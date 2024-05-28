"use client";

import UserArticleService from "@/services/shared/UserArticleService";
import { pagesLinks } from "@/shared/constants";
import { OrangeButton } from "@/shared/ui";
import { IArticle } from "@/types/IArticle";
import { useEffect, useState } from "react";
import ArticleCard from "../Articles/ArticleCard";
import styles from "./MainArticles.module.scss";

interface MainArticlesProps {
  withoutBg?: boolean;
}

const MainArticles = ({ withoutBg }: MainArticlesProps) => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  const getArticles = async () => {
    const response = await UserArticleService.getMainArticles();
    setArticles(response);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div
      className={
        withoutBg ? styles.articlesBlockWithoutBg : styles.articlesBlock
      }
    >
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Статьи и полезные материалы</h3>
        </div>
        {!articles ||
          (articles.length === 0 && (
            <p className={styles.error}>Статей пока нет</p>
          ))}
        {articles && articles.length !== 0 && (
          <div className={styles.articles}>
            {articles.map((article) => (
              <ArticleCard
                href={`/articles/${article.link}`}
                article={article}
                key={article._id}
              />
            ))}
          </div>
        )}
        <div className={styles.button}>
          <OrangeButton href={pagesLinks.articles} center arrow="down">
            Показать еще
          </OrangeButton>
        </div>
      </div>
    </div>
  );
};

export default MainArticles;
