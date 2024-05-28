"use client";

import styles from "../../Page.module.scss";

import MiniLoading from "@/shared/MiniLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { isUserHaveRights } from "@/features/isUserHaveRights";
import { ReviewService } from "@/services/admin/ReviewService";
import { deleteImage } from "@/shared/helpers/deleteImage";
import {
  dragLeaveHandler,
  dragStartHandler,
  dropOrChangeHandler,
} from "@/shared/helpers/dragHandlers";
import { IError } from "@/types/IError";
import { UserRoles } from "@/types/UserRoles";

// Поля формы
interface TInputs {
  photo?: ImageData;
  firstName: string;
  lastName?: string;
  text: string;
  photos: ImageData[];
}

// Тексты
const texts = {
  notFoundText: "Отзыв не найден",
  buttonText: "Добавить",
  titleText: "Добавить отзыв",
  addOrChangeErrorText: "Ошибка добавления отзыва. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Отзыв успешно добавлен",
};

const NewReviewPage = () => {
  const { register, handleSubmit, reset } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [photos, setPhotos] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [photo, setPhoto] = useState<any>();
  const [file, setFile] = useState<File>({} as File);
  const [drag, setDrag] = useState(false);
  const [drag2, setDrag2] = useState(false);

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
  const getPhotoFromFiles = (event: any, file: any) => {
    let photo = {
      title: file.name,
      src: URL.createObjectURL(file),
    };

    setPhoto(photo);
  };

  const dragStartHandler2 = (event: any) => {
    event.preventDefault();
    setDrag2(true);
  };
  const dragLeaveHandler2 = (event: any) => {
    event.preventDefault();
    setDrag2(false);
  };
  const dropHandler2 = (event: any) => {
    event.preventDefault();
    setDrag2(false);
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

  const deleteImage2 = () => {
    setPhoto(undefined);
  };

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const form = new FormData();

    form.append("firstName", data.firstName);

    if (data.lastName) {
      form.append("lastName", data.lastName);
    }

    if (file.name) {
      form.append("photo", JSON.stringify(true));
      form.append("files", file);
    }

    // Добавление всех фото
    files.forEach((file) => {
      form.append(`files`, file);
    });
    form.append("text", data.text);

    const response = await ReviewService.addReview(form);

    if (response.status === 201) {
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
        photos: [],
        firstName: "",
        lastName: "",
        photo: undefined,
        text: "",
      });
      setFiles([]);
      setFile({} as File);
      setPhoto(undefined);
      setPhotos([]);
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
                {...register("lastName")}
                className={`${styles.textInput} ${styles.fullInput}`}
              />
            </div>

            {/* Фото профиля */}
            <div className={styles.inputWrapper}>
              <label className={styles.label}>Фото профиля</label>
              <input
                id="photo"
                type="file"
                {...register("photo", {
                  value: photo,
                })}
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
            {photo && (
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
                    onClick={deleteImage2}
                  >
                    ×
                  </button>
                  <p className={styles.photoTitle}>{photo.title}</p>
                </div>
              </div>
            )}

            {/* Текст */}
            <div className={styles.inputWrapper}>
              <label htmlFor="text" className={styles.label}>
                Текст отзыва
              </label>
              <textarea
                id="text"
                placeholder="Текст отзыва"
                {...register("text", {
                  required: true,
                })}
                className={styles.textArea}
              />
            </div>

            {/* Фото */}
            <div className={styles.inputWrapper}>
              <label className={styles.label}>Фото отзыва</label>
              <input
                id="photos"
                type="file"
                {...register("photos", {
                  required: true,
                  value: photos,
                })}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                multiple
                className={styles.inputPhotos}
                required
                onChange={(event) =>
                  dropOrChangeHandler(
                    event,
                    files,
                    setDrag,
                    setFiles,
                    setPhotos,
                  )
                }
                onDragStart={(event) => dragStartHandler(event, setDrag)}
                onDragLeave={(event) => dragLeaveHandler(event, setDrag)}
                onDragOver={(event) => dragStartHandler(event, setDrag)}
                onDrop={(event) =>
                  dropOrChangeHandler(
                    event,
                    files,
                    setDrag,
                    setFiles,
                    setPhotos,
                  )
                }
              />
              <label htmlFor="photos" className={styles.labelPhotos}>
                {!drag
                  ? "Нажмите или перетащите изображения"
                  : "Отпустите изображения"}
              </label>
            </div>

            {/* Предпросмотр фото */}
            {photos.length > 0 && (
              <div className={styles.photosPreview}>
                {photos.map((photo, index) => (
                  <div className={styles.photo} key={index}>
                    <img
                      src={photo.src}
                      alt={`Фото ${index + 1}`}
                      className={styles.previewPhoto}
                    />
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() =>
                        deleteImage(
                          photos,
                          files,
                          photo.title,
                          setFiles,
                          setPhotos,
                        )
                      }
                    >
                      ×
                    </button>
                    <p className={styles.photoTitle}>{photo.title}</p>
                  </div>
                ))}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default NewReviewPage;
