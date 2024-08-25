'use client'
import React, { useState } from "react";
import Review from "@/widgets/Reviews/Review";
import styles from "./ReviewsInColumn.module.scss";
import { OrangeButton } from "@/shared/ui";
import { IReview } from "@/types";
import WidgetsList from "@/widgets/WidgetsList/WidgetsList";

interface ReviewsProps {
  reviews: IReview[];
  moreReviews: IReview[];
  threeReviews?: boolean;
}

const STEP = 3;

const ReviewsInColumn = (
  {
    reviews,
    moreReviews
  }: ReviewsProps) => {

  const [sliceNumber, setSliceNumber] = useState(3);
  const [viewReviews, setViewReviews] = useState(reviews);

  const showMore = () => {
    const newReviews = moreReviews.filter((review) => {
      return !viewReviews.some((item) => item._id === review._id);
    });
    setSliceNumber((prev) => prev + STEP);

    setViewReviews([...viewReviews, ...newReviews.slice(0, STEP)]);
  }

  return (
    <div className={styles.reviewsContainer}>
      <h1 className={styles.title}><span>Отзывы</span> клиентов фабрики &quot;Твоя кухня&quot;</h1>
      <p className={styles.subtitle}>Реальные отзывы клиентов о компании, сотрудниках, процессе взаимодействия. качестве материалов</p>
      <WidgetsList />
      <div className={styles.reviewsList}>
        <p className={styles.bgText}>Отзывы</p>
        {
          viewReviews.slice(0, sliceNumber).map((review, index) => (
            <Review review={review} key={index} />
          ))
        }
      </div>
      <div className={styles.string}>
      {viewReviews.length < moreReviews.length && (
          <OrangeButton onClick={showMore} arrow="down">Показать еще</OrangeButton>
        )}
      </div>
    </div>

  );
};

export default ReviewsInColumn;