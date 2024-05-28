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
import { pagesLinks } from "@/shared/constants";
import type { IError } from "@/types/IError";
import type { IUser } from "@/types/IUser";
import { UserRoles } from "@/types/UserRoles";
import Link from "next/link";
import { useParams } from "next/navigation";

// Поля формы
interface TInputs {
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
  buttonText: "Изменить",
  titleText: "Изменить пользователя",
  addOrChangeErrorText: "Ошибка изменения пользователя. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Пользователь успешно изменен",
};

const isSuccess = (error: IError) => {
  return error.isError === true ? styles.error : styles.success;
};

const EditAdminPage = () => {
  const path = useParams();

  const { register, handleSubmit, control, reset, setValue } =
    useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [userRole, setUserRole] = useState<SingleValue<ISelectOptions>>(
    usersOptions[1],
  );
  const [user, setUser] = useState<IUser>({} as IUser);

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
      if (path && typeof path.id === "string") {
        getUser(path.id);
      }
    }
  }, [userStore.user]);

  if (!path || !path.id) {
    return (
      <div className={styles.kitchensPage}>
        <div className={styles.container}>
          <p className={styles.title}>{texts.notFoundText}</p>
          <Link href={pagesLinks.adminAdmins}>Назад</Link>
        </div>
      </div>
    );
  }

  const getUser = async (id: string) => {
    const userById = userStore.users.find((user) => user._id === path.id);

    if (userById) {
      setUser(userById);
      setUserRole(userById.role);
    } else {
      if (typeof path.id === "string") {
        try {
          const userPayload = await AdminService.getUser(path.id);
          setUser(userPayload.data);
          setUserRole(userPayload.data.role);
        } catch (error) {
          setError({
            isError: true,
            value: texts.addOrChangeErrorText,
          });
        }
      }
    }
  };

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
    const newUser: any = {
      role: userRole,
    };

    if (data.password) {
      newUser.password = data.password;
    }

    const response = await AdminService.updateUser(user._id, newUser);

    if (response.status === 200) {
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
        password: "",
      });
    } else {
      setError({
        isError: true,
        value: texts.errorText,
      });
    }
  };

  const handleChange = (option: SingleValue<ISelectOptions>) => {
    setUserRole(option);
  };

  return (
    <div className={styles.page}>
      {userStore.isAuth && <AdminSidebar store={userStore} />}
      <div className={styles.container}>
        {isUserHaveRights(userStore.user, UserRoles.Admin) && (
          <div className={styles.string}>
            <h2 className={styles.title}>{texts.titleText}</h2>
            <button
              type="submit"
              form="kitchenForm"
              className={styles.addButton}
            >
              {texts.buttonText}
            </button>
          </div>
        )}
        <div className={styles.string}>
          <p className={isSuccess(error)}>{error.value}</p>
        </div>

        {/* Форма */}
        {isUserHaveRights(userStore.user, UserRoles.Admin) && (
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
              <p className={styles.adminValue}>{user.email}</p>
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
        )}
      </div>
    </div>
  );
};

export default EditAdminPage;
