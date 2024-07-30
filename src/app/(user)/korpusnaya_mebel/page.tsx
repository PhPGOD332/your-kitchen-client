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
import { PhotoSlider } from "@/widgets/PhotoSlider/PhotoSlider";
import img1 from "@/data/images/contacts-slider/MAIN (1).webp";
import img2 from "@/data/images/contacts-slider/MAIN (2).webp";
import img3 from "@/data/images/contacts-slider/MAIN (3).webp";
import img4 from "@/data/images/contacts-slider/MAIN (4).webp";
import img5 from "@/data/images/contacts-slider/MAIN (5).webp";
import img6 from "@/data/images/contacts-slider/MAIN (6).webp";
import img7 from "@/data/images/contacts-slider/MAIN (7).webp";
import img8 from "@/data/images/contacts-slider/MAIN (8).webp";
import img9 from "@/data/images/contacts-slider/MAIN (9).webp";
import img10 from "@/data/images/contacts-slider/MAIN (10).webp";
import previewVideoSlider from "@/data/images/video-preview1.jpg";

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

const initialImagesSlider = [
  img1.src,
  img2.src,
  img3.src,
  img4.src,
  img5.src,
  img6.src,
  img7.src,
  img8.src,
  img9.src,
  img10.src,
];

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
      <PhotoSlider
        title={"Наше производство и технологии"}
        photos={initialImagesSlider}
        onlyVideo={true}
        previewVideo={previewVideoSlider.src}
        withoutLowerText={true}
        firstVideoBlock={true}
        bgColor='linear-gradient(180deg, #433a31 0%, #3D3733 55.47%, #3D3733 78.81%, #3D3733 107.57%)'
        wide={true}
        withoutYouCan={true}
      />
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
