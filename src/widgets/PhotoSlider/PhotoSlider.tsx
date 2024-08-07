"use client";

import img1 from "@/data/images/contacts-slider/MAIN (1).webp";
import img2 from "@/data/images/contacts-slider/MAIN (2).webp";
import img3 from "@/data/images/contacts-slider/MAIN (3).webp";
import img4 from "@/data/images/contacts-slider/XL (1).webp";
import img5 from "@/data/images/contacts-slider/XL (2).webp";
import img6 from "@/data/images/contacts-slider/XL (3).webp";
import img7 from "@/data/images/contacts-slider/XL (4).webp";
import img8 from "@/data/images/contacts-slider/XL (5).webp";
import img9 from "@/data/images/contacts-slider/XL (6).webp";
import img10 from "@/data/images/contacts-slider/XL (7).webp";
import img11 from "@/data/images/contacts-slider/MAIN (7).webp";
import img12 from "@/data/images/contacts-slider/MAIN (8).webp";
import img13 from "@/data/images/contacts-slider/MAIN (9).webp";
import img14 from "@/data/images/contacts-slider/MAIN (10).webp";
import videoPreviewImg from "@/data/images/video-preview1.jpg";
import { Icons } from "@/shared/IconsComponents/Icons";
import "@/shared/styles/swiper-my.css";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ModalVideo } from "../Modals";
import PreviewPhotos from "../PreviewPhotos/PreviewPhotos";
import styles from "./PhotoSlider.module.scss";
import ContactsYouCan from "@/widgets/ContactsYouCan/ContactsYouCan";

const initialImages = [
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
  img11.src,
  img12.src,
  img13.src,
  img14.src,
];

interface Props {
  photos?: string[];
  title?: string;
  subtitle?: string;
  withoutManyText?: boolean;
  onlyVideo?: boolean;
  previewVideo?: string;
  withoutLowerText?: boolean;
  firstVideoBlock?: boolean;
  bgColor?: string;
  wide?: boolean;
  firstOnPage?: boolean;
  withoutYouCan?: boolean;
}

export const PhotoSlider = ({
  photos,
  subtitle,
  title,
  withoutManyText,
  onlyVideo,
  previewVideo,
  withoutLowerText,
  firstVideoBlock,
  bgColor,
  wide,
  firstOnPage,
  withoutYouCan
}: Props) => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [previewPhotos, setPreviewPhotos] = useState(
    photos ? photos : initialImages,
  );

  const openPreview = (index: number) => {
    document.body.classList.add("overflow");
    setIsOpenPreview(true);
  };

  const closePreview = () => {
    document.body.classList.remove("overflow");
    setIsOpenPreview(false);
  };

  return (
    <>
      <ModalVideo
        isOpen={isOpenVideo}
        setIsOpen={setIsOpenVideo}
        videoUrl={
          "https://www.youtube.com/embed/6NvsnUlSqCs?si=ovdG5x7EbD6zdpQG"
        }
        videoType="youtube"
      />
      <PreviewPhotos
        closePreview={closePreview}
        isOpen={isOpenPreview}
        photos={previewPhotos}
      />
      <div className={[styles.photoSlider, firstOnPage ? styles.firstOnPage : ''].join(' ')} style={bgColor ? {background: bgColor} : {}}>
        <div className={[styles.container, wide ? styles.wideContainer : ''].join(' ')}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <Swiper
            style={firstVideoBlock ? {order: 4} : {}}
            className={styles.swiper}
            spaceBetween={30}
            navigation={{
              enabled: true,
            }}
            allowTouchMove={
              typeof window !== "undefined" && window.innerWidth > 768
                ? false
                : true
            }
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              // 1440: {
              //   slidesPerView: 4,
              // },
            }}
            loop={true}
            modules={[Navigation]}
          >
            {previewPhotos.map((photo, index) => (
              <SwiperSlide
                key={index}
                className={styles.slide}
                onClick={() => openPreview(index)}
              >
                <Image
                  src={photo}
                  className={styles.image}
                  draggable={false}
                  alt={`${title}` || ""}
                  width={461}
                  height={500}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {!withoutManyText && (
            <div className={styles.textWithVideo} style={firstVideoBlock ? {order: 3} : {}}>
              {!onlyVideo && <div className={styles.leftText}>
                <h4 className={`${styles.title} ${styles.left}`}>
                  Работаем с&nbsp;1998 года для&nbsp;вас.
                </h4>
                <p className={styles.text}>
                  Мы производим и поставляем кухни на заказ на собственном
                  производстве в Ульяновской области, в розницу для физических
                  лиц и оптом для магазинов и торговых сетей. <br />
                  <br /> Мы убеждены, что скупой платит дважды, поэтому
                  отказались от дешевых материалов и фурнитуры, и изготавливаем
                  кухни, а также корпусную мебель исключительно из проверенных,
                  сертифицированных материалов, всегда стараясь снизить цену для
                  клиентов. <br />
                  <br />{" "}
                  <strong>
                    Смотрите наше видео, где мы показываем работу нашей фабрики
                    “Твоя кухня”.
                  </strong>
                </p>
              </div>
              }
              <div className={onlyVideo ? styles.onlyVideo : styles.rightVideo}>
                <Image
                  src={previewVideo ? previewVideo : videoPreviewImg}
                  alt="Видео"
                  width={1280}
                  height={666}
                  draggable={false}
                  className={styles.videoPreview}
                />
                <button
                  type="button"
                  className={styles.openVideoButton}
                  onClick={() => setIsOpenVideo(true)}
                >
                  <Icons.playButtonWhite className={styles.openButtonIcon} />
                </button>
              </div>
            </div>
          )}
          {
            !withoutYouCan && <ContactsYouCan order={5}/>
          }

          {!withoutLowerText && <p className={styles.lowerText}>
            Закажите обратный звонок чтобы обсудить детали вашего проекта,
            оформить выезд дизайнера для проведения замера помещения под кухню
            или другую корпусную мебель, создать визуализацию и 3D-проект.
          </p>
          }
        </div>
      </div>
    </>
  );
};
