import React, {FC} from 'react';
import styles from './MeasurementPrepare.module.scss';

const PreparesSection: FC = () => {
  return (
    <section className={`${styles.preparesSection} section`}>
      <div className={`${styles.preparesCard} gridBlock`}>
        <div className={styles.cardContainer}>
          <h3 className={styles.preparesTitle}>
            Чтобы специалист получил максимально точные цифры, подготовьтесь к его визитку:
          </h3>
          <div className={styles.enumPrepares}>
            <div className={styles.prepareItem}>
              <p className={styles.prepareText}>Завершите ремонтные, отделочные работы, если они
                запланированы</p>
            </div>
            <div className={styles.prepareItem}>
              <p className={styles.prepareText}>По возможности уберите старую мебель, коробки и т.д.</p>
            </div>
            <div className={styles.prepareItem}>
              <p className={styles.prepareText}>Обеспечьте мастеру простой доступ к любой точке
                помещения</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparesSection;