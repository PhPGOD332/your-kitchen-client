import { IStock } from "@/types/IStock";
import stock1Img from "./stock1.webp";
import stock2Img from "./stock2.webp";
import stock31Img from "./stock3.1.webp";
import stock32Img from "./stock3.2.webp";
import stock4Img from "./stock4.webp";
import stock5Img from "./stock5.webp";
import stock6Img from "./stock6.webp";

// Мебель
import stockFurniture1Img from "./stock-furniture1.webp";
import stockFurniture2Img from "./stock-furniture2.webp";
import stockFurniture3Img from "./stock-furniture3.webp";

export const initialStocks: IStock[] = [
  {
    title: "Бесплатная сборка и монтаж мебели в феврале 2025 г.",
    description:
      "",
    rightPhoto: stock1Img,
    button: {
      text: "Применить",
      variant: "transparent",
    },
    variant: "orange",
  },
  {
    title: "Дополнительная скидка 10% новоселам",
    rightPhoto: stock2Img,
    button: {
      text: "Применить",
      variant: "orange",
    },
    variant: "transparent",
  },
  {
    title: "Подарок на выбор к каждой кухне",
    rightPhoto: stock32Img,
    leftPhoto: stock31Img,
    variant: "white",
  },
  // {
  //   title: "Платим 3000₽ за рекомендацию",
  //   rightPhoto: stock4Img,
  //   variant: "transparent",
  //   button: {
  //     text: "Отправить контакты",
  //     variant: "white",
  //   },
  // },
  // {
  //   title: "Рассрочка без процентов на срок до 24 месяцев",
  //   rightPhoto: stock5Img,
  //   button: {
  //     text: "Рассрочка 0%",
  //     variant: "transparent",
  //   },
  // },
  // {
  //   title: "Гарантия самой выгодной цены!",
  //   description:
  //     "Если у вас уже есть просчитанный проект, пришлите его нам, и мы сделаем более выгодное предложение",
  //   rightPhoto: stock6Img,
  //   variant: "white",
  // },
];

export const furnitureStocks: IStock[] = [
  {
    title: "Скидка 15% на корпусную мебель при заказе кухни у нас",
    rightPhoto: stockFurniture1Img,
    button: {
      text: "Заказать звонок",
      variant: "white"
    },
    variant: "dark"
  },
  {
    title: "Дополнительная скидка 5% при заказе от 250 тыс.",
    rightPhoto: stockFurniture2Img,
    button: {
      text: "Заказать звонок",
      variant: "transparent"
    },
    variant: "orange"
  },
  {
    title: "Гарантия самой выгодной цены!",
    description: "Если есть просчет другой компании, пришлите его нам, и мы сделаем более выгодное предложение",
    rightPhoto: stockFurniture3Img,
    variant: "white"
  }
]
