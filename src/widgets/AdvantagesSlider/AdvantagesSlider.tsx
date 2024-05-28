import React from "react";
import { Pagination } from "swiper/modules";
import styles from "./AdvantagesSlider.module.scss";
import { Swiper as SwiperComp, SwiperSlide } from "swiper/react";
import { Icons } from "@/shared/IconsComponents/Icons";

const AdvantagesSlider = () => {
  return (
    <SwiperComp
      modules={[Pagination]}
      slidesPerView={"auto"}
      spaceBetween={20}
      className={`${styles.advantagesContainer} ${styles.advantagesSlider} gridBlock swiper advantages-slider`}
      wrapperClass={`${styles.advantagesBlock} swiper-wrapper`}
      pagination={{
        type: "bullets",
        clickable: true,
        bulletClass: `swiper-pagination-bullet ${styles.swiperPaginationBullet}`,
        bulletActiveClass: `swiper-pagination-bullet-active ${styles.swiperPaginationBulletActive}`
      }}
      centeredSlides={true}
    >
      <SwiperSlide className={`${styles.advantagesItem} swiper-slide`}>
        <div>
          <div className={styles.advantageIconBlock}>
            <Icons.pensilRuler />
          </div>
          <h3 className={styles.advantageTitle}>Визит замерщика
            в любой удобный для Вас день</h3>
          <p className={styles.advantageText}>Наши специалисты работают даже
            по выходным, решить вопрос с заказом понравившейся
            мебели можете в любой удобный для Вас день.
            Сотрудники компании ценят время клиента, поэтому
            пунктуальны.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className={`${styles.advantagesItem} swiper-slide`}>
        <div>
          <div className={styles.advantageIconBlock}>
            <Icons.documentCheck />
          </div>
          <h3 className={styles.advantageTitle}>Заказать дизайн проект кухни бесплатно</h3>
          <p className={styles.advantageText}>При визите специалиста в пределах МКАДа и до 15 км
            за ним, его услуги будут безвозмездными, даже если вы откажетесь от изготовления
            гарнитура. В населенные пункты ближайших к Москве областей специалист выезжает по
            договоренности, в среднем 40 руб. за км от МКАДа.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className={`${styles.advantagesItem} swiper-slide`}>
        <div>
          <div className={styles.advantageIconBlock}>
            <Icons.sample/>
          </div>
          <h3 className={styles.advantageTitle}>Образцы всегда с собой</h3>
          <p className={styles.advantageText}>При вызове замерщика кухни к вам приезжает наш
            мини-офис с большим выбором образцов (фасады, столешницы, материалы). Это дает
            возможность оценить качество, реальный оттенок будущей мебели. А по каталогам вы
            получаете доступ к примерам дизайна, моделям фурнитуры.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className={`${styles.advantagesItem} swiper-slide`}>
        <div>
          <div className={styles.advantageIconBlock}>
            <Icons.handshake/>
          </div>
          <h3 className={styles.advantageTitle}>Согласование за один день</h3>
          <p className={styles.advantageText}>Сотрудники компании «Твоя кухня» имеют полномочия
            на заключение договора и принятие предоплаты. Вы можете заказать проект кухни
            бесплатно, и, если он вас устроит, оформить заявку на изготовление гарнитура.
            После согласования деталей мебель поступит в производство.</p>
        </div>
      </SwiperSlide>
      <div className={`${styles.swiperPagination} swiper-pagination`}></div>
    </SwiperComp>
  );
};

export default AdvantagesSlider;