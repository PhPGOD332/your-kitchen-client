"use client";

import { initialStocks, furnitureStocks } from "@/data/stocks/initialStocks";
import { OrangeButton } from "@/shared/ui";
import type { IStock } from "@/types/IStock";
import Image from "next/image";
import { useState } from "react";
import { ModalMini } from "../Modals/ModalMini";
import styles from "./Stocks.module.scss";

interface Props {
  stocks?: IStock[];
  withoutBg?: boolean;
  location?: string;
  bgColor?: string;
  isFurnitureStocks?: boolean;
}

const getStockVariant = (
  variant: "orange" | "transparent" | "white" | "dark" = "orange",
): string => {
  switch (variant) {
    case "white":
      return styles.white;
    case "transparent":
      return styles.transparent;
    case "dark":
      return styles.darkBrown;
    case "orange":
    default:
      return styles.orange;
  }
};

export const Stocks = ({ stocks, withoutBg, location, bgColor, isFurnitureStocks }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<IStock | null>(null);

  const openModal = (stock: IStock) => {
    setSelectedStock(stock);
    setIsOpenModal(true);
    document.body.classList.add("overflow");
  };

  const usingStocks = isFurnitureStocks ? furnitureStocks : initialStocks;

  return (
    <>
      <ModalMini
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        title="Оставить контакты для связи специалиста"
        buttonText="Отправить"
        tag={selectedStock?.title}
        location={location}
        type="call"
      />
      <div className={`${styles.stocks} ${withoutBg ? styles.withoutBg : ""} `} style={bgColor ? {backgroundColor: bgColor} : {}}>
        <div className={styles.container}>
          <div className={styles.stocksCards}>
            {usingStocks.map((stock, index) => (
              <div
                className={`${styles.stock} ${getStockVariant(stock.variant)}`}
                key={index}
              >
                <div className={styles.content}>
                  <div className={styles.textContent}>
                    <div className={styles.stockTitle}>{stock.title}</div>
                    {stock.description && (
                      <p className={styles.stockDesc}>{stock.description}</p>
                    )}
                  </div>
                  {stock.leftPhoto && (
                    <Image
                      src={stock.leftPhoto}
                      alt={"Акция"}
                      width={170}
                      height={100}
                      className={styles.leftImage}
                      draggable={false}
                    />
                  )}
                  {stock.button && stock.button.text && (
                    <>
                      <OrangeButton
                        onClick={() => openModal(stock)}
                        className={`${styles.stockButton}`}
                        variant={stock.button.variant}
                      >
                        {stock.button.text}
                      </OrangeButton>
                    </>
                  )}
                </div>
                <div className={styles.photo}>
                  <Image
                    src={stock.rightPhoto}
                    alt={"Акция"}
                    width={160}
                    height={200}
                    className={styles.image}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
