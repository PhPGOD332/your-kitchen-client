import React from "react";
import { Metadata } from "next";
import { pagesData, SITE_NAME } from "@/shared/constants";
import styles from "@/pages/PrivacyPage.module.scss";
import { WebsiteUsageRegulations } from "@/shared/WebsiteUsageRegulations";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.websiteUsageRegulations.url),
  title: pagesData.websiteUsageRegulations.title,
  description: pagesData.websiteUsageRegulations.description,
  keywords: pagesData.websiteUsageRegulations.keywords,
  openGraph: {
    type: pagesData.websiteUsageRegulations.type,
    title: pagesData.websiteUsageRegulations.title,
    url: pagesData.websiteUsageRegulations.url,
    description: pagesData.websiteUsageRegulations.description,
    siteName: SITE_NAME
  },
  alternates: {
    canonical: pagesData.websiteUsageRegulations.url,
  },
};

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Положение о пользовании сайтом</h1>
      {WebsiteUsageRegulations}
    </div>
  );
};

export default Page;