"use client";

import bgImage from "@/data/images/bg_kitchen_screen.jpg";
import { links, pagesLinks } from "@/shared/constants";
import { Icons } from "@/shared/IconsComponents/Icons";
import { OrangeButton } from "@/shared/ui";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./ThankYou.module.scss";

interface Props {
  image?: StaticImageData;
  title?: string;
  subtitle?: string;
  text?: string;
  button?: {
    text: string;
    href: string;
  };
  href?: string;
}

export const ThankYou = ({
  title,
  subtitle,
  text,
  button,
  href,
  image,
}: Props) => {
  const router = useRouter();

  return (
    <div className={styles.thankYouBlock}>
      <Image
        src={image ? image : bgImage}
        className={styles.bgImage}
        alt="Фон"
        draggable={false}
        priority
        quality={100}
      />
      <div className={styles.container}>
        <h1 className={styles.title}>
          {title ? title : "Спасибо за обращение!"}
        </h1>
        <p className={styles.subtitle}>
          {subtitle
            ? subtitle
            : "специалист компании свяжется с вами в течение 15 минут"}
        </p>
        <p className={styles.text}>
          {text
            ? text
            : "пока вы ожидаете звонка, можете посмотреть каталог выполненных проектов"}
        </p>
        <div className={styles.buttonWrapper}>
          <OrangeButton center href={pagesLinks.portfolio}>
            Каталог
          </OrangeButton>
        </div>
        <p className={styles.text}>
          и подписаться на наши сообщества в социальных сетях
        </p>
        <div className={styles.links}>
          <Link
            aria-label="Телеграм"
            className={styles.link}
            href={links.tgGroup}
            target="_blank"
          >
            <Icons.telegram className={styles.icon} />
            <p className={styles.iconText}>Telegram</p>
          </Link>
          <Link
            aria-label="Вконтакте"
            className={styles.link}
            href={links.vk}
            target="_blank"
          >
            <Icons.vk className={styles.icon} />
            <p className={styles.iconText}>VK.com</p>
          </Link>
        </div>
        <div className={styles.buttonWrapper}>
          <OrangeButton
            center
            arrow="left"
            arrowLocation="left"
            className={styles.button}
            onClick={() => router.back()}
          >
            Вернуться на сайт
          </OrangeButton>
        </div>
      </div>
    </div>
  );
};
