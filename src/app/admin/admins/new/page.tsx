"use client";

import styles from "../../Page.module.scss";

import MiniLoading from "@/shared/MiniLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select, { SingleValue, components } from "react-select";

import { isUserHaveRights } from "@/features/isUserHaveRights";
import AdminService from "@/services/admin/AdminService";
import { IError } from "@/types/IError";
import { UserRoles } from "@/types/UserRoles";

// Поля формы
interface TInputs {
  email: string;
  password: string;
  role: string;
}

interface ISelectOptions {
  value: string;
  label: string;
}
const usersOptions: readonly ISelectOptions[] = [
  { value: UserRoles.Admin, label: "Администратор" },
  { value: UserRoles.Editor, label: "Редактор" },
];

// Тексты
const texts = {
  notFoundText: "Пользователь не найден",
  buttonText: "Добавить",
  titleText: "Добавить пользователя",
  addOrChangeErrorText: "Ошибка добавления пользователя. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Пользователь успешно добавлен",
};

const NewAdminPage = () => {
  const { register, handleSubmit, reset, control } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [userRole, setUserRole] = useState<SingleValue<ISelectOptions>>(
    usersOptions[1],
  );

  // Ошибка
  const [error, setError] = useState<IError>({ isError: false, value: "" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  useEffect(() => {
    if (!isUserHaveRights(userStore.user, UserRoles.Admin)) {
      setError({
        isError: true,
        value: "У вас нет прав на просмотр этой страницы",
      });
    } else {
      setError({
        isError: false,
        value: "",
      });
    }
  }, [userStore.user]);

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

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const newUser = {
      email: data.email,
      password: data.password,
      role: userRole,
    };
    const response = await AdminService.addUser(newUser);

    if (response.status === 200) {
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
        password: "",
        email: "",
      });
    } else {
      setError({
        isError: true,
        value: texts.errorText,
      });
    }
  };

  const isSuccess = (error: IError) => {
    return error.isError === true ? styles.error : styles.success;
  };

  const handleChange = (option: SingleValue<ISelectOptions>) => {
    setUserRole(option);
  };

  return (
    <div className={styles.page}>
      {userStore.isAuth && <AdminSidebar store={userStore} />}
      <div className={styles.container}>
        <div className={styles.string}>
          {isUserHaveRights(userStore.user, UserRoles.Admin) && (
            <>
              <h2 className={styles.title}>{texts.titleText}</h2>
              <button
                type="submit"
                form="kitchenForm"
                className={styles.addButton}
              >
                {texts.buttonText}
              </button>
            </>
          )}
        </div>
        {error.isError && <p className={styles.error}>{error.value}</p>}
        {isUserHaveRights(userStore.user, UserRoles.Admin) && (
          <>
            <div className={styles.string}>
              <p className={isSuccess(error)}>{error.value}</p>
            </div>

            {/* Форма */}
            <form
              className={styles.addForm}
              id="kitchenForm"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Почта */}
              <div className={styles.inputWrapper}>
                <label htmlFor="email" className={styles.label}>
                  Почта
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your_email@mail.ru"
                  autoComplete="email"
                  {...register("email", {
                    required: true,
                  })}
                  className={`${styles.textInput} ${styles.fullInput}`}
                />
              </div>

              {/* Пароль */}
              <div className={styles.inputWrapper}>
                <label htmlFor="password" className={styles.label}>
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Пароль"
                  {...register("password", {
                    required: true,
                  })}
                  className={`${styles.textInput} ${styles.fullInput}`}
                />
              </div>
              {/* Стиль кухни */}
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Роль</label>

                <Controller
                  control={control}
                  name="role"
                  render={() => (
                    <Select
                      components={components}
                      options={usersOptions}
                      className={styles.select}
                      value={userRole}
                      isMulti={false}
                      onChange={(role) => handleChange(role)}
                      id="role"
                      placeholder="Тип пользователя"
                    />
                  )}
                />
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NewAdminPage;
