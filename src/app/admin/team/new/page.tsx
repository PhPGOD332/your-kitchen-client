"use client";

import styles from "../../Page.module.scss";

import MiniLoading from "@/shared/MiniLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { isUserHaveRights } from "@/features/isUserHaveRights";
import { WorkerService } from "@/services/admin/WorkerService";
import { IError } from "@/types/IError";
import { UserRoles } from "@/types/UserRoles";

// Поля формы
interface TInputs {
  photo: ImageData;
  firstName: string;
  lastName: string;
  jobTitle: string;
  experience: string;
}

// Тексты
const texts = {
  notFoundText: "Работник не найден",
  buttonText: "Добавить",
  titleText: "Добавить работника",
  addOrChangeErrorText: "Ошибка добавления работника. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Работник успешно добавлен",
};

const NewWorkerPage = () => {
  const { register, handleSubmit, reset } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [photo, setPhoto] = useState<any>();
  const [file, setFile] = useState<File>({} as File);
  const [drag, setDrag] = useState(false);

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

  // Обработчик фото
  const getPhotoFromFiles = (event: any, file: any) => {
    let photo = {
      title: file.name,
      src: URL.createObjectURL(file),
    };

    setPhoto(photo);
  };

  // Обработчики
  const dragStartHandler2 = (event: any) => {
    event.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler2 = (event: any) => {
    event.preventDefault();
    setDrag(false);
  };
  const dropHandler2 = (event: any) => {
    event.preventDefault();
    setDrag(false);
    let file = event.dataTransfer.files[0];
    setFile(file);

    if (file !== undefined) {
      getPhotoFromFiles(event, file);
    }
  };
  const changeHandler2 = (event: any) => {
    event.preventDefault();
    let file = event.target.files[0];
    setFile(file);

    if (file !== undefined) {
      getPhotoFromFiles(event, file);
    }
  };

  const deleteImage = () => {
    setPhoto(undefined);
  };

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const form = new FormData();

    form.append("firstName", data.firstName);
    form.append("lastName", data.lastName);
    form.append("jobTitle", data.jobTitle);
    form.append("experience", data.experience);
    form.append("file", file);

    const response = await WorkerService.addWorker(form);

    if (response.status === 201) {
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
        firstName: "",
        lastName: "",
        photo: {},
        experience: "",
        jobTitle: "",
      });
      setFile({} as File);
      setPhoto(undefined);
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
            {/* Имя */}
            <div className={styles.inputWrapper}>
              <label htmlFor="firstName" className={styles.label}>
                Имя
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Иван"
                {...register("firstName", {
                  required: true,
                })}
                className={`${styles.textInput} ${styles.fullInput}`}
              />
            </div>
            {/* Фамилия */}
            <div className={styles.inputWrapper}>
              <label htmlFor="lastName" className={styles.label}>
                Фамилия
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Иванов"
                {...register("lastName", {
                  required: true,
                })}
                className={`${styles.textInput} ${styles.fullInput}`}
              />
            </div>

            <div className={styles.string}>
              {/* Должность */}
              <div className={styles.inputWrapper}>
                <label htmlFor="jobTitle" className={styles.label}>
                  Должность
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  placeholder="Менеджер"
                  {...register("jobTitle", {
                    required: true,
                  })}
                  className={styles.textInput}
                />
              </div>

              {/* Опыт работы */}
              <div className={styles.inputWrapper}>
                <label htmlFor="experience" className={styles.label}>
                  Опыт работы
                </label>
                <input
                  type="text"
                  id="experience"
                  placeholder="15 лет"
                  {...register("experience", {
                    required: true,
                  })}
                  className={styles.textInput}
                />
              </div>
            </div>

            {/* Фото профиля */}
            <div className={styles.inputWrapper}>
              <label className={styles.label}>Фото профиля</label>
              <input
                id="photo"
                type="file"
                {...register("photo", {
                  value: photo,
                  required: true,
                })}
                required
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className={styles.inputPhotos}
                onChange={(event) => changeHandler2(event)}
                onDragStart={(event) => dragStartHandler2(event)}
                onDragLeave={(event) => dragLeaveHandler2(event)}
                onDragOver={(event) => dragStartHandler2(event)}
                onDrop={(event) => dropHandler2(event)}
              />
              <label htmlFor="photo" className={styles.labelPhotos}>
                {!drag
                  ? "Нажмите или перетащите изображения"
                  : "Отпустите изображения"}
              </label>
            </div>

            {/* Предпросмотр фото */}
            {photo !== undefined && (
              <div className={styles.photosPreview}>
                <div className={styles.photo}>
                  <img
                    src={photo.src}
                    alt={photo.src}
                    className={styles.previewPhoto}
                  />
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={deleteImage}
                  >
                    ×
                  </button>
                  <p className={styles.photoTitle}>{photo.title}</p>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default NewWorkerPage;
