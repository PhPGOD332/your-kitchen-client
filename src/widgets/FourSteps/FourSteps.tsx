import courier from "@/data/images/courier.webp";
import drill from "@/data/images/drill.webp";
import phone from "@/data/images/phone_step.webp";
import roulette from "@/data/images/roulette.webp";
import bg from "@/data/images/steps_bg.jpg";
import Image, { type StaticImageData } from "next/image";
import styles from "./FourSteps.module.scss";

type FourStepsProps = {
  title?: string;
};

interface IStep {
  title: string;
  description?: string;
  image: StaticImageData | string;
}

const steps: IStep[] = [
  {
    title: "Ваше обращение",
    description:
      "Позвоните нам, напишите в whatsapp, на e-mail или оставьте онлайн заявку.",
    image: phone,
  },
  {
    title: "выезд на замер",
    description:
      "Предварительный расчет, образцы расцветок, материалы и визуализация проекта.",
    image: roulette,
  },
  {
    title: "Производство",
    description:
      "После утверждения модели и комплектации, наше производство примется за выполнение заказа именно под ваши требования.",
    image: drill,
  },
  {
    title: "Ваша заявка",
    description:
      "Доставка и профессиональный монтаж за один день по Москве и области.",
    image: courier,
  },
];

const getVariant = (index: number) => {
  switch (index) {
    case 1:
      return styles.one;
    case 2:
      return styles.two;
    case 3:
      return styles.three;
    case 4:
      return styles.four;
    default:
      return styles.variant;
  }
};

export const FourSteps = ({ title }: FourStepsProps) => {
  return (
    <div className={styles.fourSteps}>
      <Image className={styles.bg} src={bg} alt="Фон" quality={100} />
      <div className={styles.container}>
        <h3 className={styles.title}>{title ? title : "4 простых шага"}</h3>
        <div className={styles.variants}>
          {steps.map((step, index) => (
            <div
              className={`${styles.variant} ${getVariant(index + 1)}`}
              key={index}
            >
              <div className={styles.wrapper}>
                <p className={styles.variantNumber}>
                  {(index + 1).toString().padStart(2, "0")}
                </p>
                <p className={styles.variantTitle}>{step.title}</p>
                {step.description && (
                  <p className={styles.variantDescription}>
                    {step.description}
                  </p>
                )}
              </div>
              <Image
                src={step.image}
                alt={step.title}
                className={styles.variantImg}
                draggable={false}
              />
              <Image
                src={step.image}
                alt={step.title}
                className={styles.copyImage}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
