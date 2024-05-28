import { closeModalOnEscape } from "@/shared/helpers/closeModalOnEscape";
import type { ModalProps } from "@/types";
import { useEffect } from "react";
import { LeaveRequestMini } from "../LeaveRequestMini/LeaveRequestMini";
import styles from "./Modal.module.scss";

const isOpenStyles = (isOpen: boolean) =>
  isOpen ? styles.modal : `${styles.modal} ${styles.hidden}`;

export const ModalMini = ({
  isOpen,
  setIsOpen,
  buttonText,
  descriptionText,
  cardTitle,
  title,
  tag,
  location,
  type = "call"
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
      <LeaveRequestMini
        type={type}
        isModal={true}
        onClick={(event) => event.stopPropagation()}
        title={title}
        setIsOpen={setIsOpen}
        button={{
          text: buttonText,
          arrow: "right",
        }}
        tag={tag}
        location={location}
      />
    </div>
  );
};
