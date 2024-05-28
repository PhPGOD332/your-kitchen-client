'use client'
import React, {FC, useRef, useState} from 'react';
import styles from './MeasurementHelloScreen.module.scss';
import { LeaveRequestMini } from "@/widgets/LeaveRequestMini/LeaveRequestMini";
import { OrangeButton } from "@/shared/ui";
import { ModalMini } from "@/widgets/Modals/ModalMini";

const MeasurementHelloScreen: FC = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = () => {
    setModalVisible(true);
    document.body.classList.add('overflow');
  }

  return (
    <>
      <ModalMini
        tag="Заказать обратный звонок"
        location="Страница контактов"
        title="Заказать бесплатный выезд замерщика"
        type="measuring"
        setIsOpen={setModalVisible}
        isOpen={modalVisible}
        buttonText="Заказать"
      />
      <section className={`${styles.startScreen} section`}>
        <div className={styles.bgMask}></div>
        <div className={styles.container}>
          <div className={styles.prosBlock}>
            <span className={styles.prosItem}>Бесплатно</span>
            <span className={styles.prosItem}>День в день</span>
            <span className={styles.prosItem}>Дизайн и визуализация</span>
          </div>
          <h1 className={`${styles.startTitle} titleNotoFont`}>
            Выезд специалиста <br/> для замера и создания проекта <span className={styles.mobileStartTitle}>кухни и корпусной мебели</span>
          </h1>
          <p className={styles.startText}>
            Бесплатный выезд дизайнера замерщика кухни и корпусной мебели.
            Специалист порекомендует эргономичные решения, соответствующие <span
            className={styles.desktopStartText}>планировке
                    помещения, поможет с выбором материалов и цветов, проведет замер помещения и
                    подготовит проект.</span>
            <span className={styles.mobileStartText}> характеристикам помещения</span>
          </p>
          <OrangeButton className={`${styles.startButton} OrangeButton_button`} onClick={() => openModal()}>Оформить выезд</OrangeButton>
        </div>
      </section>
    </>
  );
};

export default MeasurementHelloScreen;