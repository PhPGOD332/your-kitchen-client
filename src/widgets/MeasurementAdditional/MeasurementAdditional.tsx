import React, {FC} from 'react';
import styles from './MeasurementAdditional.module.scss';

const AdditionalSection: FC = () => {
  return (
    <section className={`${styles.additionalSection} section`}>
      <div className={`${styles.additionalContainer} gridBlock`}>
        <div className={styles.additionalItem}>
          <div className={styles.itemCheckBlock}>
            <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 10L10.3333 19L29 1" stroke="#695D51" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.itemWrapper}>
            <p className={styles.additionalText}>«Твоя кухня» предлагает вызвать замерщика кухни,
              имеющего в своем арсенале цифровой угломер, лазерную рулетку, для быстрого и точного
              определения параметров помещения. Это означает, что готовый гарнитур и другая мебель
              впишется идеально.</p>
          </div>
        </div>
        <div className={styles.additionalItem}>
          <div className={styles.itemCheckBlock}>
            <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 10L10.3333 19L29 1" stroke="#695D51" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.itemWrapper}>
            <p className={styles.additionalText}>Дополнительно дизайнер учтет подоконники, иные
              выступы, точки подключения бытовой техники (электричество, вода, газ, вентиляция),
              актуальные требования безопасности. Замерщик кухни нарисует предварительный эскиз,
              обсудит с клиентом персональные пожелания, сроки выполнения заказа, точную стоимость
              будущей кухни и подготовит спецификацию.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalSection;