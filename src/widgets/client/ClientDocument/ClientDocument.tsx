import { type MockDocument } from "@/app/lk/documents/page";
import logo from "@/data/images/logo.webp";
import Image from "next/image";
import Link from "next/link";
import styles from "./ClientDocument.module.scss";

interface Props {
  document: MockDocument;
}

export const ClientDocument = ({ document }: Props) => {
  return (
    <div className={styles.clientDocument}>
      <div className={styles.side}>
        <input
          type="checkbox"
          defaultChecked={document.isSigned}
          className={styles.checkbox}
        />
        <Image
          src={logo}
          alt="Логотип"
          className={styles.image}
          width={60}
          height={60}
          draggable={false}
        />
        <p className={styles.name}>{document.name}</p>
      </div>
      <div className={styles.side}>
        <Link href="#" className={styles.button}>
          Посмотреть
        </Link>
        <button type="button" className={styles.button}>
          Скачать
        </button>
        <button type="button" className={`${styles.button} ${styles.orange}`}>
          Подписать
        </button>
      </div>
    </div>
  );
};
