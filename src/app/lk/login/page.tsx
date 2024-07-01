"use client";

import { ClientDocument } from "@/shared/ClientDocument";
import Logo from "@/shared/Logo/Logo";
import { PrivacyPolicy } from "@/shared/PrivacyPolicy";
import { pagesLinks } from "@/shared/constants";
import { clientLogin } from "@/store/client.slice";
import { useAppDispatch } from "@/store/hooks";
import { IError } from "@/types/IError";
import { TextModal } from "@/widgets/Modals/TextModal/TextModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.scss";
import Link from "next/link";

interface TInputs {
  email: string;
  password: string;
}

// Тексты
const texts = {
  buttonText: "Войти",
  titleText: "Личный кабинет клиента",
  errorText: "Неправильные данные",
};

const ClientLoginPage = () => {
  const { register, handleSubmit, getValues } = useForm<TInputs>();
  const [error, setError] = useState<IError>({ isError: false, value: "" });
  // const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);
  const [isOpenDocument, setIsOpenDocument] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onSubmit = async (data: TInputs) => {
    const response = await dispatch(
      clientLogin({
        email: data.email,
        password: data.password,
      }),
    );
    if (!response.payload) {
      setError({
        isError: true,
        value: "Неправильные данные",
      });
    }
    if (response.payload) {
      setError({
        isError: false,
        value: "",
      });
      router.push(pagesLinks.client);
    }
  };

  const checkClientAgree = (data?: TInputs) => {
    // TODO: проверка на принятие политики конфиденциальности
    // if (!user.isAgreePolicy) {
    //   setIsOpenPrivacy(true);
    // } else {
    //   setIsOpenDocument(true);
    // }
    // TODO: пока что всегда нужно принять
    setIsOpenDocument(true);

    if (isOpenDocument && data) {
      onSubmit(data);
      setIsOpenDocument(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <TextModal
        isOpen={isOpenDocument}
        setIsOpen={setIsOpenDocument}
        text={ClientDocument}
        title="Договор"
        button={{
          text: "Подтвердить",
          onClick: () => checkClientAgree(getValues()),
        }}
      />
      {/*<TextModal*/}
      {/*  isOpen={isOpenPrivacy}*/}
      {/*  setIsOpen={setIsOpenPrivacy}*/}
      {/*  text={PrivacyPolicy}*/}
      {/*/>*/}
      <div className={styles.container}>
        <div className={styles.center}>
          <Logo />
        </div>
        <h2 className={styles.title}>{texts.titleText}</h2>
        {error.isError && <p className={styles.error}>{texts.errorText}</p>}
        <form className={styles.form} onSubmit={handleSubmit(checkClientAgree)}>
          <input
            type="text"
            className={styles.input}
            placeholder="example@gmail.com"
            {...register("email", {
              required: "Введите ваш email",
            })}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Пароль"
            {...register("password", {
              required: "Введите ваш пароль",
            })}
          />
          <button type="submit" className={styles.button}>
            {texts.buttonText}
          </button>
          <p className={styles.infoText}>
            Нажимая кнопку войти, вы соглашаетесь с{" "}
            <Link
              href={pagesLinks.privacyPolicy}
              type="button"
              // onClick={() => setIsOpenPrivacy(true)}
              target={"_blank"}
            >
              Политикой обработки персональных данных
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ClientLoginPage;
