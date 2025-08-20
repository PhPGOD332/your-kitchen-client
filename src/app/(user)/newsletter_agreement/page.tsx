import React from "react";
import styles from "@/pages/PrivacyPage.module.scss";
import { NewsletterAgreement } from "@/shared/NewsletterAgreement";
import { Metadata } from "next";
import { pagesData, SITE_NAME } from "@/shared/constants";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.newsletterAgreement.url),
  title: pagesData.newsletterAgreement.title,
  description: pagesData.newsletterAgreement.description,
  keywords: pagesData.newsletterAgreement.keywords,
  openGraph: {
    type: pagesData.newsletterAgreement.type,
    title: pagesData.newsletterAgreement.title,
    url: pagesData.newsletterAgreement.url,
    description: pagesData.newsletterAgreement.description,
    siteName: SITE_NAME
  },
  alternates: {
    canonical: pagesData.newsletterAgreement.url,
  },
};

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Соглашение на информационную рассылку</h1>
      {NewsletterAgreement}
    </div>
)
  ;
};

export default Page;