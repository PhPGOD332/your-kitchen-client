"use client";

import logoWithoutText from "@/data/images/logo.webp";
import man from "@/data/images/man1.webp";
import materials from "@/data/images/materials1.webp";
import phone from "@/data/images/phone1.webp";
import work from "@/data/images/work1.webp";
import { Icons } from "@/shared/IconsComponents/Icons";
import { OrangeButton } from "@/shared/ui";
import Image from "next/image";
import { useState } from "react";
import { Modal1 } from "../Modals/Modal1";
import styles from "./AllVariant.module.scss";

const AllVariants = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Modal1
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        location='Главная страница, блок "Все варианты"'
        tag="Рассчитать стоимость кухни"
      />
      <div className={styles.allvariants}>
        <div className={styles.container}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title1}>Так вы рассмотрите все варианты</h3>
            <h2 className={styles.title2}>
              И получите дизайн-проект идеальной для себя кухни
            </h2>
            <Icons.ruble className={styles.icon} />
            <p className={styles.title3}>с идеальным бюджетом</p>
          </div>
          <div className={styles.variants}>
            <div className={`${styles.variant} ${styles.one}`}>
              <div className={styles.wrapper}>
                <p className={styles.variantTitle}>
                  В любое удобное время дизайнер приедет к вам
                </p>
                <p className={styles.variantDescription}>
                  <span>
                    с образцами всех материалов или назначит встречу в офисе,
                  </span>{" "}
                  где материалы можно увидеть на готовых кухнях
                </p>
                <OrangeButton
                  className={styles.link}
                  onClick={() => {
                    setIsOpenModal(true);
                    document.body.classList.add("overflow");
                  }}
                >
                  Оставить заявку
                </OrangeButton>
              </div>
              <p className={styles.variantNumber}>01</p>
              <Image
                src={materials}
                alt="Материалы"
                className={styles.variantImg}
                draggable={false}
              />
            </div>
            <div className={`${styles.variant} ${styles.two}`}>
              <p className={styles.variantTitle}>
                После встречи дизайнер закрепляется за вами и ведёт всю работу
                от и до
              </p>
              <p className={styles.variantDescription}>
                <span>С 8:00 до 22:00, 7 дней в неделю,</span> ответит на любые
                вопросы
              </p>
              <p className={styles.variantNumber}>02</p>
              <Image
                src={phone}
                alt="Телефон"
                className={styles.variantImg}
                draggable={false}
              />
            </div>
            <div className={styles.logo}>
              <Image
                src={logoWithoutText}
                className={styles.logo_img}
                draggable={false}
                alt="Лого"
              />
            </div>
            <div className={`${styles.variant} ${styles.three}`}>
              <p className={styles.variantTitle}>
                Как получите проект и смету, сможете спокойно обдумать и принять
                решение. Время не ограничено
              </p>
              <p className={styles.variantNumber}>03</p>
              <Image
                src={work}
                alt="Материалы"
                className={styles.variantImg}
                draggable={false}
              />
            </div>
            <div className={`${styles.variant} ${styles.four}`}>
              <p className={styles.variantTitle}>
                Выезд на замер и вся работа бесплатные
              </p>
              <p className={styles.variantDescription}>
                это никак <span>не влияет на стоимость кухни.</span> В неё
                входят только материалы и работа по производству
              </p>
              <p className={styles.variantNumber}>04</p>
              <Image
                src={man}
                alt="Рабочий"
                className={styles.variantImg}
                draggable={false}
              />
              <p className={styles.price}>
                0<span>₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllVariants;
