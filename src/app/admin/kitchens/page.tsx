"use client";

import { isUserHaveRights } from "@/features/isUserHaveRights";
import { Icons } from "@/shared/IconsComponents/Icons";
import MiniLoading from "@/shared/MiniLoading";
import { pagesLinks } from "@/shared/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteKitchen, getKitchens } from "@/store/kitchens.slice";
import { checkAuth } from "@/store/user.slice";
import { UserRoles } from "@/types/UserRoles";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import Kitchen from "@/widgets/Kitchen/Kitchen";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../Page.module.scss";

// Тексты
const texts = {
  buttonText: "+ Добавить кухню",
  titleText: "Кухни",
  onMainPageText: "На главной",
};

const KitchensPage = () => {
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const kitchenStore = useAppSelector((store) => store.kitchens);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
      dispatch(getKitchens());
    }
  }, []);

  const removeKitchen = async (id: string) => {
    if (
      localStorage.getItem("token") &&
      isUserHaveRights(userStore.user, UserRoles.Admin)
    ) {
      dispatch(deleteKitchen(id));
    }
  };

  if (kitchenStore.isLoading) {
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
            {texts.titleText} ({kitchenStore.kitchens.length})
          </h2>
          {isUserHaveRights(userStore.user, UserRoles.Admin) && (
            <Link
              href={pagesLinks.adminKitchensNew}
              className={styles.addButton}
            >
              {texts.buttonText}
            </Link>
          )}
        </div>
        <div className={styles.kitchens}>
          {kitchenStore.kitchens &&
            kitchenStore.kitchens
              .slice(0)
              .reverse()
              .map((kitchen, index) => (
                <div className={styles.kitchenLink} key={index}>
                  {isUserHaveRights(userStore.user, UserRoles.Admin) && (
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeKitchen(kitchen._id)}
                    >
                      <Icons.remove className={styles.removeIcon} />
                    </button>
                  )}
                  {kitchen.onMainPage && (
                    <p className={styles.kitchenOption}>
                      {texts.onMainPageText}
                    </p>
                  )}
                  <Kitchen
                    kitchen={kitchen}
                    link={`/admin/kitchens/${kitchen._id}`}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default KitchensPage;
