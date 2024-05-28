"use client";

import { SITE_NAME } from "@/shared/constants";
import "@/shared/styles/swiper-my.css";
import { IFurniture } from "@/types/IFurniture";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./FurnitureItem.module.scss";

interface FurnitureItemProps {
  furniture: IFurniture;
}

const FurnitureItem = ({ furniture }: FurnitureItemProps) => {
  return (
    <>
      <div
        className={styles.furniture}
        itemScope
        itemType="https://schema.org/Product"
      >
        <Swiper
          className={styles.swiper}
          navigation={true}
          pagination={{
            enabled: true,
            clickable: true,
            horizontalClass: "furniture-pagination",
          }}
          loop={true}
          modules={[Navigation, Pagination]}
        >
          {furniture.photos.map((photo, index) => (
            <SwiperSlide key={index} className={styles.image}>
              <Image
                src={photo || ""}
                className={styles.img}
                draggable={false}
                alt={`${furniture.name}` || ""}
                width={461}
                height={500}
                itemProp="image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.content}>
          <div
            className={styles.betweenWrapper}
            itemProp="brand"
            content={SITE_NAME}
          >
            <p className={styles.name} itemProp="name">
              {furniture.name}
            </p>
            <p
              className={styles.price}
              itemProp="offers"
              itemType="https://schema.org/AggregateOffer"
              itemScope
            >
              <meta itemProp="lowPrice" content={furniture.price.toString()} />
              <meta itemProp="price" content={furniture.price.toString()} />
              <span>От </span>
              {furniture.price.toLocaleString("ru")}
              <span
                className={styles.littlePrice}
                itemProp="priceCurrency"
                content="RUB"
              >
                ₽
              </span>
            </p>
          </div>
          <p className={styles.description} itemProp="description">
            {furniture.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default FurnitureItem;
