"use client";

import { Icons } from "@/shared/IconsComponents/Icons";
import type { ModalButtonProps } from "@/types";
import { Modal2 } from "@/widgets/Modals/Modal2";
import Link from "next/link";
import { ButtonHTMLAttributes, useState, type ReactNode } from "react";
import styles from "./OrangeButton.module.scss";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  arrow?: "left" | "right" | "up" | "down";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  center?: boolean;
  prefix?: {
    icon: ReactNode;
    location?: "left" | "right";
  };
  disabled?: boolean;
  modal: ModalButtonProps;
  size?: "sm" | "md";
}

const isHaveArrow = (arrow: string | undefined): string => {
  if (arrow) {
    return styles.arrow;
  }

  return "";
};

const isCenter = (center: boolean | undefined): string => {
  if (center) {
    return styles.center;
  }

  return "";
};

export const OrangeButtonModal = ({
  children,
  href,
  className,
  arrow,
  type,
  center,
  prefix,
  disabled,
  modal,
  size = "md",
}: ButtonProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenThanks, setIsOpenThanks] = useState(false);

  if (href) {
    return (
      <Link
        href={href}
        className={`${isCenter(center)} ${isHaveArrow(prefix?.location)} ${
          styles.button
        } ${className || ""} ${isHaveArrow(arrow)}`}
      >
        {(prefix && prefix.location !== "right") ||
          (prefix && prefix.location === "left" && prefix.icon)}
        {children}
        {prefix && prefix.location === "right" && prefix.icon}
        {arrow && <Icons.chevron direction={arrow} />}
      </Link>
    );
  }

  return (
    <>
      <Modal2
        buttonText={modal.buttonText}
        descriptionText={modal.descriptionText}
        location={modal.location}
        tag={modal.tag}
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        type="default"
      />
      <button
        disabled={disabled}
        type={type || "button"}
        onClick={() => setIsOpenModal(true)}
        className={`${isCenter(center)} ${isHaveArrow(prefix?.location)} ${
          styles.button
        } ${className || ""} ${isHaveArrow(arrow)} ${
          size === "sm" ? styles.small : ""
        }`}
      >
        {(prefix && prefix.location !== "right") ||
          (prefix && prefix.location === "left" && prefix.icon)}
        {children}
        {prefix && prefix.location === "right" && prefix.icon}
        {arrow && <Icons.chevron direction={arrow} />}
      </button>
    </>
  );
};
