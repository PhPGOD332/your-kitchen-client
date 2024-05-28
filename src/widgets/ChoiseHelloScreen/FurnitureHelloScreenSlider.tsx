import bgImage from "@/data/images/bg_mebel.jpg";
import { pagesLinks } from "@/shared/constants";
import { OrangeButton } from "@/shared/ui";
import Image from "next/image";
import styles from "./ChoiseHelloScreen.module.scss";

export const FurnitureHelloScreenSlider = () => {
  return (
    <div className={`${styles.helloScreen} ${styles.furnitureScreen}`}>
      <Image
        src={bgImage}
        className={`${styles.bgImage} ${styles.furnitureBg}`}
        alt="Фон"
        draggable={false}
        priority
        quality={100}
      />
      <div className={styles.container}>
        <div className={styles.tags}>
          <p className={styles.tag}>Доставка</p>
          <div className={styles.circle}></div>
          <p className={styles.tag}>Сборка</p>
          <div className={styles.circle}></div>
          <p className={styles.tag}>Гарантия</p>
        </div>
        <h2 className={`${styles.title} ${styles.boldTitle}`}>
          Корпусная мебель <br /> на заказ от производителя
        </h2>
        <p className={styles.subtitle}>
          Производство высококачественной мебели по индивидуальным заказам и
          размерам. Мы изготавливаем корпусную и встроенную мебель, такую как
          распашные шкафы, угловые и шкафы-купе, а также прихожие, комоды,
          тумбы, мебельные гарнитуры для кухни и многое другое.
        </p>

        <OrangeButton className={styles.button} href={pagesLinks.furniture}>
          Подробнее
        </OrangeButton>
      </div>
    </div>
  );
};
