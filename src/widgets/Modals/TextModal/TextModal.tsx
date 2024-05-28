"use client";

import { closeModalOnEscape } from "@/shared/helpers/closeModalOnEscape";
import { OrangeButton } from "@/shared/ui";
import { ReactNode, useEffect } from "react";
import styles from "./TextModal.module.scss";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  text: string | ReactNode;
  title?: string;
  button?: {
    text: string;
    onClick?: (...args: unknown[]) => void;
  };
}
const isOpenStyles = (isOpen: boolean) =>
  isOpen ? styles.modal : `${styles.modal} ${styles.hidden}`;

export const TextModal = ({
  isOpen,
  text,
  setIsOpen,
  title,
  button,
}: ModalProps) => {
  useEffect(() => {
    document.addEventListener("keydown", (event) =>
      closeModalOnEscape(event, setIsOpen),
    );
    return () =>
      document.removeEventListener("keydown", (event) =>
        closeModalOnEscape(event, setIsOpen),
      );
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("overflow");
  };

  return (
    <div className={isOpenStyles(isOpen)} onClick={closeModal}>
      <div
        className={styles.container}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.modalInner}>
          <div className={styles.upper}>
            <div className={styles.name}>
              {title ? title : "Политика конфиденциальности"}
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
            >
              ×
            </button>
          </div>
          <div className={styles.description}>{text}</div>
          <div className={styles.lower}></div>
          {button && (
            <OrangeButton
              className={styles.orangeButton}
              onClick={button.onClick}
            >
              {button.text}
            </OrangeButton>
          )}
        </div>
      </div>
    </div>
  );
};
