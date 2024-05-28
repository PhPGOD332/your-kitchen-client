"use client";

import styles from "../../Page.module.scss";

import MiniLoading from "@/shared/MiniLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { ReviewService } from "@/services/admin/ReviewService";
import type { IError } from "@/types/IError";
import type { IReview } from "@/types/IReview";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  buttonText: "Изменить",
  titleText: "Изменить отзыв",
  addOrChangeErrorText: "Ошибка изменения отзыва. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Отзыв успешно изменен",
};

const EditReviewPage = () => {
  const path = useParams();

  const { register, handleSubmit, reset, setValue } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const reviewStore = useAppSelector((store) => store.reviews);

  const [photos, setPhotos] = useState<any[]>([]);
  const [photo, setPhoto] = useState<any>();
  const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File>({} as File);

  // Ошибка
  const [error, setError] = useState<IError>({ isError: false, value: "" });
  const [review, setReview] = useState<IReview>({} as IReview);

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

  if (!path || !path.id) {
    return (
      <div className={styles.kitchensPage}>
        <div className={styles.container}>
          <p className={styles.title}>{texts.notFoundText}</p>
          <Link href="/admin/reviews">Назад</Link>
        </div>
      </div>
    );
  }

  const getProduct = async (id: string) => {
    const reviewById = reviewStore.reviews.find(
      (review) => review._id === path.id,
    );

    if (reviewById) {
      setPhotos(reviewById.photos);
      if (reviewById.photo) {
        setPhoto(reviewById.photo);
      }
      setReview(reviewById);

      setValue("firstName", reviewById.firstName);
      if (reviewById.lastName) {
        setValue("lastName", reviewById.lastName);
      }
      setValue("text", reviewById.text);
    } else {
      if (typeof path.id === "string") {
        try {
          const reviewPayload = await ReviewService.getReview(path.id);

          setReview(reviewPayload);
          setPhotos(reviewPayload.photos);
          if (reviewPayload.photo) {
            setPhoto(reviewPayload.photo);
          }

          setValue("firstName", reviewPayload.firstName);
          if (reviewPayload.lastName) {
            setValue("lastName", reviewPayload.lastName);
          }
          setValue("text", reviewPayload.text);
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
    const form = new FormData();

    form.append("firstName", data.firstName);

    if (data.lastName) {
      form.append("lastName", data.lastName);
    }

    form.append("text", data.text);

    const response = await ReviewService.updateReview(review._id, form);

    if (response.status === 200) {
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
        photos: [],
        firstName: "",
        lastName: "",
        photo: {} as ImageData,
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
          {review.photo && (
            <div className={styles.inputWrapper}>
              <label className={styles.label}>Фото профиля</label>
            </div>
          )}

          {/* Предпросмотр фото */}
          {photo !== undefined && (
            <div className={styles.photosPreview}>
              <div className={styles.photo}>
                <img src={photo} alt={photo} className={styles.previewPhoto} />
                <p className={styles.photoTitle}>{photo}</p>
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
          </div>

          {/* Предпросмотр фото */}
          {photos.length > 0 && (
            <div className={styles.photosPreview}>
              {photos.map((photo, index) => (
                <div className={styles.photo} key={index}>
                  <img
                    src={photo}
                    alt={`Фото ${index + 1}`}
                    className={styles.previewPhoto}
                  />
                  <p className={styles.photoTitle}>{photo}</p>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditReviewPage;
