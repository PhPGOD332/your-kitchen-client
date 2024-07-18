import { IStock } from "@/types/IStock";
import stock1Img from "./stock1.webp";
import stock2Img from "./stock2.webp";
import stock31Img from "./stock3.1.webp";
import stock32Img from "./stock3.2.webp";
import stock4Img from "./stock4.webp";
import stock5Img from "./stock5.webp";
import stock6Img from "./stock6.webp";

export const initialStocks: IStock[] = [
  {
    title: "Дарим сборку и монтаж кухни! Минус 10% от стоимости в июле 2024!",
    description:
      "",
    rightPhoto: stock1Img,
    button: {
      text: "Бесплатно",
      variant: "transparent",
    },
    variant: "orange",
  },
  {
    title: "Дополнительная скидка 5% новоселам",
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
  {
    title: "Платим 3000₽ за рекомендацию",
    rightPhoto: stock4Img,
    variant: "transparent",
    button: {
      text: "Отправить контакты",
      variant: "white",
    },
  },
  {
    title: "Рассрочка без процентов на срок до 24 месяцев",
    rightPhoto: stock5Img,
    button: {
      text: "Рассрочка 0%",
      variant: "transparent",
    },
  },
  {
    title: "Гарантия самой выгодной цены!",
    description:
      "Если у вас уже есть просчитанный проект, пришлите его нам, и мы сделаем более выгодное предложение",
    rightPhoto: stock6Img,
    variant: "white",
  },
];
