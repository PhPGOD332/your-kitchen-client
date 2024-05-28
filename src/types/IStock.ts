import type { StaticImageData } from "next/image";

export interface IStock {
  title: string;
  description?: string;
  button?: {
    text?: string;
    variant?: "transparent" | "orange" | "white";
  };
  rightPhoto: StaticImageData;
  leftPhoto?: StaticImageData;
  variant?: "orange" | "transparent" | "white";
}
