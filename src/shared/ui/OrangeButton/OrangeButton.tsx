"use client";

import { Icons } from "@/shared/IconsComponents/Icons";
import Link from "next/link";
import { ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./OrangeButton.module.scss";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  arrow?: "left" | "right" | "up" | "down";
  arrowLocation?: "left" | "right";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  center?: boolean;
  prefix?: {
    icon: ReactNode;
    location?: "left" | "right";
  };
  disabled?: boolean;
  variant?: "orange" | "transparent" | "white";
}

const getButtonStyles = (
  variant: "transparent" | "orange" | "white" = "orange",
) => {
  switch (variant) {
    case "white":
      return styles.white;
    case "transparent":
      return styles.transparent;
    case "orange":
    default:
      return styles.orange;
  }
};

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

export const OrangeButton = ({
  children,
  href,
  onClick,
  className,
  arrow,
  type,
  center,
  prefix,
  disabled,
  arrowLocation,
  variant = "orange",
}: ButtonProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`${isCenter(center)} ${isHaveArrow(prefix?.location)} ${
          styles.button
        } ${getButtonStyles(variant)} ${className || ""} ${isHaveArrow(arrow)}`}
      >
        {arrow && arrowLocation === "left" && (
          <Icons.chevron direction={arrow} />
        )}
        {(prefix && prefix.location !== "right") ||
          (prefix && prefix.location === "left" && prefix.icon)}
        {children}
        {prefix && prefix.location === "right" && prefix.icon}
        {arrow && arrowLocation !== "left" && (
          <Icons.chevron direction={arrow} />
        )}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      type={type || "button"}
      onClick={onClick}
      className={`${isCenter(center)} ${isHaveArrow(prefix?.location)} ${
        styles.button
      } ${getButtonStyles(variant)} ${className || ""} ${isHaveArrow(arrow)}`}
    >
      {arrow && arrowLocation === "left" && <Icons.chevron direction={arrow} />}
      {(prefix && prefix.location !== "right") ||
        (prefix && prefix.location === "left" && prefix.icon)}
      {children}
      {prefix && prefix.location === "right" && prefix.icon}
      {arrow && arrowLocation !== "left" && <Icons.chevron direction={arrow} />}
    </button>
  );
};
