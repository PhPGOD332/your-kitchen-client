import styles from "./Preloader.module.scss";
import logo from "@/data/images/logo.svg";
import Image from "next/image";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <Image src={logo} alt='Логотип' className={styles.logoPreloader} />
    </div>
  );
};

export default Preloader;
