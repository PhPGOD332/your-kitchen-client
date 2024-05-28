"use client";

import styles from "../../Page.module.scss";

import GalleryService from "@/services/admin/GalleryService";
import MiniLoading from "@/shared/MiniLoading";
import { deleteImage } from "@/shared/helpers/deleteImage";
import {
  dragLeaveHandler,
  dragStartHandler,
  dropOrChangeHandler,
} from "@/shared/helpers/dragHandlers";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import { IError } from "@/types/IError";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Тексты
const texts = {
  buttonText: "Добавить",
  titleText: "Добавить фото",
  addOrChangeErrorText: "Ошибка добавления фото. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Фото успешно добавлены",
};

const NewPhotosPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [photos, setPhotos] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);

  // Ошибка
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

  const onSubmit = async () => {
    const form = new FormData();

    // Добавление всех фото
    files.forEach((file) => {
      form.append(`files`, file);
    });

    const response = await GalleryService.addPhotos(form);

    if (response.status === 201) {
      setError({
        isError: false,
        value: texts.successText,
      });
      setFiles([]);
      setPhotos([]);
    } else {
      setError({
        isError: true,
        value: texts.addOrChangeErrorText,
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
        <div className={styles.string}>
          <h2 className={styles.title}>{texts.titleText}</h2>
          <button
            type="submit"
            className={styles.addButton}
            onClick={handleSubmit(onSubmit)}
          >
            {texts.buttonText}
          </button>
        </div>
        <div className={styles.string}>
          <p className={isSuccess(error)}>{error.value}</p>
        </div>
        {/* Форма */}
        <form className={styles.addForm} onSubmit={handleSubmit(onSubmit)}>
          {/* Фото */}
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Фото</label>
            <input
              id="photos"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              multiple
              className={styles.inputPhotos}
              required
              onChange={(event) =>
                dropOrChangeHandler(event, files, setDrag, setFiles, setPhotos)
              }
              onDragStart={(event) => dragStartHandler(event, setDrag)}
              onDragLeave={(event) => dragLeaveHandler(event, setDrag)}
              onDragOver={(event) => dragStartHandler(event, setDrag)}
              onDrop={(event) =>
                dropOrChangeHandler(event, files, setDrag, setFiles, setPhotos)
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
      </div>
    </div>
  );
};

export default NewPhotosPage;
