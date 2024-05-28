import UserArticleService from "@/services/shared/UserArticleService";
import { UserKitchenService } from "@/services/shared/UserKitchenService";
import { CLIENT_URL, pagesData, pagesLinks } from "@/shared/constants";

const siteRoutes = [
  {
    link: "",
    lastModify: "2024-01-25T17:16:55.776Z",
  },
  {
    link: pagesLinks.portfolio,
    lastModify: "2024-01-25T17:16:55.776Z",
  },
  {
    link: pagesLinks.articles,
    lastModify: "2024-01-25T17:16:55.776Z",
  },
  {
    link: pagesLinks.advantages,
    lastModify: new Date(2024, 0, 13, 16, 37).toISOString(),
  },
  {
    link: pagesLinks.furniture,
    lastModify: "2024-01-25T17:16:55.776Z",
  },
  {
    link: pagesLinks.discounts,
    lastModify: "2024-02-02T13:08:31.056Z",
  },
  {
    link: pagesLinks.contacts,
    lastModify: new Date(2024, 1, 27, 16, 37).toISOString(),
  },
  {
    link: pagesLinks.departureMeasurer,
    lastModify: new Date(2024, 4, 26, 20, 3).toISOString(),
  },
];

// Получение информции о статьях
const getArticlesInfo = async () => {
  const articles = await UserArticleService.getArticles();
  const articlesLinks = articles.map((article) => {
    return {
      link: article.link,
      lastModify: article.updatedAt || article.createdAt,
    };
  });

  // Последнее изменение страницы статей
  const lastArticlesUpdated = articlesLinks.reduce((acc, article) => {
    return new Date(article.lastModify).getTime() > new Date(acc).getTime()
      ? new Date(article.lastModify).getTime()
      : new Date(acc).getTime();
  }, new Date(articlesLinks[0].lastModify).getTime());

  const articlesPageIndex = siteRoutes.findIndex(
    (route) => route.link === pagesLinks.articles,
  );

  siteRoutes[articlesPageIndex].lastModify = new Date(
    lastArticlesUpdated,
  ).toISOString();

  return articlesLinks;
};

// Получение информции о кухнях
const getKitchensInfo = async () => {
  const kitchens = await UserKitchenService.getKitchens();
  const kitchensLinks = kitchens.map((kitchen) => {
    if (kitchen.slug) {
      return {
        link: kitchen.slug,
        lastModify: new Date().toISOString(),
      };
    }
  });

  return kitchensLinks;
};

export default async function sitemap() {
  const articlesLinks = await getArticlesInfo();
  const kitchensLinks = await getKitchensInfo();

  // Все страницы
  const routes = siteRoutes.map((route) => ({
    url: `${CLIENT_URL}${route.link}`,
    lastModified: route.lastModify || new Date().toISOString(),
    priority: 1.0,
  }));

  // Статьи
  const articles = articlesLinks.map((article) => ({
    url: `${CLIENT_URL}/${pagesData.articles.name}/${article.link}`,
    lastModified: article.lastModify,
  }));

  // Кухни
  const kitchens = kitchensLinks
    .filter((kitchen) => kitchen?.link)
    .map((kitchen) => ({
      url: `${CLIENT_URL}/${pagesData.portfolio.name}/${kitchen?.link}`,
      lastModified: kitchen?.lastModify,
    }));

  return [...routes, ...articles, ...kitchens];
}
