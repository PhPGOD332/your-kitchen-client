import ipadImg from "@/data/images/ipad_project.webp";
import bgImage from "@/data/images/prices_hello_screen.jpg";
import { Icons } from "@/shared/IconsComponents/Icons";
import { OrangeButton } from "@/shared/ui";
import Image from "next/image";
import styles from "./ChoiseHelloScreen.module.scss";

interface Props {
  openModal: () => void;
}

export const PricesHelloScreen = ({ openModal }: Props) => {
  return (
    <>
      <div className={`${styles.helloScreen} ${styles.screenIpad}`}>
        <Image
          src={bgImage}
          className={`${styles.bgImage} ${styles.blur}`}
          alt="Фон"
          draggable={false}
          priority
          quality={100}
        />
        <div className={`${styles.container} ${styles.reverseDots}`}>
          <h2 className={`${styles.title} ${styles.boldTitle} ${styles.w840}`}>
            Есть проект - сравните цены!
          </h2>
          <p className={styles.subtitle}>
            Если у вас есть дизайн проект, эскиз, схема или картинка вашей кухни
            с размерами - пришлите информацию для расчета стоимости и получите
            консультанцию дизайнера.
          </p>
          <div className={styles.asks}>
            <div className={styles.ask}>
              <Icons.lamp className={styles.icon} />
              <p className={styles.askText}>Как улучшить проект?</p>
            </div>
            <div className={styles.ask}>
              <Icons.keys className={styles.icon} />
              <p className={styles.askText}>
                Из чего сделать надежную и долговечную кухню?
              </p>
            </div>
          </div>

          <OrangeButton className={styles.button} onClick={openModal}>
            Узнать цену
          </OrangeButton>
          <div className={styles.ipad}>
            <Image
              src={ipadImg}
              width={500}
              height={370}
              className={styles.ipadImg}
              alt="Проект"
              draggable={false}
            />
            <div className={styles.ellipse}></div>
          </div>
        </div>
      </div>
    </>
  );
};
