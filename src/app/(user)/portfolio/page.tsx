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
      <Stocks location="Страница портфолио, блок акций" />
      <Reviews reviews={reviews} />
      <LeaveRequestBlock
        location="Страница портфолио"
        tag="Рассчитать стоимость кухни"
      />
    </>
  );
};

export default PortfolioPage;
