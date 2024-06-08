import { SITE_NAME, pagesData } from "@/shared/constants";
import { Metadata } from "next";
import ReviewsInColumn from "@/widgets/ReviewsInColumn/ReviewsInColumn";
import { UserReviewsService } from "@/services/shared/UserReviewsService";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";

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
      <LeaveRequestBlock
        location='Главная страница, после "Давайте подытожим"'
        tag="Рассчитать стоимость кухни"
      />
    </>
  );
};

export default ReviewsPage;
