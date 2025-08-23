import React from "react";
import styles from "@/pages/PrivacyPage.module.scss";
import { PriceAdditionalAssemblyServices } from "@/shared/PriceAdditionalAssemblyServices";
import { Metadata } from "next";
import { pagesData, SITE_NAME } from "@/shared/constants";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.priceAdditionalAssemblyServices.url),
  title: pagesData.priceAdditionalAssemblyServices.title,
  description: pagesData.priceAdditionalAssemblyServices.description,
  keywords: pagesData.priceAdditionalAssemblyServices.keywords,
  openGraph: {
    type: pagesData.priceAdditionalAssemblyServices.type,
    title: pagesData.priceAdditionalAssemblyServices.title,
    url: pagesData.priceAdditionalAssemblyServices.url,
    description: pagesData.priceAdditionalAssemblyServices.description,
    siteName: SITE_NAME
  },
  alternates: {
    canonical: pagesData.priceAdditionalAssemblyServices.url,
  },
};

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Прайс на дополнительные услуги при сборке и требования при монтаже</h1>
      {PriceAdditionalAssemblyServices}
    </div>
  );
};

export default Page;