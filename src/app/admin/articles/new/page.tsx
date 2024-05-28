"use client";

import styles from "../../Page.module.scss";

import MiniLoading from "@/shared/MiniLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Texter } from "@/features/Texter";
import ArticleService from "@/services/admin/ArticleService";
import { useDebouncedCallback } from "@/shared/helpers/hooks";
import type { IMeta } from "@/types";
import { IError } from "@/types/IError";
import EditorButtons from "@/widgets/EditorButtons/EditorButtons";
import { Image as EditorImage } from "@tiptap/extension-image";
import { Link as EditorLink } from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Поля формы
interface TInputs {
  title: string;
  description: string;
  preview: string;
  onMainPage: boolean;
  viewCount: number;
  link: string;
  meta: IMeta;
}

// Тексты
const texts = {
  notFoundText: "Статья не найдена",
  buttonText: "Добавить",
  titleText: "Добавить статью",
  addOrChangeErrorText: "Ошибка добавления статьи. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Статья успешно добавлена",
};

const NewArticlePage = () => {
  const { register, handleSubmit, reset, setValue, getValues } =
    useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [photo, setPhoto] = useState<any>();
  const [file, setFile] = useState<File>({} as File);
  const [drag, setDrag] = useState(false);
  const [isOkSlug, setIsOkSlug] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      EditorImage,
      Underline,
      EditorLink.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `<h4>Здесь должен быть контент статьи</h4>`,
  });

  // Ошибка
  const [error, setError] = useState<IError>({ isError: false, value: "" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  const checkSlug = async (value: string) => {
    if (!value) {
      setIsOkSlug(false);
      return;
    }

    const response = await ArticleService.checkSlug(value);

    if (response.status === 404) {
      setError({
        isError: true,
        value: "Такая ссылка уже используется",
      });
      setIsOkSlug(false);
      return;
    }

    if (!response.data.valid) {
      setError({
        isError: true,
        value: "Такая ссылка уже используется",
      });
      setIsOkSlug(false);
      return;
    }
    setError({
      isError: false,
      value: "",
    });
    setIsOkSlug(true);
  };

  const debounceCheckSlug = useDebouncedCallback(checkSlug, 1000);

  const generateSlug = () => {
    const title = getValues("title");

    if (title) {
      setValue("link", Texter.slugify(title));
      checkSlug(Texter.slugify(title));
    }
  };

  const changeSlugPlaceholder = (title: string) => {
    const slugInput = document.querySelector("#link");
    if (!slugInput) {
      return;
    }

    const slug = Texter.slugify(title);

    slugInput.setAttribute("placeholder", slug);
  };

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) {
    return null;
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

  const deleteImage = () => {
    setPhoto({});
    setFile({} as File);
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
    if (error.isError) {
      return;
    }

    if (!isOkSlug) {
      return;
    }

    const form = new FormData();

    if (!file.name) {
      setError({
        isError: true,
        value: "Добавьте обложку!",
      });
      return;
    }

    form.append("title", data.title);
    form.append("description", data.description);
    form.append("files", file);
    form.append("link", data.link.split(" ").join("-"));
    form.append("content", editor.getHTML());
    form.append("onMainPage", JSON.stringify(data.onMainPage));
    form.append("viewCount", JSON.stringify(data.viewCount));
    form.append("author", userStore.user.email);
    form.append("meta", JSON.stringify(data.meta));

    try {
      const response = await ArticleService.addArticle(form);
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
        preview: "",
        title: "",
        viewCount: 0,
        onMainPage: false,
        description: "",
        link: "",
        meta: {
          description: "",
          title: "",
          keywords: "",
        },
      });
      setFile({} as File);
      setPhoto(undefined);
    } catch (error) {
      setError({
        isError: true,
        value: texts.errorText,
      });
    }
  };

  const changeHandler = (event: any) => {
    event.preventDefault();
    let file = event.target.files[0];
    setFile(file);

    if (file !== undefined) {
      getPhotoFromFiles(event, file);
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
            onClick={handleSubmit(onSubmit)}
            className={styles.addButton}
          >
            {texts.buttonText}
          </button>
        </div>
        <div className={styles.string}>
          <p className={isSuccess(error)}>{error.value}</p>
        </div>

        <form
          className={styles.addForm}
          id="kitchenForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Заголовок */}
          <div className={styles.inputWrapper}>
            <label htmlFor="title" className={styles.label}>
              Заголовок
            </label>
            <input
              type="text"
              id="title"
              placeholder="Заголовок"
              {...register("title", {
                required: true,
                onChange: (event) => changeSlugPlaceholder(event.target.value),
              })}
              className={`${styles.textInput} ${styles.fullInput}`}
            />
          </div>

          {/* Ссылка на статью */}
          <div className={styles.inputWrapper}>
            <label htmlFor="link" className={styles.label}>
              Ссылка
            </label>
            <input
              type="text"
              id="link"
              placeholder="Ссылка на статью, например (best-kitchens), пусто = автоматический id"
              {...register("link", {
                required: true,
                onChange: (event) => debounceCheckSlug(event.target.value),
              })}
              className={`${styles.textInput} ${styles.fullInput}`}
            />
          </div>

          <div className={styles.string}>
            <p className={isOkSlug ? styles.success : styles.error}>
              {isOkSlug
                ? "Ссылка доступна"
                : "Поле пустое или кухня с такой ссылкой уже существует"}
            </p>
            <button
              className={styles.addButton}
              onClick={generateSlug}
              type="button"
            >
              Сгенерировать ссылку
            </button>
          </div>

          {/* Описание */}
          <div className={styles.inputWrapper}>
            <label htmlFor="description" className={styles.label}>
              Описание
            </label>
            <textarea
              id="description"
              placeholder="Описание статьи (описание страницы)"
              {...register("description", {
                required: true,
              })}
              className={styles.textArea}
            />
          </div>

          {/* Мета заголовок */}
          <div className={styles.inputWrapper}>
            <label htmlFor="meta-title" className={styles.label}>
              Мета <br /> title
            </label>
            <input
              type="text"
              id="meta-title"
              placeholder="Статья | Твоя кухня (не должен совпадать с названием статьи)"
              {...register("meta.title")}
              className={`${styles.textInput} ${styles.fullInput}`}
            />
          </div>

          {/* Мета описание */}
          <div className={styles.inputWrapper}>
            <label htmlFor="meta-desc" className={styles.label}>
              Мета <br /> описание
            </label>
            <textarea
              id="meta-desc"
              placeholder="Описание"
              {...register("meta.description")}
              className={styles.textArea}
            />
          </div>

          {/* Мета ключевые слоа */}
          <div className={styles.inputWrapper}>
            <label htmlFor="meta-keywords" className={styles.label}>
              Ключевые <br /> слова
            </label>
            <textarea
              id="meta-keywords"
              placeholder="Кухня, кухня дешевая, угловая кухня на заказ"
              {...register("meta.keywords")}
              className={styles.textArea}
            />
          </div>

          {/* Количество просмотров */}
          <div className={styles.inputWrapper}>
            <label htmlFor="title" className={styles.label}>
              Изначально кол-во просмотров
            </label>
            <input
              type="number"
              id="viewCount"
              placeholder="350"
              {...register("viewCount")}
              className={styles.textInput}
            />
          </div>

          {/* Обложка */}
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Обложка</label>
            <input
              id="photo"
              type="file"
              {...register("preview", {
                value: photo,
              })}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className={styles.inputPhotos}
              onChange={(event) => changeHandler(event)}
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

          {/* На главной */}
          <div className={styles.inputWrapper}>
            <label htmlFor="onMainPage" className={styles.label}>
              На главной странице
            </label>
            <input
              type="checkbox"
              {...register("onMainPage")}
              id="onMainPage"
              className={styles.checkboxInput}
            />
          </div>

          {/* Предпросмотр фото */}
          {photo && photo.src && (
            <div className={styles.photosPreview}>
              <div className={styles.photoHeader}>
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

        <EditorContent editor={editor} className={styles.editor}>
          <EditorButtons editor={editor} setLink={setLink} />
        </EditorContent>
        {/* Форма */}
      </div>
    </div>
  );
};

export default NewArticlePage;
