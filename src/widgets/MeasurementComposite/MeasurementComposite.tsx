import React, {FC} from 'react';
import styles from "./MeasurementComposite.module.scss";
import MeasurementAdvantages from "@/widgets/MeasurementAdvantages/MeasurementAdvantages";
import MeasurementAdditional from "@/widgets/MeasurementAdditional/MeasurementAdditional";
import Image from "next/image";
import bg from "@/data/images/bg_advantages.jpg";


const MeasurementComposite: FC = () => {
  return (
    <div className={styles.compositeContainer}>
      <div className={styles.compositeBgBlock}>
        <div className={styles.maskImg}></div>
        <Image
          src={bg}
          alt="Фон"
          width={1440}
          height={1026}
          className={styles.compositeBgImg}
        />
      </div>

      <MeasurementAdvantages/>
      <MeasurementAdditional/>
    </div>
  );
};

export default MeasurementComposite;