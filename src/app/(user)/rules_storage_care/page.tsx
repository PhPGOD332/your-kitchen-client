import React from "react";
import { Metadata } from "next";
import { pagesData, SITE_NAME } from "@/shared/constants";
import styles from "@/pages/PrivacyPage.module.scss";
import { RulesStorageCare } from "@/shared/RulesStorageCare";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.rulesStorageCare.url),
  title: pagesData.rulesStorageCare.title,
  description: pagesData.rulesStorageCare.description,
  keywords: pagesData.rulesStorageCare.keywords,
  openGraph: {
    type: pagesData.rulesStorageCare.type,
    title: pagesData.rulesStorageCare.title,
    url: pagesData.rulesStorageCare.url,
    description: pagesData.rulesStorageCare.description,
    siteName: SITE_NAME
  },
  alternates: {
    canonical: pagesData.rulesStorageCare.url,
  },
};

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Правила хранение, ухода и эксплуатации
        корпусной мебели (ИНСТРУКЦИЯ по эксплуатации кухонной мебели)
      </h1>
      {RulesStorageCare}
    </div>
  );
};

export default Page;