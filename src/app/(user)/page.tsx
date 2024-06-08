import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import { SITE_NAME, pagesData } from "@/shared/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.main.url),
  title: pagesData.main.title,
  description: pagesData.main.description,
  keywords: pagesData.main.keywords,
  openGraph: {
    type: pagesData.main.type,
    title: pagesData.main.title,
    url: pagesData.main.url,
    description: pagesData.main.description,
    siteName: SITE_NAME,
    images: [main1.src, main2.src, main3.src, main4.src, main5.src],
  },
  alternates: {
    canonical: pagesData.main.url,
  },
};

import dynamic from "next/dynamic";
import styles from "@/pages/FurniturePage.module.scss";
import { UserKitchenService } from "@/services/shared/UserKitchenService";
import { UserReviewsService } from "@/services/shared/UserReviewsService";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
import { LeaveRequestBlock2 } from "@/shared/LeaveRequestBlock2";
import AllVariants from "@/widgets/AllVariants/AllVariants";
import { DiscountsHelloScreenSlider } from "@/widgets/ChoiseHelloScreen/DiscountsHelloScreenSlider";
import { KitchensHelloScreen } from "@/widgets/ChoiseHelloScreen/KitchensHelloScreen";
import { Correction } from "@/widgets/Correction/Correction";
import Kitchens from "@/widgets/Kitchens/Kitchens";
import { LeaveRequestDesigner } from "@/widgets/LeaveRequestDesigner/LeaveRequestDesigner";
import { MainAdvantages } from "@/widgets/MainAdvantages/MainAdvantages";
import MainArticles from "@/widgets/MainArticles/MainArticles";
import Results from "@/widgets/Results/Results";
// import Reviews from "@/widgets/Reviews/Reviews";
import { Stocks } from "@/widgets/Stocks/Stocks";
import WhatsNext from "@/widgets/WhatsNext/WhatsNext";

export const revalidate = 30;

const getHomeInfo = async () => {
  const kitchens = await UserKitchenService.getMainKitchens();
  const reviews = await UserReviewsService.getMainReviews();
  const moreKitchens = await UserKitchenService.getKitchens();

  return { kitchens, reviews, moreKitchens };
};

const DynamicReviews = dynamic(() => import("@/widgets/Reviews/Reviews"), {
  loading: () => <p className={styles.loading}>Загрузка отзывов...</p>
})

const HomePage = async () => {
  const { kitchens, reviews, moreKitchens } = await getHomeInfo();
  return (
    <>
      <div itemScope itemType="https://schema.org/WebSite">
        <meta itemProp="url" content={pagesData.main.name} />
        <meta itemProp="name" content={SITE_NAME} />
      </div>
      <div className={styles.bg}>
        <KitchensHelloScreen />
        <Stocks location="Главная страница, блок акций" />
        {/*<DynamicKithens*/}
        {/*  kitchens={kitchens}*/}
        {/*  moreKitchens={moreKitchens}*/}
        {/*  threeKitchens*/}
        {/*/>*/}
        <Kitchens
          kitchens={kitchens}
          moreKitchens={moreKitchens}
          threeKitchens
        />
        <div className={styles.darkBg}>
          <LeaveRequestDesigner
            location="Главная страница"
            tag="Выезд дизайнера"
          />
        </div>
        <MainAdvantages />
        {/* <SecondScreen /> */}
        <Correction />
        <AllVariants />
        <WhatsNext />
        <Results />
        <DiscountsHelloScreenSlider centerText miniHeight />
        <LeaveRequestBlock
          location='Главная страница, после "Давайте подытожим"'
          tag="Рассчитать стоимость кухни"
        />
        <DynamicReviews reviews={reviews} />
        {/*<Reviews reviews={reviews} />*/}
        <MainArticles />
        <LeaveRequestBlock2
          location="Главная страница, последняя форма"
          tag="Рассчитать стоимость кухни"
          before={{
            title: "Вы в поисках где купить кухню?",
            subtitle:
              "Мы изготавливаем современные стильные кухни по индивидуальным размерам, как дорогие, так и недорогие проекты, эноном, премиум, а также элитные. Рассчитать стоимость, узнать цены и получить скидку вы можете, отправив заявку через наш сайт.",
          }}
        />
      </div>
    </>
  );
};

export default HomePage;
