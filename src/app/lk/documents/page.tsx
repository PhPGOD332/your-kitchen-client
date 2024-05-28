"use client";

import MiniLoading from "@/shared/MiniLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import { IError } from "@/types/IError";
import { ClientDocument, ClientSidebar } from "@/widgets/client";
import { useEffect, useState } from "react";
import styles from "../Page.module.scss";

// Тексты
const texts = {
  title: "Документы",
};

export interface MockDocument {
  name: string;
  isSigned?: boolean;
}

const mockDocuments: MockDocument[] = [
  {
    name: "Договор",
  },
  {
    name: "Бланк замера",
  },
  {
    name: "Эскиз",
  },
  {
    name: "Спецификация",
  },
  {
    name: "Инструкция",
  },
  {
    name: "Прайс на дополнительные услуги",
  },
  {
    name: "Акт",
  },
];

const DocumentsPage = () => {
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [error, setError] = useState<IError>({ isError: false, value: "" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  if (userStore.isLoading) {
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
      {userStore.isAuth && <ClientSidebar store={userStore} />}
      <div className={styles.container}>
        <div className={styles.string}>
          <h2 className={styles.title}>{texts.title}</h2>
        </div>
        <div className={styles.documents}>
          {mockDocuments.map((document, index) => (
            <ClientDocument document={document} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
