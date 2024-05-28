"use client";

import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Reviews.module.scss";

import { Icons } from "@/shared/IconsComponents/Icons";
import "@/shared/styles/swiper-my.css";
import type { IReview } from "@/types/IReview";
import Image from "next/image";
import { useState } from "react";
import typeSwiper from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";

interface ReviewProps {
  review: IReview;
}

const isOpenCard = (state: boolean): string =>
  !state ? styles.personCard : `${styles.personCard} ${styles.open}`;

const isOpenReview = (state: boolean): string =>
  !state ? "Читать весь отзыв" : "Скрыть отзыв";

const Review = ({ review }: ReviewProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<typeSwiper | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleThumbs = (swiper: typeSwiper) => setThumbsSwiper(swiper);
  const handleOpen = () => (!isOpen ? setIsOpen(true) : setIsOpen(false));

  return (
    <>
      {/* Слайдер отзывы */}
      <div
        className={styles.review}
        itemScope
        itemType="https://schema.org/Review"
      >
        {/* Карточка пользователя */}
        <div className={styles.cardWrapper}>
          <div className={isOpenCard(isOpen)}>
            <Icons.quotes className={styles.quotes} />
            <div className={styles.personInfo}>
              {review.photo && (
                <Image
                  src={review.photo}
                  className={styles.personPhoto}
                  alt={`${review.firstName}`}
                  width={68}
                  height={68}
                />
              )}
              <div
                className={styles.personName}
                itemScope
                itemType="https://schema.org/Person"
                itemProp="author"
              >
                <div itemProp="name">
                  <p className={styles.personFirstName}>{review.firstName}</p>
                  <p className={styles.personLastName}>
                    {review.lastName && review.lastName.slice(0, 1)}.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.reviewText} itemProp="reviewBody">
              {review.text}
            </div>
            <div
              itemProp="reviewRating"
              itemScope
              itemType="https://schema.org/Rating"
            >
              <meta itemProp="ratingValue" content="5" />
            </div>
            <button
              type="button"
              onClick={handleOpen}
              className={styles.reviewLink}
            >
              {isOpenReview(isOpen)}
            </button>
          </div>
        </div>

        {/* Слайдер предпросмотр */}
        {thumbsSwiper !== null && (
          <Swiper
            className={styles.reviewSlider}
            modules={[Navigation, Thumbs]}
            allowTouchMove={
              typeof window !== "undefined" && window.innerWidth < 768
            }
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            itemProp="itemReviewed"
            content="Кухня"
          >
            {review.photos.map((photo, index) => (
              <SwiperSlide key={index} className={styles.reviewSlide}>
                <Image
                  src={photo}
                  alt={`Фото ${index + 1}`}
                  itemProp="image"
                  width={550}
                  height={367}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* Слайдер карточки предпросмотра */}
        <Swiper
          modules={[Thumbs]}
          onSwiper={handleThumbs}
          spaceBetween={8}
          slideActiveClass={styles.activeThumb}
          className={styles.previewSlider}
          watchSlidesProgress={true}
          slidesPerView={3}
          breakpoints={{
            800: {
              slidesPerView: 3,
            },
            300: {
              slidesPerView: 2,
            },
          }}
        >
          {review.photos.map((photo, index) => (
            <SwiperSlide className={styles.previewImgWrapper} key={index}>
              <Image
                src={photo}
                className={styles.previewImg}
                alt={`Фото ${index + 1}`}
                width={95}
                height={80}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Review;
