import React from "react";
import styles from "@/pages/PrivacyPage.module.scss";
import { CookieUsageStatus } from "@/shared/CookieUsageStatus";
import { Metadata } from "next";
import { pagesData, SITE_NAME } from "@/shared/constants";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.cookieUsageStatus.url),
  title: pagesData.cookieUsageStatus.title,
  description: pagesData.cookieUsageStatus.description,
  keywords: pagesData.cookieUsageStatus.keywords,
  openGraph: {
    type: pagesData.cookieUsageStatus.type,
    title: pagesData.cookieUsageStatus.title,
    url: pagesData.cookieUsageStatus.url,
    description: pagesData.cookieUsageStatus.description,
    siteName: SITE_NAME
  },
  alternates: {
    canonical: pagesData.cookieUsageStatus.url,
  },
};

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Положение использования файлов Cookie</h1>
      {CookieUsageStatus}
    </div>
  );
};

export default Page;