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
import { type IArticle } from "@/types/IArticle";
import { IError } from "@/types/IError";
import EditorButtons from "@/widgets/EditorButtons/EditorButtons";
import { Image as EditorImage } from "@tiptap/extension-image";
import { Link as EditorLink } from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "next/link";
import { useParams } from "next/navigation";

// Поля формы
interface TInputs {
  title: string;
  description: string;
  onMainPage: boolean;
  link: string;
  viewCount: number;
  meta: IMeta;
}

// Тексты
const texts = {
  notFoundText: "Статья не найдена",
  buttonText: "Изменить",
  titleText: "Изменить статью",
  addOrChangeErrorText: "Ошибка изменения статьи. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Статья успешно изменена",
};

const EditArticlePage = () => {
  const path = useParams();

  const { register, handleSubmit, reset, setValue, getValues } =
    useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const articleStore = useAppSelector((store) => store.articles);

  const [photo, setPhoto] = useState<any>();
  const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File>({} as File);
  const [isOkSlug, setIsOkSlug] = useState(true);
  const [article, setArticle] = useState<IArticle>({} as IArticle);

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
    content: article.content || articleStore.article.content,
  });

  // Ошибка
  const [error, setError] = useState<IError>({ isError: false, value: "" });

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

  useEffect(() => {
    editor?.commands.setContent(article.content);
  }, [editor, article.content]);

  const checkSlug = async (value: string) => {
    if (article.link && article.link === value) {
      setIsOkSlug(true);
      setError({
        isError: false,
        value: "",
      });
      return;
    }

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

  if (!path || !path.id) {
    return (
      <div className={styles.kitchensPage}>
        <div className={styles.container}>
          <p className={styles.title}>{texts.notFoundText}</p>
          <Link href="/admin/articles">Назад</Link>
        </div>
      </div>
    );
  }

  const getProduct = async (id: string) => {
    const articleById = articleStore.articles.find(
      (article) => article._id === path.id,
    );

    if (articleById) {
      setArticle(articleById);
      setPhoto(articleById.preview);

      setValue("title", articleById.title);
      setValue("description", articleById.description);
      setValue("viewCount", articleById.viewCount);

      if (articleById.meta && articleById.meta.title) {
        setValue("meta.title", articleById.meta.title);
      }
      if (articleById.meta && articleById.meta.description) {
        setValue("meta.description", articleById.meta.description);
      }
      if (articleById.meta && articleById.meta.keywords) {
        setValue("meta.keywords", articleById.meta.keywords);
      }

      if (articleById.link) {
        setValue("link", articleById.link);
      }

      // setValue("viewCount", articleById.viewCount);

      setValue("onMainPage", articleById.onMainPage);

      editor?.commands.setContent(articleById.content);
    } else {
      if (typeof path.id === "string") {
        try {
          const articlePayload = await ArticleService.getArticle(path.id);

          setArticle(articlePayload);
          setPhoto(articlePayload.preview);

          if (articlePayload.link) {
            setValue("link", articlePayload.link);
          }

          setValue("title", articlePayload.title);
          setValue("description", articlePayload.description);
          setValue("viewCount", articlePayload.viewCount);
          setValue("onMainPage", articlePayload.onMainPage);

          if (articlePayload.meta && articlePayload.meta.title) {
            setValue("meta.title", articlePayload.meta.title);
          }
          if (articlePayload.meta && articlePayload.meta.description) {
            setValue("meta.description", articlePayload.meta.description);
          }
          if (articlePayload.meta && articlePayload.meta.keywords) {
            setValue("meta.keywords", articlePayload.meta.keywords);
          }

          editor?.commands.setContent(articlePayload.content);
        } catch (error) {
          setError({
            isError: true,
            value: texts.addOrChangeErrorText,
          });
        }
      }
    }
  };

  if (!editor) {
    return null;
  }

  const changeSlugPlaceholder = (title: string) => {
    const slugInput = document.querySelector("#link");
    if (!slugInput) {
      return;
    }

    const slug = Texter.slugify(title);

    slugInput.setAttribute("placeholder", slug);
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

    const newArticle: any = {
      title: data.title,
      content: editor.getHTML(),
      description: data.description,
      onMainPage: data.onMainPage,
      updatedAt: new Date().toISOString(),
      viewCount: data.viewCount,
      meta: data.meta,
    };

    if (data.link) {
      newArticle.link = data.link.split(" ").join("-");
    }

    try {
      const response = await ArticleService.updateArticle(
        article._id,
        newArticle,
      );
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
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
      editor.commands.setContent("");
      setFile({} as File);
      setPhoto(undefined);
    } catch (error) {
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
                onChange: (event) => {
                  debounceCheckSlug(event.target.value);
                },
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
              placeholder="Угловая кухня | Твоя кухня (не должен совпадать с названием кухни)"
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
              Кол-во просмотров
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
          </div>

          {/* Предпросмотр фото */}
          {photo && (
            <div className={styles.photosPreview}>
              <div className={styles.photoHeader}>
                <img src={photo} alt={photo} className={styles.previewPhoto} />
                <p className={styles.photoTitle}>{photo}</p>
              </div>
            </div>
          )}

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
        </form>

        <EditorContent editor={editor} className={styles.editor}>
          <EditorButtons editor={editor} setLink={setLink} />
        </EditorContent>
        {/* Форма */}
      </div>
    </div>
  );
};

export default EditArticlePage;
