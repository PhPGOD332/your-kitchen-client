"use client";

import bgImage from "@/data/images/bg.webp";
import { Icons } from "@/shared/IconsComponents/Icons";
import { OrangeButton } from "@/shared/ui";
import Image from "next/image";
import { useState } from "react";
import { Modal1 } from "../Modals/Modal1";
import styles from "./HelloScreen.module.scss";

const HelloScreen = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Modal1 isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      <div className={styles.helloScreen}>
        <Image
          src={bgImage}
          className={styles.bgImage}
          alt="Фон"
          draggable={false}
        />
        <div className={styles.container}>
          <h1 className={styles.title}>
            Кухни на заказ в Москве напрямую с фабрики с гарантией 10 лет
          </h1>
          <div className={styles.subtitle}>
            <Icons.ruble className={styles.subtitleIcon} />
            <p className={styles.subtitleText}>
              <span>рассрочка</span> до 24 месяцев
            </p>
          </div>
          <div className={styles.subtitle}>
            <Icons.diamond className={styles.subtitleIcon} />
            <p className={styles.subtitleText}>
              производство <span>от 10 дней</span>
            </p>
          </div>
          <div className={styles.subtitle}>
            <Icons.shesternya className={styles.subtitleIcon} />
            <p className={styles.subtitleText}>
              <span>бесплатный</span> дизайн проект
            </p>
          </div>
          <OrangeButton
            className={styles.orangeButton}
            onClick={() => {
              setIsOpenModal(true);
              document.body.classList.add("overflow");
            }}
          >
            Рассчитать стоимость
          </OrangeButton>
        </div>
      </div>
    </>
  );
};

export default HelloScreen;
