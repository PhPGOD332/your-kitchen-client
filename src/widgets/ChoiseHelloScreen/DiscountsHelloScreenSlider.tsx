import bgImage from "@/data/images/bg_discounts_screen.jpg";
import { pagesLinks } from "@/shared/constants";
import { OrangeButton } from "@/shared/ui";
import Image from "next/image";
import styles from "./ChoiseHelloScreen.module.scss";

interface Props {
  hasTags?: boolean;
  centerText?: boolean;
  miniHeight?: boolean;
}

export const DiscountsHelloScreenSlider = ({
  hasTags,
  centerText,
  miniHeight,
}: Props) => {
  return (
    <>
      <div
        className={`${styles.helloScreen} ${styles.furnitureScreen} ${
          miniHeight && styles.miniHeight
        }`}
      >
        <Image
          src={bgImage}
          className={styles.bgImage}
          alt="Фон"
          draggable={false}
          quality={100}
          loading="lazy"
        />
        <div className={styles.container}>
          {hasTags && (
            <div className={styles.tags}>
              <p className={styles.tag}>Скидки</p>
              <div className={styles.circle}></div>
              <p className={styles.tag}>Акции</p>
              <div className={styles.circle}></div>
              <p className={styles.tag}>Подарки</p>
            </div>
          )}
          <h2
            className={`${styles.title} ${styles.boldTitle} ${styles.w1050} ${
              centerText && styles.center
            }`}
          >
            Подарки и техника новым и действующим клиентам фабрики «Твоя кухня»
          </h2>
          <p className={`${styles.subtitle} ${centerText && styles.center}`}>
            Актуальный каталог акций и скидок на кухни и корпусную мебель в
            Москве. Выгодные предложения на покупку кухонного гарнитура и другой
            мебели на заказ.
          </p>

          <OrangeButton
            className={`${styles.button} ${centerText && styles.centerButton && styles.discCenterButton} ${
              miniHeight && styles.lower
            }`}
            href={pagesLinks.discounts}
            center={centerText}
          >
            Подробнее об акциях
          </OrangeButton>
        </div>
      </div>
    </>
  );
};
