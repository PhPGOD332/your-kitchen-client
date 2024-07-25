import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import { UserWorkerService } from "@/services/shared/UserWorkerService";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
import { SITE_NAME, pagesData } from "@/shared/constants";
import Advantages from "@/widgets/Advantages/Advantages";
import OurTeam from "@/widgets/OurTeam/OurTeam";
import { Metadata } from "next";
import previewVideoSlider from "@/data/images/video-preview1.jpg";
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

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.advantages.url),
  title: pagesData.advantages.title,
  description: pagesData.advantages.description,
  keywords: pagesData.advantages.keywords,
  openGraph: {
    type: pagesData.advantages.type,
    title: pagesData.advantages.title,
    url: pagesData.advantages.url,
    description: pagesData.advantages.description,
    siteName: SITE_NAME,
    images: [main1.src, main2.src, main3.src, main4.src, main5.src],
  },
  alternates: {
    canonical: pagesData.advantages.url,
  },
};

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

export const revalidate = 60;

const getAdvantagesInfo = async () => {
  const workers = await UserWorkerService.getWorkers();

  return { workers };
};

const page = async () => {
  const { workers } = await getAdvantagesInfo();
  return (
    <>
      <PhotoSlider
        title={"Наше производство и технологии"}
        photos={initialImagesSlider}
        onlyVideo={true}
        previewVideo={previewVideoSlider.src}
        withoutLowerText={true}
        firstVideoBlock={true}
        bgColor='#312d2a'
        wide={true}
        firstOnPage={true}
      />
      <Advantages />
      <OurTeam team={workers} />
      <LeaveRequestBlock
        location="Страница преимуществ"
        tag="Рассчитать стоимость кухни"
      />
    </>
  );
};

export default page;
