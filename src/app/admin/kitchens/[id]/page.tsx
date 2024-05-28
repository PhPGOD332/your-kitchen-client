"use client";

import { Texter } from "@/features/Texter";
import styles from "../../Page.module.scss";

import KitchenService from "@/services/admin/KitchenService";
import MiniLoading from "@/shared/MiniLoading";
import { dropOrChangeHandler } from "@/shared/helpers/dragHandlers";
import { useDebouncedCallback } from "@/shared/helpers/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import { IError } from "@/types/IError";
import { IKitchen } from "@/types/IKitchen";
import {
  KitchensOptions,
  KitchensStyles,
  kitchensStylesTranslate,
  kitchensTranslate,
} from "@/types/KitchenOptions";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import EditorButtons from "@/widgets/EditorButtons/EditorButtons";
import { Image as EditorImage } from "@tiptap/extension-image";
import { Link as EditorLink } from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
  type KeyboardEventHandler,
} from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";

interface ISelectOptions {
  value: string;
  label: string;
}
interface IReadonlySelectOptions {
  readonly value: string;
  readonly label: string;
}

const kitchensStyles: ISelectOptions[] = [
  { value: KitchensOptions.chalet, label: kitchensTranslate.chalet },
  { value: KitchensOptions.classic, label: kitchensTranslate.classic },
  { value: KitchensOptions.hightech, label: kitchensTranslate.hightech },
  { value: KitchensOptions.loft, label: kitchensTranslate.loft },
  { value: KitchensOptions.minimalism, label: kitchensTranslate.minimalism },
  { value: "Модерн", label: "Модерн" },
  { value: "Современный", label: "Современный" },
  { value: "Прованс", label: "Прованс" },
  { value: "Скандинавский", label: "Скандинавский" },
];

const kitchensTypes: ISelectOptions[] = [
  { value: KitchensStyles.straight, label: kitchensStylesTranslate.straight },
  { value: KitchensStyles.corner, label: kitchensStylesTranslate.corner },
  { value: KitchensStyles.UShaped, label: kitchensStylesTranslate.UShaped },
  { value: KitchensStyles.fullWidth, label: kitchensStylesTranslate.fullWidth },
];

const createOption = (label: string) => ({
  label,
  value: label,
});

// Поля формы
interface TInputs {
  title: string;
  description: string;
  price: number;
  style: unknown | IReadonlySelectOptions;
  photos: ImageData[];
  type: unknown | IReadonlySelectOptions;
  term: string;
  onMainPage: boolean;
  slug: string;
  meta: {
    description?: string;
    title?: string;
    keywords?: string;
  };
}

// Тексты
const texts = {
  notFoundText: "Кухня не найдена",
  buttonText: "Изменить",
  titleText: "Изменить кухню",
  addOrChangeErrorText: "Ошибка изменения кухни. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Кухня успешно изменена",
};

const EditKitchenPage = () => {
  const path = useParams();

  const { register, handleSubmit, control, reset, setValue, getValues } =
    useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const kitchenStore = useAppSelector((store) => store.kitchens);

  const [photos, setPhotos] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [newPhotos, setNewPhotos] = useState<any[]>([]);
  const [drag, setDrag] = useState(false);

  // Стейты для select
  const [inputValue, setInputValue] = useState("");
  const [value3, setValue3] = useState<
    readonly IReadonlySelectOptions[] | unknown[]
  >([]);
  // Стейты для select 2
  const [inputValue2, setInputValue2] = useState("");
  const [value2, setValue2] = useState<
    readonly IReadonlySelectOptions[] | unknown[]
  >([]);
  // Ошибка
  const [error, setError] = useState<IError>({ isError: false, value: "" });

  // Срок
  const [termValue, setTermValue] = useState("");

  const [kitchen, setKitchen] = useState<IKitchen>({} as IKitchen);
  const [isOkSlug, setIsOkSlug] = useState(true);

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
    content: kitchen.description || kitchenStore.kitchen.description,
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  const checkSlug = async (value: string) => {
    if (kitchen.slug && kitchen.slug === value) {
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

    const response = await KitchenService.checkSlug(value);

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
      setValue("slug", Texter.slugify(title));
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

  useEffect(() => {
    if (path && typeof path.id === "string") {
      getProduct(path.id);
    }
  }, []);

  useEffect(() => {
    editor?.commands.setContent(kitchen.description);
  }, [editor, kitchen.description]);

  if (!path || !path.id) {
    return (
      <div className={styles.kitchensPage}>
        <div className={styles.container}>
          <p className={styles.title}>{texts.notFoundText}</p>
          <Link href="/admin/kitchens">Назад</Link>
        </div>
      </div>
    );
  }

  const getProduct = async (id: string) => {
    const kitchenById = kitchenStore.kitchens.find(
      (kitchen) => kitchen._id === path.id,
    );

    if (kitchenById) {
      setPhotos(kitchenById.photos);
      setKitchen(kitchenById);

      setValue("title", kitchenById.title);
      setValue("description", kitchenById.description);
      setValue("price", kitchenById.price);
      setValue("style", kitchenById.style);
      if (kitchenById.onMainPage) {
        setValue("onMainPage", kitchenById.onMainPage);
      }
      setValue("term", kitchenById.term);
      setValue("type", kitchenById.type);
      setValue("slug", kitchenById.slug);
      setValue("meta.description", kitchenById.meta.description);
      setValue("meta.keywords", kitchenById.meta.keywords);
      setValue("meta.title", kitchenById.meta.title);
    } else {
      if (typeof path.id === "string") {
        try {
          const kitchenPayload = await KitchenService.getKitchen(path.id);

          setKitchen(kitchenPayload);
          setPhotos(kitchenPayload.photos);

          setValue("title", kitchenPayload.title);
          setValue("description", kitchenPayload.description);
          setValue("price", kitchenPayload.price);
          setValue("style", kitchenPayload.style);
          if (kitchenPayload.onMainPage) {
            setValue("onMainPage", kitchenPayload.onMainPage);
          }
          setValue("term", kitchenPayload.term);
          setValue("type", kitchenPayload.type);
          setValue("slug", kitchenPayload.slug);
          setValue("meta.description", kitchenPayload.meta.description);
          setValue("meta.keywords", kitchenPayload.meta.keywords);
          setValue("meta.title", kitchenPayload.meta.title);
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

  const changeSlugPlaceholder = (title: string) => {
    const slugInput = document.querySelector("#slug");
    if (!slugInput) {
      return;
    }

    const slug = Texter.slugify(title);

    slugInput.setAttribute("placeholder", slug);
  };

  // Обработка нажатия enter в select
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue3((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };
  // Обработка нажатия enter в select 2
  const handleKeyDown2: KeyboardEventHandler = (event) => {
    if (!inputValue2) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue2((prev) => [...prev, createOption(inputValue2)]);
        setInputValue2("");
        event.preventDefault();
    }
  };

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

    if (error.isError) {
      return;
    }

    if (!isOkSlug) {
      return;
    }

    const form = new FormData();

    form.append("title", data.title);
    form.append("description", editor.getHTML());
    form.append("price", data.price.toString());
    form.append("style", JSON.stringify(data.style));
    form.append("onMainPage", JSON.stringify(data.onMainPage));
    form.append("type", JSON.stringify(data.type));
    form.append("term", data.term);
    form.append("slug", data.slug);
    form.append("meta", JSON.stringify(data.meta));

    const oldPhotos = photos.map((photo: string) => photo.split("/").at(-1));
    form.append("photos", JSON.stringify(oldPhotos));

    // Добавление новых фото
    files.forEach((file) => {
      form.append(`files`, file);
    });

    const response = await KitchenService.updateKitchen(kitchen._id, form);
    if (response.status === 200) {
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
        description: "",
        photos: [],
        price: 0,
        style: "",
        term: "",
        onMainPage: false,
        title: "",
        type: "",
        meta: {
          description: "",
          title: "",
          keywords: "",
        },
        slug: "",
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
            <label htmlFor="title" className={styles.label}>
              Название
            </label>
            <input
              type="text"
              id="title"
              placeholder="Название кухни"
              defaultValue={kitchen.title}
              {...register("title", {
                required: true,
                onChange: (event) => changeSlugPlaceholder(event.target.value),
              })}
              className={`${styles.textInput} ${styles.fullInput}`}
            />
          </div>

          {/* slug */}
          <div className={styles.inputWrapper}>
            <label htmlFor="slug" className={styles.label}>
              Ссылка
            </label>
            <input
              type="text"
              id="slug"
              placeholder="kitchen-1-super"
              {...register("slug", {
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
                defaultValue={kitchen.price}
                {...register("price", {
                  required: true,
                })}
                className={styles.textInput}
              />
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

          {/* Срок */}
          <div className={styles.inputWrapper}>
            <label htmlFor="term" className={styles.label}>
              Срок
            </label>
            <input
              type="text"
              placeholder="21 день"
              id="term"
              defaultValue={kitchen.term}
              {...register("term", {
                required: true,
                onChange: (event) => {
                  setTermValue(event.target.value);
                },
              })}
              className={styles.textInput}
            />
            <div className={styles.clue}>
              <p>Будет отображаться так:</p>
              <p>Срок {`${termValue || kitchen.term}`}</p>
            </div>
          </div>

          <EditorContent editor={editor} className={styles.editor}>
            <EditorButtons editor={editor} setLink={setLink} />
          </EditorContent>

          {/* Стиль кухни */}
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Стиль кухни</label>
            <Controller
              control={control}
              name="style"
              render={({ field }) => (
                <CreatableSelect
                  className={styles.select}
                  components={components}
                  options={kitchensStyles}
                  value={field.value}
                  defaultValue={kitchen.style}
                  isSearchable
                  onChange={(newValue) => field.onChange(newValue)}
                  onInputChange={(newValue) => setInputValue(newValue)}
                  onKeyDown={handleKeyDown}
                  placeholder="Стиль кухни"
                />
              )}
            />
          </div>

          {/* Тип кухни */}
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Тип кухни</label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <CreatableSelect
                  className={styles.select}
                  components={components}
                  options={kitchensTypes}
                  value={field.value}
                  defaultValue={kitchen.type}
                  isSearchable
                  onChange={(newValue) => field.onChange(newValue)}
                  onInputChange={(newValue) => setInputValue2(newValue)}
                  onKeyDown={handleKeyDown2}
                  placeholder="Тип кухни"
                />
              )}
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

export default EditKitchenPage;
