"use client";

import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./OurTeam.module.scss";

import "@/shared/styles/swiper-my.css";
import { IWorker } from "@/types/IWorker";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/scss/pagination";

import Worker from "../Worker/Worker";

interface OurTeamProps {
  team: IWorker[];
}

const OurTeam = ({ team }: OurTeamProps) => {
  return (
    <div className={styles.ourTeamPage}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>
            Наша команда специалистов с опытом от <span>5</span> лет
          </h3>
        </div>
        <p className={styles.bgText}>
          Твоя <br /> кухня
        </p>
        {team && team.length > 0 && (
          <Swiper
            className={`${styles.slider} workersSlider`}
            slidesPerView={2.8}
            initialSlide={2}
            speed={500}
            spaceBetween={50}
            centeredSlides
            loop
            effect="coverflow"
            navigation={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              modifier: 1,
              slideShadows: false,
              scale: 0.9,
            }}
            breakpoints={{
              900: {
                slidesPerView: 2.8,
              },
              200: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
            }}
            modules={[EffectCoverflow, Navigation]}
          >
            {team.map((worker) => (
              <SwiperSlide
                className={`${styles.worker} workerSlide`}
                key={worker._id}
              >
                <Worker worker={worker} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {!team ||
          (team.length === 0 && (
            <p className={styles.error}>Ошибка получения команды</p>
          ))}
      </div>
    </div>
  );
};

export default OurTeam;
