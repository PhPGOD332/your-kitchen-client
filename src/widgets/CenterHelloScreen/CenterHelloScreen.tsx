import bgImage from "@/data/images/bg_discouts.jpg";
import { Icons } from "@/shared/IconsComponents/Icons";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import styles from "./CenterHelloScreen.module.scss";

interface Props {
  title: string;
  subtitle: string | ReactNode;
  bg?: string | StaticImageData;
  button?: {
    href: string;
  };
  miniHeight?: boolean;
}

export const CenterHelloScreen = ({
  subtitle,
  title,
  bg,
  button,
  miniHeight,
}: Props) => {
  return (
    <div
      className={`${styles.helloScreen} ${miniHeight ? styles.miniHeight : ""}`}
    >
      <Image
        src={bg ? bg : bgImage}
        className={styles.bgImage}
        alt="Фон"
        draggable={false}
        priority
        quality={100}
      />
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.divider}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className={styles.subtitle}>{subtitle}</p>
        {/* <div className={styles.description}>
            <p>
              <Icons.gift className={styles.icon} />
              <span>Подарки и техника</span> новым и действующим клиентам
              фабрики «Твоя кухня».
            </p>
          </div> */}
        {button && (
          <Link href={button.href} className={styles.downButton}>
            <Icons.arrow className={styles.arrowIcon} />
          </Link>
        )}
      </div>
    </div>
  );
};
