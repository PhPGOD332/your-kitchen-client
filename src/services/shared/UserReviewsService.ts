import { IReview } from "@/types/IReview";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Сервис для клиентских get запросов
// ISR Next
export class UserReviewsService {

  static async getMainReviews(): Promise<IReview[]> {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/reviews-main`, {
      method: 'GET',
      next: {
        revalidate: 30,
      },
    });
    const jsonReviews: IReview[] = await response.json();

    const returnReviews: IReview[] = [...jsonReviews];

    const reviewsWithPhotos: IReview[] = returnReviews.map((review) => {
      const reviewPhotos = review.photos.map((file) => {
        return `${NEXT_PUBLIC_API_URL}/images/${file}`;
      });

      if(review.photo){
        review.photo = `${NEXT_PUBLIC_API_URL}/images/${review.photo}`;
      }

      review.photos = reviewPhotos;

      return review;
    });

    return reviewsWithPhotos;
  }

  static async getReviews (): Promise<IReview[]> {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/reviews`, {
      method: 'GET',
      next: {
        revalidate: 30,
      },
    });

    const jsonReviews: IReview[] = await response.json();

    const returnReviews = [...jsonReviews];
    const reviewsWithPhotos: IReview[] = returnReviews.map((review) => {
      const reviewPhotos = review.photos.map((file) => {
        return `${NEXT_PUBLIC_API_URL}/images/${file}`;
      });
      if(review.photo){
        review.photo = `${NEXT_PUBLIC_API_URL}/images/${review.photo}`;
      }
      
      review.photos = reviewPhotos;
      return review;
    })

    return reviewsWithPhotos;
  };
}