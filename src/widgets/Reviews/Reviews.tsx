"use client";

import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Reviews.module.scss";

import { Icons } from "@/shared/IconsComponents/Icons";
import "@/shared/styles/swiper-my.css";
import type { IReview } from "@/types/IReview";
import "swiper/css";
import "swiper/css/scrollbar";
import Review from "./Review";
import { OrangeButton } from "@/shared/ui";

interface ReviewsProps {
  withoutBg?: boolean;
  reviews: IReview[];
}

const Reviews = ({ withoutBg, reviews }: ReviewsProps) => {
  return (
    <div
      className={withoutBg ? styles.reviewsPageWithoutBg : styles.reviewsPage}
      id="reviews"
    >
      <p className={styles.bgText}>Отзывы</p>
      <div className={styles.container}>
        <h3 className={styles.title}>
          <span>1200+</span> довольных клиентов
        </h3>
      </div>
      <div className={styles.secondContainer}>
        {reviews && reviews.length !== 0 && (
          <Swiper
            className={styles.slider}
            slidesPerView={1.6}
            spaceBetween={50}
            itemScope
            speed={500}
            itemType="https://schema.org/reviews"
            breakpoints={{
              1400: {
                slidesPerView: 1.6,
                spaceBetween: 50,
              },
              1200: {
                slidesPerView: 1.4,
                spaceBetween: 50,
              },
              300: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
            }}
            centeredSlides={true}
            scrollbar={{
              enabled: true,
              draggable: true,
              dragSize: 36,
              dragClass: "my-scrollbar",
            }}
            modules={[Scrollbar]}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <Review review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {!reviews ||
          (reviews.length === 0 && (
            <p className={styles.errorText}>Отзывов нет</p>
          ))}
      </div>
      {reviews && reviews.length !== 0 && (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <Icons.touch className={styles.icon} />
            <p className={styles.text}>
              Двигайте ползунок, чтобы посмотреть следующий отзыв
            </p>
          </div>
          <div className={styles.string}>
            <OrangeButton href='/reviews'>Показать еще</OrangeButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
