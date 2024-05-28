import type { IKitchen } from "@/types";
import styles from "@/widgets/Articles/Articles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

type Props = {
  kitchen: IKitchen;
  href: string;
};

const KitchenCard = ({ kitchen, href }: Props) => {
  return (
    <Link
      href={href}
      className={styles.articleLink}
      itemScope
      itemType="http://schema.org/Article"
    >
      <div className={styles.imageWrapper}>
        <Image
          src={kitchen.photos[0]}
          alt={kitchen.title}
          className={styles.image}
          itemProp="image"
          width={386}
          height={240}
        />
      </div>
      <div className={styles.cardTitleWrapper}>
        <h3 className={styles.cardTitle} itemProp="name">
          {kitchen.title}
        </h3>
        <FiArrowUpRight />
      </div>
      <p
        className={styles.cardDescription}
        itemProp="description"
        dangerouslySetInnerHTML={{ __html: kitchen.description }}
      ></p>
    </Link>
  );
};

export default KitchenCard;
