'use client'
import React, {FC} from 'react';
import styles from './MeasurementAdvantages.module.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import AdvantagesSlider from "@/widgets/AdvantagesSlider/AdvantagesSlider";
import { Icons } from "@/shared/IconsComponents/Icons";

const MeasurementAdvantages: FC = () => {
  return (
    <section className={`${styles.advantagesSection} section`}>
      <h2 className={`${styles.advantagesTitle} titleNotoFont`}>
        Преимущества вызова замерщика от фабрики «Твоя кухня»
      </h2>
      <div className={`${styles.advantagesContainer} gridBlock`}>
        <div className={`${styles.advantagesBlock}`}>
          <div className={`${styles.advantagesItem}`}>
            <div className={styles.advantageIconBlock}>
              <Icons.pensilRuler/>
            </div>
            <h3 className={styles.advantageTitle}>Визит замерщика
              в любой удобный для Вас день</h3>
            <p className={styles.advantageText}>Наши специалисты работают даже
              по выходным, решить вопрос с заказом понравившейся
              мебели можете в любой удобный для Вас день.
              Сотрудники компании ценят время клиента, поэтому
              пунктуальны.</p>
          </div>
          <div className={`${styles.advantagesItem} swiper-slide`}>
            <div className={styles.advantageIconBlock}>
              <Icons.documentCheck/>
            </div>
            <h3 className={styles.advantageTitle}>Заказать дизайн проект кухни бесплатно</h3>
            <p className={styles.advantageText}>При визите специалиста в пределах МКАДа и до 15 км
              за ним, его услуги будут безвозмездными, даже если вы откажетесь от изготовления
              гарнитура. В населенные пункты ближайших к Москве областей специалист выезжает по
              договоренности, в среднем 40 руб. за км от МКАДа.</p>
          </div>
          <div className={`${styles.advantagesItem} swiper-slide`}>
            <div className={styles.advantageIconBlock}>
              <Icons.sample/>
            </div>
            <h3 className={styles.advantageTitle}>Образцы всегда с собой</h3>
            <p className={styles.advantageText}>При вызове замерщика кухни к вам приезжает наш
              мини-офис с большим выбором образцов (фасады, столешницы, материалы). Это дает
              возможность оценить качество, реальный оттенок будущей мебели. А по каталогам вы
              получаете доступ к примерам дизайна, моделям фурнитуры.</p>
          </div>
          <div className={`${styles.advantagesItem} swiper-slide`}>
            <div className={styles.advantageIconBlock}>
              <Icons.handshake/>
            </div>
            <h3 className={styles.advantageTitle}>Согласование за один день</h3>
            <p className={styles.advantageText}>Сотрудники компании «Твоя кухня» имеют полномочия
              на заключение договора и принятие предоплаты. Вы можете заказать проект кухни
              бесплатно, и, если он вас устроит, оформить заявку на изготовление гарнитура.
              После согласования деталей мебель поступит в производство.</p>
          </div>
        </div>

      </div>
      <AdvantagesSlider />
    </section>
  );
};

export default MeasurementAdvantages;