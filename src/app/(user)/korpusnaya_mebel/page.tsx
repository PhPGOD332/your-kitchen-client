import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import styles from "@/pages/FurniturePage.module.scss";
import { UserFurnitureService } from "@/services/shared/UserFurnitureService";
import { UserReviewsService } from "@/services/shared/UserReviewsService";
import { SITE_NAME, pagesData } from "@/shared/constants";
import { CustomerChoice } from "@/widgets/CustomerChoice/CustomerChoice";
import { FourSteps } from "@/widgets/FourSteps/FourSteps";
import { Furniture } from "@/widgets/Furniture/Furniture";
import { FurnitureAdvantages } from "@/widgets/FurnitureAdvantages/FurnitureAdvantages";
import { FurnitureHelloScreen } from "@/widgets/FurnitureHelloScreen/FurnitureHelloScreen";
import { LeaveRequestFile } from "@/widgets/LeaveRequestFile/LeaveRequestFile";
import { LeaveRequestMini } from "@/widgets/LeaveRequestMini/LeaveRequestMini";
import MainArticles from "@/widgets/MainArticles/MainArticles";
import Reviews from "@/widgets/Reviews/Reviews";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.furniture.url),
  title: pagesData.furniture.title,
  description: pagesData.furniture.description,
  keywords: pagesData.furniture.keywords,
  openGraph: {
    type: pagesData.furniture.type,
    title: pagesData.furniture.title,
    url: pagesData.furniture.url,
    description: pagesData.furniture.description,
    siteName: SITE_NAME,
    images: [main1.src, main2.src, main3.src, main4.src, main5.src],
  },
  alternates: {
    canonical: pagesData.furniture.url,
  },
};

export const revalidate = 30;

const getFurnitureInfo = async () => {
  const furniture = await UserFurnitureService.getAllFurniture();
  const reviews = await UserReviewsService.getReviews();
  return { furniture, reviews };
};

export default async function page() {
  const { furniture, reviews } = await getFurnitureInfo();
  return (
    <div className={styles.bg}>
      <FurnitureHelloScreen />
      {furniture && furniture.length && <Furniture furniture={furniture} />}
      <FurnitureAdvantages />
      <LeaveRequestMini
        tag="Получить бесплатный эскиз"
        location="Страница корпусной мебели, после преимуществ"
      />
      <CustomerChoice />
      <Reviews withoutBg reviews={reviews} />
      <LeaveRequestFile
        tag="Узнать цену"
        location='Страница корпусной мебели, "Есть проект - сравните цену!"'
      />
      <FourSteps />
      <MainArticles withoutBg />
    </div>
  );
}
