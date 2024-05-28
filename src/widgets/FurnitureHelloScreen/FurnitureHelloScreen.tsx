"use client";

import bgImage from "@/data/images/bg_mebel.jpg";
import { OrangeButton } from "@/shared/ui";
import Image from "next/image";
import { useState } from "react";
import { Modal1 } from "../Modals/Modal1";
import styles from "./FurnitureHelloScreen.module.scss";

interface Props {
  isBold?: boolean;
}

export const FurnitureHelloScreen = ({ isBold }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal1
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        location="Страница корпусной мебели, первый блок"
        tag="Рассчитать стоимость мебели"
        descriptionText={
          <>
            чтобы <span>рассчитать стоимость мебели</span> по телефону или
            договориться о выезде на замер.
            <br /> Выезд <span>бесплатный</span> и возможен в этот же день
          </>
        }
      />
      <div className={styles.helloScreen}>
        <Image
          src={bgImage}
          className={styles.bgImage}
          alt="Фон"
          draggable={false}
          priority
          quality={100}
        />
        <div className={styles.container}>
          <div className={styles.tags}>
            <p className={styles.tag}>Доставка</p>
            <div className={styles.circle}></div>
            <p className={styles.tag}>Сборка</p>
            <div className={styles.circle}></div>
            <p className={styles.tag}>Гарантия</p>
          </div>
          <h1 className={`${styles.title} ${isBold && styles.boldTitle}`}>
            Корпусная мебель <br /> на заказ от производителя
          </h1>
          <p className={`${styles.subtitle} ${isBold && styles.boldSubtitle}`}>
            Производство высококачественной мебели по индивидуальным заказам и
            размерам в Москве и Московской Области.
            <br />
            Наша фабрика изготавливает корпусную и встроенную мебель, такую как
            распашные шкафы, угловые и шкафы купе, а также прихожие, комоды,
            тумбы, мебельные гарнитуры для кухни и многое другое.
          </p>

          <OrangeButton
            className={styles.button}
            onClick={() => {
              setIsOpen(true);
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
