import React from "react";
import styles from "@/pages/PrivacyPage.module.scss";
import { PrivacyPolicy } from "@/shared/PrivacyPolicy";
import { Metadata } from "next";
import { pagesData, SITE_NAME } from "@/shared/constants";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.privacyPolicy.url),
  title: pagesData.privacyPolicy.title,
  description: pagesData.privacyPolicy.description,
  keywords: pagesData.privacyPolicy.keywords,
  openGraph: {
    type: pagesData.privacyPolicy.type,
    title: pagesData.privacyPolicy.title,
    url: pagesData.privacyPolicy.url,
    description: pagesData.privacyPolicy.description,
    siteName: SITE_NAME
  },
  alternates: {
    canonical: pagesData.privacyPolicy.url,
  },
};

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Политика конфиденциальности</h1>
      { PrivacyPolicy }
    </div>
  );
};

export default Page;