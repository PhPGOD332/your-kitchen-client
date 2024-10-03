import { SITE_NAME, pagesData } from "@/shared/constants";
import { Metadata } from "next";
import ReviewsInColumn from "@/widgets/ReviewsInColumn/ReviewsInColumn";
import { UserReviewsService } from "@/services/shared/UserReviewsService";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
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
import { PhotoSlider } from "@/widgets/PhotoSlider/PhotoSlider";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.reviews.url),
  title: pagesData.reviews.title,
  description: pagesData.reviews.description,
  keywords: pagesData.reviews.keywords,
  openGraph: {
    type: pagesData.reviews.type,
    title: pagesData.reviews.title,
    url: pagesData.reviews.url,
    description: pagesData.reviews.description,
    siteName: SITE_NAME,
  },
  alternates: {
    canonical: pagesData.thankyou.url,
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

const getReviewsInfo = async () =>  {
  const reviews = await UserReviewsService.getMainReviews();
  const moreReviews = await UserReviewsService.getReviews()

  return { reviews, moreReviews };
}

const ReviewsPage = async () => {
  const {reviews, moreReviews} = await getReviewsInfo();

  return (
    <>
      <ReviewsInColumn reviews={reviews} moreReviews={moreReviews}/>
      <PhotoSlider
        title={"Наше производство и технологии"}
        photos={initialImagesSlider}
        onlyVideo={true}
        previewVideo={previewVideoSlider.src}
        withoutLowerText={true}
        firstVideoBlock={true}
        bgColor='#262324'
        wide={true}
        withoutYouCan={true}
      />
      <LeaveRequestBlock
        location='Главная страница, после "Давайте подытожим"'
        tag="Рассчитать стоимость кухни"
      />
    </>
  );
};

export default ReviewsPage;
