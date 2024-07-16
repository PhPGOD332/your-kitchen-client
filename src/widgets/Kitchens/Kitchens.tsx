"use client";

import { OrangeButton } from "@/shared/ui";
import { IKitchen } from "@/types/IKitchen";
import { useState } from "react";
import Kitchen from "../Kitchen/Kitchen";
import styles from "./Kitchens.module.scss";

interface KitchensProps {
  kitchens: IKitchen[];
  moreKitchens: IKitchen[];
  threeKitchens?: boolean;
}

const STEP = 6;

const Kitchens = ({ kitchens, moreKitchens, threeKitchens }: KitchensProps) => {
  const [viewKitchens, setViewKitchens] = useState(kitchens);
  const [sliceNumber, setSliceNumber] = useState(9);

  const showMore = () => {
    const newKitchens = moreKitchens.filter((kitchen) => {
      return !viewKitchens.some((item) => item._id === kitchen._id);
    });
    setSliceNumber((prev) => prev + STEP);

    setViewKitchens([...viewKitchens, ...newKitchens.slice(0, STEP)]);
  };

  return (
    <>
      <div className={styles.kitchensPage} id="kitchens">
        <div className={styles.container}>
          <h3 className={styles.title}>
            За <span>12</span> лет фабрика &quot;Твоя кухня&quot; произвела более
            1.5&nbsp;тысяч гарнитуров в&nbsp;Москве
          </h3>
          <p className={styles.subtitle2}>
            Мы воплощаем в жизнь модные дизайнерские решения и необычные идеи.
          </p>
          <p className={styles.subtitle}>
            <span>Выберите свою:</span> от лофта до классики
          </p>
          <div className={styles.kitchens}>
            {viewKitchens.slice(0, sliceNumber).map((kitchen, index) => (
              // <DynamicKitchen kitchen={kitchen} key={index} flex={threeKitchens} />
              <Kitchen kitchen={kitchen} key={index} flex={threeKitchens} />
            ))}
          </div>

          <div className={styles.string}>
            {viewKitchens.length < moreKitchens.length && (
              <OrangeButton onClick={showMore}>Показать еще</OrangeButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Kitchens;
