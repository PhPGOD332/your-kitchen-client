import { type ReactNode } from "react";
import { ModalType } from "@/widgets/LeaveRequestMini/LeaveRequestMini";

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  buttonText?: string;
  descriptionText?: string | ReactNode;
  tag?: string;
  location?: string;
  title?: string;
  cardTitle?: string;
  type?: ModalType;
  setIsOpenPrivacy?: (isOpen: boolean) => void;
}
export interface ModalButtonProps {
  buttonText?: string;
  descriptionText?: string | ReactNode;
  tag?: string;
  location?: string;
}
