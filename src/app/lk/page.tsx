"use client";

import MiniLoading from "@/shared/MiniLoading";
import { clientCheckAuth } from "@/store/client.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ClientSidebar } from "@/widgets/client";
import { useEffect } from "react";
import styles from "./ClientPage.module.scss";
import ClientLoginPage from "./login/page";

const ClientPage = () => {
  const store = useAppSelector((store) => store.client);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(clientCheckAuth());
    }
  }, []);

  if (!store.isLoading && !store.isAuth) {
    return <ClientLoginPage />;
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        {store.isAuth && <ClientSidebar store={store} />}
        {store.isLoading && <MiniLoading className={styles.preloader} />}
      </div>
    </div>
  );
};

export default ClientPage;
