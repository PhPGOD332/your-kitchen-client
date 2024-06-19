import React from "react";
import styles from "@/pages/PrivacyPage.module.scss";
import { PrivacyPolicy } from "@/shared/PrivacyPolicy";

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Политика конфиденциальности</h1>
      { PrivacyPolicy }
    </div>
  );
};

export default Page;