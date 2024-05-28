import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import UserArticleService from "@/services/shared/UserArticleService";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
import { SITE_NAME, pagesData } from "@/shared/constants";
import Articles from "@/widgets/Articles/Articles";
import { Metadata } from "next";

const getArticles = async () => {
  const result = await UserArticleService.getArticles();
  return result;
};

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.articles.url),
  title: pagesData.articles.title,
  description: pagesData.articles.description,
  keywords: pagesData.articles.keywords,
  openGraph: {
    type: "website",
    title: pagesData.articles.title,
    url: pagesData.articles.url,
    description: pagesData.articles.description,
    siteName: SITE_NAME,
    images: [main1.src, main2.src, main3.src, main4.src, main5.src],
  },
  alternates: {
    canonical: pagesData.articles.url,
  },
};

const page = async () => {
  const articles = await getArticles();
  return (
    <>
      <Articles articles={articles} />
      <LeaveRequestBlock
        location="Страница статей"
        tag="Рассчитать стоимость кухни"
      />
    </>
  );
};

export default page;
