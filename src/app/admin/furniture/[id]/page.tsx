"use client";

import styles from "../../Page.module.scss";

import FurnitureService from "@/services/admin/FurnitureService";
import MiniLoading from "@/shared/MiniLoading";
import { dropOrChangeHandler } from "@/shared/helpers/dragHandlers";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import { IError } from "@/types/IError";
import { IFurniture } from "@/types/IFurniture";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface TInputs {
  name: string;
  slug: string;
  description: string;
  price: number;
  photos: ImageData[] | string[];
}

// Тексты
const texts = {
  notFoundText: "Мебель не найдена",
  buttonText: "Изменить",
  titleText: "Изменить мебель",
  addOrChangeErrorText: "Ошибка изменения мебели. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Мебель успешно изменена",
};

const EditFurniturePage = () => {
  const path = useParams();

  const { register, handleSubmit, reset, setValue } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const furnitureStore = useAppSelector((store) => store.furniture);

  const [photos, setPhotos] = useState<any[]>([]);
  const [newPhotos, setNewPhotos] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [drag, setDrag] = useState(false);

  // Ошибка
  const [error, setError] = useState<IError>({ isError: false, value: "" });

  const [furniture, setFurniture] = useState<IFurniture>({} as IFurniture);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  useEffect(() => {
    if (path && typeof path.id === "string") {
      getProduct(path.id);
    }
  }, []);

  // Обработчик фото
  const getPhotosFromFiles = (event: any, files: any[]) => {
    const photos: any[] = [];

    files.map((file) => {
      let photo = {
        title: file.name,
        src: URL.createObjectURL(file),
      };

      photos.push(photo);
    });

    setNewPhotos(photos);
  };

  // Обработчики
  const dragStartHandler = (event: any) => {
    event.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (event: any) => {
    event.preventDefault();
    setDrag(false);
  };
  const dropHandler = (event: any) => {
    event.preventDefault();
    setDrag(false);
    let files = [...event.dataTransfer.files];
    setFiles(files);

    if (files && files.length > 0) {
      getPhotosFromFiles(event, files);
    }
  };

  // Удалить изображение из существующего объекта
  const deleteImage = (photoTitle: string) => {
    const images = [...photos];

    const newPhotos = images.filter((image) => photoTitle !== image);

    setPhotos(newPhotos);
  };

  // Удалить изображение из нового объекта
  const deleteNewImage = (photoTitle: string) => {
    const images = [...newPhotos];

    const result = images.filter((image) => photoTitle !== image.title);
    const newFiles = files.filter((file) => photoTitle !== file.name);

    setFiles(newFiles);
    setNewPhotos(result);
  };

  if (!path || !path.id) {
    return (
      <div className={styles.kitchensPage}>
        <div className={styles.container}>
          <p className={styles.title}>{texts.notFoundText}</p>
          <Link href="/admin/furniture">Назад</Link>
        </div>
      </div>
    );
  }

  const getProduct = async (slug: string) => {
    const furnitureBySlug = furnitureStore.allFurniture.find(
      (furniture) => furniture.slug === path.id,
    );

    if (furnitureBySlug) {
      setPhotos(furnitureBySlug.photos);
      setFurniture(furnitureBySlug);

      setValue("name", furnitureBySlug.name);
      setValue("slug", furnitureBySlug.slug);
      setValue("description", furnitureBySlug.description);
      setValue("price", furnitureBySlug.price);
    } else {
      if (typeof path.id === "string") {
        try {
          const furniturePayload = await FurnitureService.getOneFurniture(
            path.id,
          );

          setFurniture(furniturePayload);
          setPhotos(furniturePayload.photos);

          setValue("name", furniturePayload.name);
          setValue("slug", furniturePayload.slug);
          setValue("description", furniturePayload.description);
          setValue("price", furniturePayload.price);
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
    if (!photos.length && !newPhotos.length) {
      setError({
        isError: true,
        value: "Добавьте хотя бы одну фотографию",
      });
      return;
    }

    setError({
      isError: false,
      value: "",
    });

    const form = new FormData();

    form.append("name", data.name);
    form.append("slug", data.slug);
    form.append("description", data.description);
    form.append("price", data.price.toString());

    const oldPhotos = photos.map((photo: string) => photo.split("/").at(-1));
    form.append("photos", JSON.stringify(oldPhotos));

    // Добавление новых фото
    files.forEach((file) => {
      form.append(`files`, file);
    });

    const response = await FurnitureService.updateFurniture(
      furniture.slug,
      form,
    );

    if (response.status === 200) {
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
        description: "",
        photos: [],
        price: 0,
        slug: "",
        name: "",
      });
      setFiles([]);
      setPhotos([]);
      setNewPhotos([]);
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
        <div className={styles.string}>
          <h2 className={styles.title}>{texts.titleText}</h2>
          <button type="submit" form="kitchenForm" className={styles.addButton}>
            {texts.buttonText}
          </button>
        </div>
        <div className={styles.string}>
          <p className={isSuccess(error)}>{error.value}</p>
        </div>

        {/* Форма */}
        <form
          className={styles.addForm}
          id="kitchenForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Заголовок */}
          <div className={styles.inputWrapper}>
            <label htmlFor="name" className={styles.label}>
              Название
            </label>
            <input
              type="text"
              id="name"
              placeholder="Название кухни"
              defaultValue={furniture.name}
              {...register("name", {
                required: true,
              })}
              className={`${styles.textInput} ${styles.fullInput}`}
            />
          </div>
          <div className={styles.string}>
            {/* Цена */}
            <div className={styles.inputWrapper}>
              <label htmlFor="price" className={styles.label}>
                Цена
              </label>
              <input
                type="number"
                id="price"
                placeholder="249999"
                defaultValue={furniture.price}
                {...register("price", {
                  required: true,
                })}
                className={styles.textInput}
              />
            </div>
          </div>

          {/* Ссылка */}
          <div className={styles.inputWrapper}>
            <label htmlFor="slug" className={styles.label}>
              Ссылка
            </label>
            <input
              type="text"
              id="slug"
              placeholder="Ссылка на мебель (shkaf)"
              {...register("slug", {
                required: true,
              })}
              className={`${styles.textInput} ${styles.fullInput}`}
            />
          </div>

          {/* Описание */}
          <div className={styles.inputWrapper}>
            <label htmlFor="description" className={styles.label}>
              Описание
            </label>
            <textarea
              id="description"
              placeholder="Описание"
              defaultValue={furniture.description}
              {...register("description", {
                required: true,
              })}
              className={styles.textArea}
            />
          </div>

          {/* Предпросмотр фото */}
          {photos && photos.length > 0 && (
            <div className={styles.photosPreview}>
              {photos.map((photo, index) => (
                <div className={styles.photo} key={index}>
                  <img
                    src={photo}
                    draggable={false}
                    alt={`Фото ${index + 1}`}
                    className={styles.previewPhoto}
                  />
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => deleteImage(photo)}
                  >
                    ×
                  </button>
                  <p className={styles.photoTitle}>{photo}</p>
                </div>
              ))}
            </div>
          )}

          {/* Добавить фото */}
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Фото</label>
            <input
              id="photos"
              type="file"
              {...register("photos", {
                value: photos,
              })}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              multiple
              className={styles.inputPhotos}
              onChange={(event) =>
                dropOrChangeHandler(
                  event,
                  files,
                  setDrag,
                  setFiles,
                  setNewPhotos,
                )
              }
              onDragStart={(event) => dragStartHandler(event)}
              onDragLeave={(event) => dragLeaveHandler(event)}
              onDragOver={(event) => dragStartHandler(event)}
              onDrop={(event) => dropHandler(event)}
            />
            <label htmlFor="photos" className={styles.labelPhotos}>
              {!drag ? "Добавить новые фото" : "Отпустите изображения"}
            </label>
          </div>

          {/* Предпросмотр новых фото */}
          {newPhotos && newPhotos.length > 0 && (
            <>
              <label className={styles.label}>Новые фото</label>
              <div className={styles.photosPreview}>
                {newPhotos.map((photo, index) => (
                  <div className={styles.photo} key={index}>
                    <img
                      src={photo.src}
                      draggable={false}
                      alt={`Фото ${index + 1}`}
                      className={styles.previewPhoto}
                    />
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => deleteNewImage(photo.title)}
                    >
                      ×
                    </button>
                    <p className={styles.photoTitle}>{photo.title}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditFurniturePage;
