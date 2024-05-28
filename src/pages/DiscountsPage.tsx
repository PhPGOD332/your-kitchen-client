import bgImage from "@/data/images/bg_discouts.jpg";
import type { IDiscount } from "@/types/IDiscount";
import { CenterHelloScreen } from "@/widgets/CenterHelloScreen/CenterHelloScreen";
import { Discounts } from "@/widgets/Discounts/Discounts";
import { LeaveRequestMini } from "@/widgets/LeaveRequestMini/LeaveRequestMini";
import MainArticles from "@/widgets/MainArticles/MainArticles";
import styles from "./FurniturePage.module.scss";

export const revalidate = 30;

interface DiscountsPageProps {
  discounts: IDiscount[];
}

const DiscountsPage = ({ discounts }: DiscountsPageProps) => {
  return (
    <div className={styles.bg}>
      <CenterHelloScreen
        miniHeight
        title="Скидки, акции и подарки"
        subtitle="Актуальный каталог акций и скидок на кухни и корпусную мебель в Москве. Выгодное предложения на покупку кухонного гарнитура или другой мебели на заказ."
        bg={bgImage}
      />
      {discounts && <Discounts discounts={discounts} />}
      <LeaveRequestMini
        tag="Узнать про акции"
        location="Страница акций"
        title="Узнать подробнее по текущим акциям"
        button={{
          text: "Узнать подробнее",
          arrow: "right",
        }}
        type="promotion"
        before={{
          title: "Вы в поисках где купить кухню по акции?",
          subtitle:
            "Мы изготавливаем современные стильные кухни по индивидуальным размерам, как дорогие, так и недорогие проекты, в Москве и МО. Рассчитать стоимость, узнать цены и получить скидку вы можете, отправив заявку через наш сайт.",
        }}
      />
      <MainArticles withoutBg />
    </div>
  );
};

export default DiscountsPage;
