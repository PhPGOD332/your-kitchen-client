"use client";

import { isUserHaveRights } from "@/features/isUserHaveRights";
import { Icons } from "@/shared/IconsComponents/Icons";
import MiniLoading from "@/shared/MiniLoading";
import { pagesLinks } from "@/shared/constants";
import { deleteDiscount, getDiscounts } from "@/store/discounts.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import { UserRoles } from "@/types/UserRoles";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { DiscountItem } from "@/widgets/DiscountItem/DiscountItem";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../Page.module.scss";

// Тексты
const texts = {
  buttonText: "+ Добавить акцию",
  titleText: "Скидки и акции",
};

const DiscountsPage = () => {
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const discountStore = useAppSelector((store) => store.discounts);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
      dispatch(getDiscounts());
    }
  }, []);

  const removeDiscount = async (slug: string) => {
    if (
      localStorage.getItem("token") &&
      isUserHaveRights(userStore.user, UserRoles.Admin)
    ) {
      dispatch(deleteDiscount(slug));
    }
  };

  if (discountStore.isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <MiniLoading className={styles.preloader} />
        </div>
      </div>
    );
  }

  if (!userStore.isLoading && !userStore.isAuth) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.authText}>{`Ошибка, авторизируйтесь`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {userStore.isAuth && <AdminSidebar store={userStore} />}
      <div className={styles.container}>
        <div className={styles.string}>
          <h2 className={styles.title}>
            {texts.titleText} ({discountStore.discounts.length})
          </h2>
          {isUserHaveRights(userStore.user, UserRoles.Admin) && (
            <Link
              href={pagesLinks.adminDiscountsNew}
              className={styles.addButton}
            >
              {texts.buttonText}
            </Link>
          )}
        </div>
        <div className={styles.discounts}>
          {discountStore.discounts &&
            discountStore.discounts.slice(0).map((discount, index) => (
              <div className={styles.discountLink} key={index}>
                {isUserHaveRights(userStore.user, UserRoles.Admin) && (
                  <button
                    type="button"
                    className={styles.removeButtonLeft}
                    onClick={() => removeDiscount(discount.slug)}
                  >
                    <Icons.remove className={styles.removeIcon} />
                  </button>
                )}

                <Link href={`/admin/discounts/${discount.slug}`}>
                  <DiscountItem discount={discount} />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountsPage;
