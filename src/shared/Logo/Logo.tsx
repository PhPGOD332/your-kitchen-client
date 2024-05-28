import logoWithText from "@/data/images/logoWithText.webp";
import Image from "next/image";
import Link from "next/link";
import { pagesLinks } from "../constants";
import styles from "./Logo.module.scss";

interface LogoProps {
  isSchemaOrg?: boolean;
}

const Logo = ({ isSchemaOrg = false }: LogoProps) => {
  if (!isSchemaOrg) {
    return (
      <Link href={pagesLinks.main} className={styles.logo}>
        <Image
          src={logoWithText}
          alt="Твоя кухня"
          draggable={false}
          priority
          className={styles.logoImg}
        />
      </Link>
    );
  }

  return (
    <Link href={pagesLinks.main} className={styles.logo}>
      <Image
        src={logoWithText}
        alt="Твоя кухня"
        draggable={false}
        priority
        className={styles.logoImg}
        itemProp="logo"
      />
    </Link>
  );
};

export default Logo;
