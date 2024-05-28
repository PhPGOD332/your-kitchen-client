import { Icons } from "@/shared/IconsComponents/Icons";
import Logo from "@/shared/Logo/Logo";
import { pagesLinks } from "@/shared/constants";
import { clientLogout } from "@/store/client.slice";
import { useAppDispatch } from "@/store/hooks";
import type { IClientStore } from "@/store/store.d";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type FC } from "react";
import { LuArmchair } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";
import styles from "./ClientSidebar.module.scss";

interface AdminSidebarProps {
  store: IClientStore;
}

export const ClientSidebar: FC<AdminSidebarProps> = ({ store }) => {
  const path = usePathname()?.split("/")[2];

  const isActive = (link: string) =>
    path === link ? `${styles.link} ${styles.active}` : styles.link;

  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.clientSidebar}>
      <div className={styles.upper}>
        <Logo />
        <h2 className={styles.name}>{store.user ? store.user.email : ""}</h2>
      </div>

      <div className={styles.links}>
        <Link
          href={pagesLinks.clientDocuments}
          className={isActive("documents")}
        >
          <LuArmchair />
          <p>Документы</p>
        </Link>
        <Link href={pagesLinks.clientPayment} className={isActive("payment")}>
          <MdOutlineRateReview />
          <p>Оплата онлайн</p>
        </Link>
        <Link href={pagesLinks.clientSupport} className={isActive("support")}>
          <Icons.team className={styles.icon} />
          <p>Клиентская поддержка</p>
        </Link>
      </div>
      <button
        type="button"
        className={styles.logout}
        onClick={() => {
          dispatch(clientLogout());
          router.push(pagesLinks.clientLogin);
        }}
      >
        Выйти
      </button>
    </div>
  );
};
