import { closeModalOnEscape } from "@/shared/helpers/closeModalOnEscape";
import { ModalProps } from "@/types";
import { useEffect } from "react";
import { LeaveRequest } from "../LeaveRequest/LeaveRequest";
import styles from "./Modal.module.scss";

const isOpenStyles = (isOpen: boolean) =>
  isOpen ? styles.modal : `${styles.modal} ${styles.hidden}`;

export const Modal1 = ({
  isOpen,
  setIsOpen,
  title,
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
      <LeaveRequest
        isModal={true}
        onClick={(event: any) => event.stopPropagation()}
        setIsOpen={setIsOpen}
        buttonText={buttonText}
        descriptionText={descriptionText}
        tag={tag}
        title={title}
        location={location}
      />
    </div>
  );
};
