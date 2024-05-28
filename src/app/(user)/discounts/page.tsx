import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import DiscountsPage from "@/pages/DiscountsPage";
import UserDiscountService from "@/services/shared/UserDiscountService";
import { SITE_NAME, pagesData } from "@/shared/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.discounts.url),
  title: pagesData.discounts.title,
  description: pagesData.discounts.description,
  keywords: pagesData.discounts.keywords,
  openGraph: {
    type: pagesData.discounts.type,
    title: pagesData.discounts.title,
    url: pagesData.discounts.url,
    description: pagesData.discounts.description,
    siteName: SITE_NAME,
    images: [main1.src, main2.src, main3.src, main4.src, main5.src],
  },
  alternates: {
    canonical: pagesData.discounts.url,
  },
};

export const revalidate = 30;

const getDiscounts = async () => {
  return await UserDiscountService.getDiscounts();
};

export default async function page() {
  const discounts = await getDiscounts();
  return <DiscountsPage discounts={discounts} />;
}
