"use client";

import bg1 from "@/data/images/discount_bg1.jpg";
import bg2 from "@/data/images/discount_bg2.jpg";
import bg3 from "@/data/images/discount_bg3.jpg";
import { SITE_NAME, pagesData } from "@/shared/constants";
import { getDiscountType } from "@/shared/helpers/getDiscountType";
import { OrangeButton } from "@/shared/ui";
import type { DiscountType, IDiscount } from "@/types/IDiscount";
import Image from "next/image";
import { useState } from "react";
import { DiscountModal } from "../Modals/DiscountModal";
import { Modal1 } from "../Modals/Modal1";
import styles from "./DiscountItem.module.scss";

interface Props {
  discount: IDiscount;
}

const isActiveDiscount = (isActive: boolean): string => {
  return isActive ? styles.discount : `${styles.discount} ${styles.archive}`;
};

const getBgFromDiscountType = (type: DiscountType): string => {
  switch (type) {
    case "discount":
      return bg1.src;
    case "gift":
      return bg2.src;
    case "promotion":
      return bg3.src;
    default:
      return bg1.src;
  }
};

export const DiscountItem = ({ discount }: Props) => {
  const [isOpenConditions, setIsOpenConditions] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Дата вида 01.01.2021
  const getDate = (date: string) => {
    const dateArray = date.split(".");
    return {
      day: dateArray[0],
      month: dateArray[1],
      year: dateArray[2],
    };
  };

  const getDiscountDate = (date: string) => {
    const { day, month } = getDate(date);
    return `${day}.${month}`;
  };

  const openModal = (setOpenModal: (value: boolean) => void) => {
    setOpenModal(true);
    document.body.classList.add("overflow");
  };

  return (
    <>
      <Modal1
        setIsOpen={setIsOpenModal}
        isOpen={isOpenModal}
        location="Страница акций"
        tag={`Учавствовать в акции: ${discount.name}`}
        title="Оставьте заявку и зафиксируйте участие в акции"
        descriptionText="специалист перезвонит вам и расскажет подробные условия, ответит на вопросы и забронирует ваше участие в текущей акции"
        buttonText="Участвовать в акции"
      />
      <DiscountModal
        discount={discount}
        isOpen={isOpenConditions}
        setIsOpen={setIsOpenConditions}
      />
      <div
        className={isActiveDiscount(discount.isActive)}
        itemScope
        itemType="http://schema.org/Offer"
      >
        <Image
          src={getBgFromDiscountType(discount.type)}
          width={1060}
          height={310}
          alt="Фон"
          quality={100}
          itemProp="image"
          draggable={false}
          className={styles.discount_bg}
        />
        {/* Левая часть */}
        <div className={styles.leftImage}>
          <span itemProp="priceCurrency" content="RUB"></span>
          <span itemProp="price" content="0.00"></span>
          <span itemProp="url" content={pagesData.discounts.url}></span>
          <Image src={discount.image} width={350} height={260} alt="Акция" />
        </div>
        <div
          className={styles.rightSide}
          itemScope
          itemType="http://schema.org/Thing"
        >
          <div className={styles.upper}>
            <p className={styles.name} itemProp="name">
              {discount.name}
            </p>
            <span itemScope itemType="http://schema.org/Brand">
              <span itemProp="name" content={SITE_NAME}></span>
            </span>
            <div
              className={styles.term}
              itemProp="availability"
              content="InStock"
            >
              <p className={styles.termText}>Сроки проведения</p>
              <span itemProp="validFrom" content={discount.startDate}></span>
              <span itemProp="validThrough" content={discount.endDate}></span>
              <p className={styles.termDate}>{`${getDiscountDate(
                discount.startDate,
              )} - ${getDiscountDate(discount.endDate)}`}</p>
            </div>
          </div>
          <div className={styles.desc}>
            <p className={styles.descTitle}>Описание</p>
            <p className={styles.descText} itemProp="description">
              {discount.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => openModal(setIsOpenConditions)}
            className={styles.link}
          >
            Подробные условия
          </button>
          <OrangeButton
            onClick={() => openModal(setIsOpenModal)}
            className={styles.button}
            disabled={!discount.isActive}
          >
            Участвовать в акции
          </OrangeButton>
          <p className={styles.discount_type}>
            {getDiscountType(discount.type)}
          </p>
        </div>
      </div>
    </>
  );
};
