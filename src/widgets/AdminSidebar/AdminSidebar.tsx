import { isUserHaveRights } from "@/features/isUserHaveRights";
import { Icons } from "@/shared/IconsComponents/Icons";
import Logo from "@/shared/Logo/Logo";
import { pagesLinks } from "@/shared/constants";
import { useAppDispatch } from "@/store/hooks";
import type { IUserStore } from "@/store/store.d";
import { logout } from "@/store/user.slice";
import { UserRoles } from "@/types/UserRoles";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type FC } from "react";
import { IoMdPhotos } from "react-icons/io";
import { LuArmchair } from "react-icons/lu";
import { MdArticle, MdDiscount, MdOutlineRateReview } from "react-icons/md";
import styles from "./AdminSidebar.module.scss";

interface AdminSidebarProps {
  store: IUserStore;
}

const AdminSidebar: FC<AdminSidebarProps> = ({ store }) => {
  const path = usePathname()?.split("/")[2];

  const isActive = (link: string) =>
    path === link ? `${styles.link} ${styles.active}` : styles.link;

  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.adminSidebar}>
      <div className={styles.upper}>
        <Logo />
        <h2 className={styles.name}>{store.user ? store.user.email : ""}</h2>
      </div>

      <div className={styles.links}>
        {isUserHaveRights(store.user, UserRoles.Admin) && (
          <Link href={pagesLinks.adminClaims} className={isActive("claims")}>
            <Icons.docs className={styles.icon} />
            <p>Заявки</p>
          </Link>
        )}
        <Link href={pagesLinks.adminKitchens} className={isActive("kitchens")}>
          <Icons.kitchen className={styles.icon} />
          <p>Кухни</p>
        </Link>
        <Link
          href={pagesLinks.adminFurniture}
          className={isActive("furniture")}
        >
          <LuArmchair />
          <p>Мебель</p>
        </Link>
        <Link href={pagesLinks.adminReviews} className={isActive("reviews")}>
          <MdOutlineRateReview />
          <p>Отзывы</p>
        </Link>
        <Link href={pagesLinks.adminTeam} className={isActive("team")}>
          <Icons.team className={styles.icon} />
          <p>Команда</p>
        </Link>
        {isUserHaveRights(store.user, UserRoles.Admin) && (
          <Link href={pagesLinks.adminAdmins} className={isActive("admins")}>
            <Icons.team className={styles.icon} />
            <p>Администраторы</p>
          </Link>
        )}
        <Link href={pagesLinks.adminArticles} className={isActive("articles")}>
          <MdArticle />
          <p>Статьи</p>
        </Link>
        <Link
          href={pagesLinks.adminDiscounts}
          className={isActive("discounts")}
        >
          <MdDiscount />
          <p>Акции</p>
        </Link>
        <Link href={pagesLinks.adminGallery} className={isActive("gallery")}>
          <IoMdPhotos />
          <p>Галерея</p>
        </Link>
      </div>
      <button
        type="button"
        className={styles.logout}
        onClick={() => {
          dispatch(logout());
          router.push(pagesLinks.adminLogin);
        }}
      >
        Выйти
      </button>
    </div>
  );
};

export default AdminSidebar;
