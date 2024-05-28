import { closeModalOnEscape } from "@/shared/helpers/closeModalOnEscape";
import { useEffect } from "react";
import styles from "./Modal.module.scss";

interface ThanksModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const ThanksModal = ({ setIsOpen }: ThanksModalProps) => {
  useEffect(() => {
    document.addEventListener("keydown", (event) =>
      closeModalOnEscape(event, setIsOpen),
    );
    return () =>
      document.removeEventListener("keydown", (event) =>
        closeModalOnEscape(event, setIsOpen),
      );
  }, []);

  return (
    <div
      className={styles.modal2}
      onClick={() => {
        setIsOpen(false);
        document.body.classList.remove("overflow");
      }}
    >
      <div className={styles.container}>
        <div
          className={styles.card2}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className={styles.closeButton2}
            onClick={() => {
              setIsOpen(false);
              document.body.classList.remove("overflow");
            }}
          >
            ×
          </button>
          <p className={styles.minus}>—</p>
          <div className={styles.wrapper}>
            <p className={styles.title}>Благодарим за обращение!</p>
            <p className={styles.text}>
              Специалист свяжется с Вами указанным способом связи в течение
              часа, чтобы обсудить детали
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
