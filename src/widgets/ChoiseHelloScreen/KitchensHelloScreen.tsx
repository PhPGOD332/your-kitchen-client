import bgImage from "@/data/images/bg_kitchen_screen.jpg";
import { OrangeButton } from "@/shared/ui";
import Image, { type StaticImageData } from "next/image";
import styles from "./ChoiseHelloScreen.module.scss";
import WidgetsList from "@/widgets/WidgetsList/WidgetsList";

interface ScreenProps {
  image?: StaticImageData;
  tags?: string[];
  title?: string;
  description?: string;
  priceFrom?: string;
  button?: {
    href: string;
    text: string;
  };
  titleLength?: "980";
}

export const KitchensHelloScreen = ({
  button,
  image,
  tags,
  title,
  description,
  priceFrom,
  titleLength,
}: ScreenProps) => {
  return (
    <>
      <div className={`${styles.helloScreen} ${styles.kitchensScreen}`}>
        <Image
          src={image ? image : bgImage}
          className={styles.bgImage}
          alt="Фон"
          draggable={false}
          priority
          quality={100}
        />
        <div className={`${styles.container} ${styles.reverseDots}`}>
          <div
            className={`${styles.tags} ${styles.column} ${styles.upperTags}`}
          >
            {tags &&
              tags.map((tag, index) => (
                <div className={styles.tagWrapper} key={index}>
                  <p className={styles.tag}>{tag}</p>
                  <div
                    className={`${styles.circle} ${
                      tags.length === index + 1 && styles.last
                    }`}
                  ></div>
                </div>
              ))}
            {!tags && (
              <>
                <div className={styles.tagWrapper}>
                  <p className={styles.tag}>Рассрочка до 24 месяцев</p>
                  <div className={styles.circle}></div>
                </div>
                <div className={styles.tagWrapper}>
                  <p className={styles.tag}>Производство от 10 дней</p>
                  <div className={styles.circle}></div>
                </div>
                <div className={styles.tagWrapper}>
                  <p className={styles.tag}>Бесплатный дизайн проект</p>
                  <div className={`${styles.circle} ${styles.last}`}></div>
                </div>
              </>
            )}
          </div>
          {title ? (
            <h2
              className={`${styles.title} ${styles.boldTitle} ${styles.w840} ${
                styles.ptHigh
              } ${titleLength && titleLength === "980" && styles.w980}`}
            >
              {title}
            </h2>
          ) : (
            <h1
              className={`${styles.title} ${styles.boldTitle} ${styles.w840} ${
                styles.ptHigh
              } ${titleLength && titleLength === "980" && styles.w980}`}
            >
              Кухни на заказ от производителя в Москве и МО
            </h1>
          )}
          <p className={`${styles.subtitle} ${styles.upperSubtitle}`}>
            {description
              ? description
              : "Индивидуальные кухни на заказ от производителя в Москве и Московской области с гарантией и возможностью рассрочки до 24 месяцев: выбирайте из широкого ассортимента стилей и материалов, наслаждайтесь уникальным дизайном и комфортом."}
          </p>
          <p className={`${styles.subtitle} ${styles.priceFrom}`}>
            {
              priceFrom
              ? priceFrom
                : `Кухни от 75 000 руб.`
            }
          </p>

          <div className={styles.btnBlock}>
            <OrangeButton
              className={styles.button}
              href={button && button.href ? button.href : "#kitchens"}
            >
              {button && button.text ? button.text : "Подробнее"}
            </OrangeButton>
            <WidgetsList zoonHide={true}/>
          </div>
        </div>
      </div>
    </>
  );
};
