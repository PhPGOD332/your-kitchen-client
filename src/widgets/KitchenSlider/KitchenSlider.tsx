"use client";

import Image from "next/image";
import { useState } from "react";
import typeSwiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./KitchenSlider.module.scss";

interface Props {
  photos: string[];
}

export const KitchenSlider = ({ photos }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<typeSwiper | null>(null);
  const handleThumbs = (swiper: typeSwiper) => setThumbsSwiper(swiper);
  const [swiper, setSwiper] = useState<typeSwiper | null>(null);

  return (
    <div className={styles.swiper}>
      <Swiper
        onInit={(swiper) => setSwiper(swiper)}
        className={styles.slider}
        modules={[Navigation, Pagination, Thumbs]}
        loop
        allowTouchMove={
          typeof window !== "undefined" && window.innerWidth < 768
        }
        navigation={{
          enabled: true,
          prevEl: styles.prevButton,
          nextEl: styles.nextButton,
        }}
        thumbs={{
          slideThumbActiveClass: styles.activeThumb,
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        pagination={{
          horizontalClass: styles.horizontal,
          enabled: true,
          bulletElement: "button",
          bulletClass: styles.bullet,
          bulletActiveClass: styles.bulletActive,
          clickable: true,
        }}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index} className={styles.sliderSlide}>
            <Image
              src={photo}
              width={850}
              height={600}
              alt={`Кухня ${index + 1}`}
              className={styles.sliderImage}
            />
          </SwiperSlide>
        ))}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              className={styles.prevButton}
            ></button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              className={styles.nextButton}
            ></button>
          </>
        )}
      </Swiper>
      <Swiper
        modules={[Thumbs, Navigation]}
        onSwiper={handleThumbs}
        className={styles.thumbsSlider}
        direction={
          typeof window !== "undefined" && window.innerWidth > 768
            ? "vertical"
            : "horizontal"
        }
        watchSlidesProgress
        spaceBetween={10}
        slidesPerView={
          typeof window !== "undefined" && window.innerWidth > 768
            ? 5.5
            : "auto"
        }
        allowTouchMove
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index} className={styles.thumbsSlide}>
            <Image
              src={photo}
              width={100}
              height={100}
              itemType="image"
              alt={`Кухня ${index + 1}`}
              className={styles.thumbsImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
