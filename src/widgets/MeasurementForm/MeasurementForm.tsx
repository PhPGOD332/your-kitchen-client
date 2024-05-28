import React from 'react';
import styles from './MeasurementForm.module.scss';
import { LeaveRequestMini } from "@/widgets/LeaveRequestMini/LeaveRequestMini";
const MeasurementForm = () => {
  return (
    <section className={styles.formSection} id="formSection">
      <div className={styles.formContainer}>
        <LeaveRequestMini
          tag="Заказать обратный звонок"
          location="Страница контактов"
          title="Заказать бесплатный выезд замерщика"
          button={{
            text: "Заказать",
            arrow: "right",
          }}
          type="measuring"
        />
      </div>
    </section>
  );
};

export default MeasurementForm;