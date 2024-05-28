"use client";

import styles from "../../Page.module.scss";

import MiniLoading from "@/shared/MiniLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { WorkerService } from "@/services/admin/WorkerService";
import { IError } from "@/types/IError";
import { IWorker } from "@/types/IWorker";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  buttonText: "Изменить",
  titleText: "Изменить карточку",
  addOrChangeErrorText: "Ошибка изменения карточки. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Карточка работника успешно изменена",
};

const EditWorkerPage = () => {
  const path = useParams();

  const { register, handleSubmit, reset, setValue } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const workerStore = useAppSelector((store) => store.workers);

  const [photo, setPhoto] = useState<any>();
  const [file, setFile] = useState<File>({} as File);

  // Ошибка
  const [error, setError] = useState<IError>({ isError: false, value: "" });
  const [worker, setWorker] = useState<IWorker>({} as IWorker);

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
          <Link href="/admin/team">Назад</Link>
        </div>
      </div>
    );
  }

  const getProduct = async (id: string) => {
    const workerById = workerStore.workers.find(
      (worker) => worker._id === path.id,
    );

    if (workerById) {
      setPhoto(workerById.photo);
      setWorker(workerById);

      setValue("firstName", workerById.firstName);
      setValue("lastName", workerById.lastName);
      setValue("experience", workerById.experience);
      setValue("jobTitle", workerById.jobTitle);
    } else {
      if (typeof path.id === "string") {
        try {
          const workerPayload = await WorkerService.getWorker(path.id);

          setWorker(workerPayload);
          setPhoto(workerPayload.photo);

          setValue("firstName", workerPayload.firstName);
          setValue("lastName", workerPayload.lastName);
          setValue("experience", workerPayload.experience);
          setValue("jobTitle", workerPayload.jobTitle);
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
    form.append("lastName", data.lastName);
    form.append("jobTitle", data.jobTitle);
    form.append("experience", data.experience);

    const response = await WorkerService.updateWorker(worker._id, form);

    if (response.status === 200) {
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
          </div>

          {/* Предпросмотр фото */}
          {photo !== undefined && (
            <div className={styles.photosPreview}>
              <div className={styles.photo}>
                <img src={photo} alt={photo} className={styles.previewPhoto} />
                <p className={styles.photoTitle}>{photo}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditWorkerPage;
