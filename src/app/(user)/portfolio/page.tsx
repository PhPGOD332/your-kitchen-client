import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import { UserKitchenService } from "@/services/shared/UserKitchenService";
import { UserReviewsService } from "@/services/shared/UserReviewsService";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
import { SITE_NAME, pagesData } from "@/shared/constants";
import KitchenExamples from "@/widgets/KitchenExamples/KitchenExamples";
import Reviews from "@/widgets/Reviews/Reviews";
import { Stocks } from "@/widgets/Stocks/Stocks";
import { Metadata } from "next";
import previewVideoSlider from "@/data/images/video-preview1.jpg";
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

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.portfolio.url),
  title: pagesData.portfolio.title,
  description: pagesData.portfolio.description,
  keywords: pagesData.portfolio.keywords,
  openGraph: {
    type: "website",
    title: pagesData.portfolio.title,
    url: pagesData.portfolio.url,
    description: pagesData.portfolio.description,
    siteName: SITE_NAME,
    images: [main1.src, main2.src, main3.src, main4.src, main5.src],
  },
  alternates: {
    canonical: pagesData.portfolio.url,
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

const getPortfolioInfo = async () => {
  const kitchens = await UserKitchenService.getKitchens();
  const reviews = await UserReviewsService.getReviews();

  return { kitchens, reviews };
};

const PortfolioPage = async () => {
  const { kitchens, reviews } = await getPortfolioInfo();
  return (
    <>
      <div itemScope itemType="https://schema.org/WebSite">
        <meta itemProp="url" content={pagesData.portfolio.name} />
        <meta itemProp="name" content={SITE_NAME} />
      </div>
      <KitchenExamples kitchens={kitchens} />
      <Stocks location="Страница портфолио, блок акций" bgColor={'#35302c'} />
      <PhotoSlider
        title={"Наше производство и технологии"}
        photos={initialImagesSlider}
        onlyVideo={true}
        previewVideo={previewVideoSlider.src}
        withoutLowerText={true}
        firstVideoBlock={true}
        bgColor='#332e2a'
        wide={true}
        withoutYouCan={true}
      />
      <Reviews reviews={reviews} />
      <LeaveRequestBlock
        location="Страница портфолио"
        tag="Рассчитать стоимость кухни"
      />
    </>
  );
};

export default PortfolioPage;
