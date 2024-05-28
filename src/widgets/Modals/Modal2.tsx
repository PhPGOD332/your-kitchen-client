import { closeModalOnEscape } from "@/shared/helpers/closeModalOnEscape";
import type { ModalProps } from "@/types";
import { useEffect } from "react";
import { LeaveRequest2 } from "../LeaveRequest2/LeaveRequest2";
import styles from "./Modal.module.scss";

const isOpenStyles = (isOpen: boolean) =>
  isOpen ? styles.modal : `${styles.modal} ${styles.hidden}`;

export const Modal2 = ({
  isOpen,
  setIsOpen,
  buttonText,
  descriptionText,
  tag,
  location,
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

  return (
    <div
      className={isOpenStyles(isOpen)}
      onClick={() => {
        setIsOpen(false);
        document.body.classList.remove("overflow");
      }}
    >
      <LeaveRequest2
        isModal={true}
        onClick={(event) => event.stopPropagation()}
        setIsOpen={setIsOpen}
        buttonText={buttonText}
        descriptionText={descriptionText}
        tag={tag}
        location={location}
      />
    </div>
  );
};
