import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import { SITE_NAME, pagesData } from "@/shared/constants";
import { ThankYou } from "@/widgets/ThankYou/ThankYou";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.thankyou.url),
  title: pagesData.thankyou.title,
  description: pagesData.thankyou.description,
  keywords: pagesData.thankyou.keywords,
  openGraph: {
    type: pagesData.thankyou.type,
    title: pagesData.thankyou.title,
    url: pagesData.thankyou.url,
    description: pagesData.thankyou.description,
    siteName: SITE_NAME,
    images: [main1.src, main2.src, main3.src, main4.src, main5.src],
  },
  alternates: {
    canonical: pagesData.thankyou.url,
  },
};

const ThankYouPage = () => {
  return <ThankYou />;
};

export default ThankYouPage;
