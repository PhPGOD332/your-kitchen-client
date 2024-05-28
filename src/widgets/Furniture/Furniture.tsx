"use client";

import { OrangeButton } from "@/shared/ui";
import type { IFurniture } from "@/types/IFurniture";
import FurnitureItem from "@/widgets/FurnitureItem/FurnitureItem";
import { useState } from "react";
import { Modal1 } from "../Modals/Modal1";
import styles from "./Furniture.module.scss";

interface FurnitureProps {
  furniture: IFurniture[];
  title?: string;
}

const NO_FURNITURE_TEXT = "Мебели пока что нет";

export const Furniture = ({ title, furniture }: FurnitureProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal1
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        location="Страница корпусной мебели, перед преимуществами"
        tag="Рассчитать стоимость мебели"
        descriptionText={
          <>
            чтобы <span>рассчитать стоимость мебели</span> по телефону или
            договориться о выезде на замер.
            <br /> Выезд <span>бесплатный</span> и возможен в этот же день
          </>
        }
      />
      <div className={styles.furniturePage}>
        <div className={styles.container}>
          <h3 className={styles.title}>
            {title ? title : "Мебель, которую мы производим для вас"}
          </h3>
          <div className={styles.furnitures}>
            {!furniture.length && (
              <p className={styles.notFoundText}>{NO_FURNITURE_TEXT}</p>
            )}
            {furniture.map((furniture, index) => (
              <FurnitureItem
                key={furniture._id + index}
                furniture={furniture}
              />
            ))}
          </div>
          <OrangeButton
            center
            onClick={() => {
              setIsOpen(true);
              document.body.classList.add("overflow");
            }}
          >
            Расчитать стоимость
          </OrangeButton>
        </div>
      </div>
    </>
  );
};
