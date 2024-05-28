import { closeModalOnEscape } from "@/shared/helpers/closeModalOnEscape";
import { getDiscountType } from "@/shared/helpers/getDiscountType";
import { IDiscount } from "@/types/IDiscount";
import { useEffect } from "react";
import styles from "./DiscountModal.module.scss";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  discount: IDiscount;
}
const isOpenStyles = (isOpen: boolean) =>
  isOpen ? styles.modal : `${styles.modal} ${styles.hidden}`;

export const DiscountModal = ({ isOpen, setIsOpen, discount }: ModalProps) => {
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
          <p className={styles.bgText}>{getDiscountType(discount.type)}</p>
          <div className={styles.upper}>
            <div className={styles.name}>
              {`Подробные условия "${discount.name}"`}
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
            >
              ×
            </button>
          </div>
          <p className={styles.label}>Описание:</p>
          <div className={styles.description}>{discount.description}</div>
          {discount.conditions && discount.conditions !== "<p></p>" && (
            <>
              <p className={styles.label}>Условия:</p>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: discount.conditions }}
              ></div>
            </>
          )}
          <div className={styles.lower}>
            {/* <button
              type="button"
              className={styles.closeButtonText}
              onClick={closeModal}
            >
              Закрыть
            </button> */}
          </div>
        </div>
      </div>
      {/* <LeaveRequest
        isModal={true}
        onClick={(event: any) => event.stopPropagation()}
        setIsOpen={setIsOpen}
        setIsOpenThanks={setIsOpenThanks}
        buttonText={buttonText}
        descriptionText={descriptionText}
        tag={tag}
        location={location}
      /> */}
    </div>
  );
};
