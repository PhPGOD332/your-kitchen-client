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
    type: "website",
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

import styles from "@/pages/FurniturePage.module.scss";
import { UserKitchenService } from "@/services/shared/UserKitchenService";
import { UserReviewsService } from "@/services/shared/UserReviewsService";
import { LeaveRequestBlock2 } from "@/shared/LeaveRequestBlock2";
import AllVariants from "@/widgets/AllVariants/AllVariants";
import { DiscountsHelloScreenSlider } from "@/widgets/ChoiseHelloScreen/DiscountsHelloScreenSlider";
import { KitchensHelloScreen } from "@/widgets/ChoiseHelloScreen/KitchensHelloScreen";
import { Correction } from "@/widgets/Correction/Correction";
import Kitchens from "@/widgets/Kitchens/Kitchens";
import { LeaveRequestDesigner } from "@/widgets/LeaveRequestDesigner/LeaveRequestDesigner";
import MainArticles from "@/widgets/MainArticles/MainArticles";
import Results from "@/widgets/Results/Results";
import dynamic from "next/dynamic";
// import Reviews from "@/widgets/Reviews/Reviews";
import { MainAdvantages } from "@/widgets/MainAdvantages/MainAdvantages";
import { Stocks } from "@/widgets/Stocks/Stocks";
import WhatsNext from "@/widgets/WhatsNext/WhatsNext";
import { PhotoSlider } from "@/widgets/PhotoSlider/PhotoSlider";
import img1 from "@/data/images/contacts-slider/MAIN (1).webp";
import img2 from "@/data/images/contacts-slider/MAIN (2).webp";
import img3 from "@/data/images/contacts-slider/MAIN (3).webp";
import img4 from "@/data/images/contacts-slider/MAIN (4).webp";
import img5 from "@/data/images/contacts-slider/MAIN (5).webp";
import img6 from "@/data/images/contacts-slider/MAIN (6).webp";
import img7 from "@/data/images/contacts-slider/MAIN (7).webp";
import img8 from "@/data/images/contacts-slider/MAIN (8).webp";
import img9 from "@/data/images/contacts-slider/MAIN (9).webp";
import img10 from "@/data/images/contacts-slider/MAIN (10).webp";
import previewVideoSlider from "@/data/images/video-preview1.jpg";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";

export const revalidate = 30;

const getHomeInfo = async () => {
  const kitchens = await UserKitchenService.getMainKitchens();
  const reviews = await UserReviewsService.getMainReviews();
  const moreKitchens = await UserKitchenService.getKitchens();

  return { kitchens, reviews, moreKitchens };
};

const DynamicReviews = dynamic(() => import("@/widgets/Reviews/Reviews"), {
  loading: () => <p className={styles.loading}>Загрузка отзывов...</p>,
});

const initialImagesSlider = [
  img1.src,
  img2.src,
  img3.src,
  img4.src,
  img5.src,
  img6.src,
  img7.src,
  img8.src,
  img9.src,
  img10.src,
];

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
        <PhotoSlider
          title={"Наше производство и технологии"}
          photos={initialImagesSlider}
          onlyVideo={true}
          previewVideo={previewVideoSlider.src}
          withoutLowerText={true}
          firstVideoBlock={true}
          bgColor='linear-gradient(180deg, #322d29 0%, #322d29 35.47%, #35302c 78.81%, #2d2928 137.57%)'
          wide={true}
          withoutYouCan={true}
        />
        <div className={styles.darkBg}>
          <LeaveRequestDesigner
            location="Главная страница"
            tag="Выезд дизайнера"
          />
        </div>
        <MainAdvantages />
        {/* <SecondScreen /> */}
        <Correction card1Hide={true} card2Hide={true} card3Hide={true} titleView={false}/>
        <AllVariants />
        <WhatsNext />
        <Results />
        <DiscountsHelloScreenSlider centerText miniHeight />
        {/*<LeaveRequestBlock*/}
        {/*  location='Главная страница, после "Давайте подытожим"'*/}
        {/*  tag="Рассчитать стоимость кухни"*/}
        {/*/>*/}
        <DynamicReviews reviews={reviews} />
        {/*<Reviews reviews={reviews} />*/}
        <MainArticles />
        <LeaveRequestBlock
          location="Главная страница, последняя форма"
          tag="Рассчитать стоимость кухни"
          // before={{
          //   title: "Вы в поисках где купить кухню?",
          //   subtitle:
          //     "Мы изготавливаем современные стильные кухни по индивидуальным размерам, как дорогие, так и недорогие проекты, эноном, премиум, а также элитные. Рассчитать стоимость, узнать цены и получить скидку вы можете, отправив заявку через наш сайт.",
          // }}
        />
        {/*<LeaveRequestBlock2*/}
        {/*  location="Главная страница, последняя форма"*/}
        {/*  tag="Рассчитать стоимость кухни"*/}
        {/*  before={{*/}
        {/*    title: "Вы в поисках где купить кухню?",*/}
        {/*    subtitle:*/}
        {/*      "Мы изготавливаем современные стильные кухни по индивидуальным размерам, как дорогие, так и недорогие проекты, эноном, премиум, а также элитные. Рассчитать стоимость, узнать цены и получить скидку вы можете, отправив заявку через наш сайт.",*/}
        {/*  }}*/}
        {/*/>*/}
      </div>
    </>
  );
};

export default HomePage;
