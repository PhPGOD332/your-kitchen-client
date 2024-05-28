import type { IArticle } from "@/types/IArticle";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';


export default class UserArticleService {
  static async getMainArticles (): Promise<IArticle[]> {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/articles-main`, {
      method: 'GET',
      next: {
        revalidate: 30,
      },
    });

    const responseArticles: IArticle[] = await response.json();

    const returnArticles = [...responseArticles];
    const articlesWithPhotos: IArticle[] = returnArticles.map((article) => {
      const articlePhoto = `${NEXT_PUBLIC_API_URL}/images/${article.preview}`;
      article.preview = articlePhoto;
      return article;
    })

    return articlesWithPhotos;
  }

  static async getArticles (): Promise<IArticle[]> {
     const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/articles`, {
      method: 'GET',
      next: {
        revalidate: 30,
      },
    });

    const responseArticles: IArticle[] = await response.json();

    const returnArticles = [...responseArticles];
    const articlesWithPhotos: IArticle[] = returnArticles.map((article) => {
      const articlePhoto = `${NEXT_PUBLIC_API_URL}/images/${article.preview}`;
      article.preview = articlePhoto;
      return article;
    })

    return articlesWithPhotos;
  }

  static async getArticle (id: string): Promise<IArticle> {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/articles/${id}`, {
      method: 'GET',
      next: {
        revalidate: 30,
      },
    });

    const responseArticle: IArticle = await response.json();

    const returnArticle = {...responseArticle};
    const articlePhoto = `${NEXT_PUBLIC_API_URL}/images/${returnArticle.preview}`;

    returnArticle.preview = articlePhoto;
    return returnArticle;
  }
}