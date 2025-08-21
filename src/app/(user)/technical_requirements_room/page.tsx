import React from "react";
import styles from "@/pages/PrivacyPage.module.scss";
import { TechnicalRequirementsRoom } from "@/shared/TechnicalRequirementsRoom";
import { Metadata } from "next";
import { pagesData, SITE_NAME } from "@/shared/constants";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.technicalRequirementsRoom.url),
  title: pagesData.technicalRequirementsRoom.title,
  description: pagesData.technicalRequirementsRoom.description,
  keywords: pagesData.technicalRequirementsRoom.keywords,
  openGraph: {
    type: pagesData.technicalRequirementsRoom.type,
    title: pagesData.technicalRequirementsRoom.title,
    url: pagesData.technicalRequirementsRoom.url,
    description: pagesData.technicalRequirementsRoom.description,
    siteName: SITE_NAME
  },
  alternates: {
    canonical: pagesData.technicalRequirementsRoom.url,
  },
};

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Технические требования
        к помещению, предназначенному для установки и сборки мебели
      </h1>
      {TechnicalRequirementsRoom}
    </div>
  );
};

export default Page;