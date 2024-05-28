'use client'
import React, {FC} from 'react';
import styles from './MeasurementRoom.module.scss';
import DoubleSlider from "@/widgets/DoubleSlider/DoubleSlider";

const MeasurementRoom: FC = () => {

    return (
        <section className={`${styles.measuresScreen} section`}>
            <h1 className={`${styles.measuresTitle} titleNotoFont`}>
                Замер помещения и создание проекта специалистом
                под кухонный гарнитур и корпусную мебель
            </h1>
            <div className={`${styles.measureCard} gridBlock`}>
                <DoubleSlider
                  title="Фото макета кухни"
                />
                <div className={styles.measuresDescription}>
                <h3 className={styles.descriptionSubtitle}>
                        Хотите, чтобы кухня соответствовала особенностям  планировки, полностью
                        подходила под дизайн помещения?
                    </h3>
                    <div className={styles.descriptionText}>
                        <p>Для этого очень важно правильно провести замеры помещения.
                            Итоговые данные и цифры должны быть точны до миллиметров – на их
                            основе вы будете заказывать дизайн интерьера кухни.</p>
                        <p>Часто клиенты опасаются, что визит специалиста,  разработка и создание
                            проекта кухни станут дополнительным пунктом  расходов, поэтому решают
                            делать замеры лично.  В результате готовый кухонный гарнитур или
                            другая корпусная мебель будет нуждаться в доработке,  на которую
                            придется тратить время, деньги и нервы.</p>
                        <p>Чтобы избежать таких ситуаций, фабрика «Твоя кухня» предлагает
                            бесплатный выезд дизайнера замерщика кухни.</p>
                        <p>Специалист порекомендует эргономичные решения,  соответствующие
                            характеристикам  помещения. Клиент ознакомится с фирменным каталогом,
                            посмотрит  образцы материалов,  получит консультацию дизайнера</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeasurementRoom;