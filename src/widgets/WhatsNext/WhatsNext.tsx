import floor from "@/data/images/floor.webp";
import gazeel from "@/data/images/gazeel.webp";
import phone from "@/data/images/phone.webp";
import three from "@/data/images/three.webp";
import man from "@/data/images/working-man.webp";
import Image from "next/image";
import styles from "./WhatsNext.module.scss";

const cardTexts = [
  {
    text: "Ваша кухня будет собрана только из долговечных материалов",
  },
  {
    text: "Без задержек по срокам",
  },
  {
    text: "Без ошибок, в точном соответствии с проектом",
  },
];

const WhatsNext = () => {
  return (
    <div className={styles.whatsNext}>
      <div className={styles.firstBlock}>
        <div className={styles.container}>
          <Image
            src={man}
            className={styles.workingMan}
            draggable={false}
            alt="Мужчина"
          />
          <div className={styles.titleWrapper}>
            {/*<p className={styles.text1}>Что будет после дизайн-проекта?</p>*/}
            <h3 className={styles.title}>
              Производство кухни за <span>21</span> день в полном соответствии с
              проектом, которая
            </h3>
            <p className={styles.text3}>
              сохранит первоначальный вид от <span>10</span> лет
            </p>
          </div>
          <div className={styles.cards}>
            {cardTexts.map((card, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.circle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    className={styles.plus}
                  >
                    <path
                      d="M5.06836 1.70508L5.06836 9.70508"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1.06836 5.70508L9.06836 5.70508"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className={styles.cardText}>{card.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.cards2}>
            <div className={styles.column}>
              <div className={styles.longCard}>
                <p className={styles.cardTitle}>
                  Без доплат и задержек доставки
                </p>
                <p className={styles.cardDescription}>
                  Бесплатная доставка и подъем. Цена, которую вы видите в
                  договоре - <span>конечная.</span> Никаких доплат не будет.
                </p>
                <Image
                  src={gazeel}
                  className={styles.gazeel}
                  draggable={false}
                  alt="Газель"
                />
                <p className={styles.price}>
                  <span>0</span>₽
                </p>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.defaultCard}>
                <p className={styles.cardTitle}>
                  Гарнитур отправляется на производство сразу, в день заключения
                  договора
                </p>
                <p className={styles.cardDescription}>
                  Все материалы в наличии, не нужно ждать поставок
                </p>
                <Image
                  src={three}
                  className={styles.imgDefault}
                  draggable={false}
                  alt="Доски"
                />
              </div>
              <div className={styles.defaultCard}>
                <p className={styles.cardTitle}>
                  Не более, чем через 21 день привезём и установим гарнитур за 1
                  день
                </p>
                <Image
                  src={floor}
                  className={styles.imgDefault}
                  draggable={false}
                  alt="Пол"
                />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.longCard}>
                <p className={styles.cardTitle}>
                  Оплата частями, при доставке кухни. Либо полностью, но со
                  скидкой 7%
                </p>
                <p className={styles.cardDescription}>
                  Предоплата 50% за материалы, а остальные 50% за день до
                  доставки. Либо предоплата 100% со скидкой в 7%
                </p>
                <Image
                  src={phone}
                  className={styles.phone}
                  draggable={false}
                  alt="Телефон"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNext;
