"use client";

import img1_1 from "@/data/images/measurer-slider-1/photo1_1.webp";
import img1_2 from "@/data/images/measurer-slider-1/photo1_2.webp";
import img1_3 from "@/data/images/measurer-slider-1/photo1_3.webp";
import img1_4 from "@/data/images/measurer-slider-1/photo1_4.webp";
import img1_5 from "@/data/images/measurer-slider-1/photo1_5.webp";
import img1_6 from "@/data/images/measurer-slider-1/photo1_6.webp";
import React, { useState } from "react";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import "@/widgets/DoubleSlider/DoubleSlider.scss";
import { Swiper as SwiperComp, SwiperSlide } from "swiper/react";
import { Controller, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper } from "swiper";
import Image from "next/image";

const initialImagesFirst = [
  img1_1.src,
  img1_2.src,
  img1_3.src,
  img1_4.src,
  img1_5.src,
  img1_6.src,
];

interface Props {
  photos?: string[];
  title?: string;
}

const DoubleSlider = (
  {
    photos,
    title
  }: Props
) => {
  const [firstSwiper, setFirstSwiper] = useState<Swiper | null>(null)
  const [secondSwiper, setSecondSwiper] = useState<Swiper | null>(null)

  return (
    <div className="slider">
      <SwiperComp
        loop={true}
        modules={[Controller, Navigation, Pagination, Thumbs]}
        slidesPerView={1}
        spaceBetween={10}
        className='measures-slider'
        navigation={{}}
        pagination={{
          type: "bullets",
          clickable: true,
        }}
        thumbs={{
          swiper: secondSwiper
        }}
      >
        {
          initialImagesFirst.map((photo, index) => (
            <SwiperSlide key={index}>
              <Image
                src={photo}
                alt={`${title}` || ""}
                width={1152}
                height={709}
              />
            </SwiperSlide>
          ))
        }
      </SwiperComp>
      <div className="sli                                                                                                                    derWrapper">
        <SwiperComp
          loop={true}
          modules={[Controller, Navigation, Thumbs]}
          onSwiper={setSecondSwiper}
          watchSlidesProgress
          slidesPerView={3}
          spaceBetween={10}
          className='measures-mini-slider'
        >
          {
            initialImagesFirst.map((photo, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <Image
                  src={photo}
                  alt={`${title}` || ""}
                  width={1152}
                  height={709}
                />
              </SwiperSlide>
            ))
          }
        </SwiperComp>
      </div>
    </div>
  );
};

export default DoubleSlider;