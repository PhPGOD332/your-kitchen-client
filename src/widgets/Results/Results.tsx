import styles from "./Results.module.scss";
import design from "@/data/images/design.webp";
import offer from "@/data/images/offer.webp";
import install from "@/data/images/install.webp";
import Image from "next/image";

const Results = () => {
  return (
    <div className={styles.resultsPage}>
      <div className={styles.container}>
        <h3 className={styles.title}>Давайте подытожим</h3>
        <p className={styles.bgText}>
          Этапы
          <br />
          работы
        </p>
        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.circle}>Дизайн + смета</p>
            <Image
              src={design}
              alt='Дизайн'
              className={styles.img}
              draggable={false}
            />
            <p className={styles.text}>
              В любое удобное время приезжает дизайнер,{" "}
              <span>делает проект и смету </span>
              идеальной для вас кухни
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.circle}>Договор</p>
            <Image
              src={offer}
              alt='Договор'
              className={styles.img}
              draggable={false}
            />
            <p className={styles.text}>
              Заключаем договор и кухня отправляется на производство{" "}
              <span>в этот же день</span>
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.circle}>Установка</p>
            <Image
              src={install}
              alt='Установка'
              className={styles.img}
              draggable={false}
            />
            <p className={styles.text}>
              <span>Доставляем</span> и производим монтаж мебели, устанавливаем
              технику
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
