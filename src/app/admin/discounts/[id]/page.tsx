"use client";

import DiscountService from "@/services/admin/DiscountService";
import styles from "../../Page.module.scss";

import { isUserHaveRights } from "@/features/isUserHaveRights";
import MiniLoading from "@/shared/MiniLoading";
import { pagesLinks } from "@/shared/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import type { IDiscount } from "@/types/IDiscount";
import type { IError } from "@/types/IError";
import { UserRoles } from "@/types/UserRoles";
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
import ReactInputMask from "react-input-mask";
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
const discountsTypes: ISelectOptions[] = [
  { value: "promotion", label: "Акция" },
  { value: "gift", label: "Подарок" },
  { value: "discount", label: "Скидка" },
];

const createOption = (label: string) => ({
  label,
  value: label,
});

// Поля формы
interface TInputs {
  name: string;
  description: string;
  conditions?: string;
  image: ImageData;
  slug: string;
  type: IReadonlySelectOptions;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// Тексты
const texts = {
  notFoundText: "Акция не найдена",
  buttonText: "Изменить",
  titleText: "Изменить акцию",
  addOrChangeErrorText: "Ошибка изменения акции. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Акция успешно изменена",
};

const EditDiscountPage = () => {
  const path = useParams();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const discountStore = useAppSelector((store) => store.discounts);

  const [photo, setPhoto] = useState<any>(undefined);
  const [file, setFile] = useState<File>({} as File);
  const [drag, setDrag] = useState(false);

  // Стейты для select
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState<ISelectOptions[] | unknown[]>(
    [],
  );

  // Ошибка
  const [error, setError] = useState<IError>({ isError: false, value: "" });

  const [discount, setDiscount] = useState<IDiscount>({} as IDiscount);

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
    content: discount.conditions || discountStore.discount.conditions,
  });

  useEffect(() => {
    if (discount.conditions) {
      editor?.commands.setContent(discount.conditions);
    }
  }, [editor, discount.conditions]);

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
          <Link href={pagesLinks.adminDiscounts}>Назад</Link>
        </div>
      </div>
    );
  }

  const getProduct = async (id: string) => {
    const productById = discountStore.discounts.find(
      (discount) => discount.slug === path.id,
    );

    if (productById) {
      setPhoto({
        title: productById.image.split("/").at(-1),
        src: productById.image,
      });
      setDiscount(productById);

      setValue("name", productById.name);
      setValue("description", productById.description);
      setValue("endDate", productById.endDate);
      setValue("startDate", productById.startDate);
      setValue("isActive", productById.isActive);
      setValue("slug", productById.slug);

      const needType = discountsTypes.find(
        (type) => type.value === productById.type,
      );
      if (needType) {
        setValue("type", needType);
      }

      if (productById.conditions) {
        editor?.commands.setContent(productById.conditions);
      }
    } else {
      if (typeof path.id === "string") {
        try {
          const productPayload = await DiscountService.getDiscount(path.id);

          setDiscount(productPayload);
          setPhoto({
            title: productPayload.image.split("/").at(-1),
            src: productPayload.image,
          });

          setValue("name", productPayload.name);
          setValue("description", productPayload.description);
          setValue("endDate", productPayload.endDate);
          setValue("startDate", productPayload.startDate);
          setValue("isActive", productPayload.isActive);
          setValue("slug", productPayload.slug);

          const needType = discountsTypes.find(
            (type) => type.value === productPayload.type,
          );
          if (needType) {
            setValue("type", needType);
          }

          if (productPayload.conditions) {
            editor?.commands.setContent(productPayload.conditions);
          }
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

  // Обработчик фото
  // const getPhotoFromFiles = (event: any, file: any) => {
  //   let photo = {
  //     title: file.name,
  //     src: URL.createObjectURL(file),
  //   };

  //   setPhoto(photo);
  // };

  // const dropHandler = (event: any) => {
  //   event.preventDefault();
  //   setDrag(false);
  //   let file = event.dataTransfer.files[0];
  //   setFile(file);

  //   if (file !== undefined) {
  //     getPhotoFromFiles(event, file);
  //   }
  // };
  // const changeHandler = (event: any) => {
  //   event.preventDefault();
  //   let file = event.target.files[0];
  //   setFile(file);

  //   if (file !== undefined) {
  //     getPhotoFromFiles(event, file);
  //   }
  // };

  // const deleteImage = () => {
  //   setPhoto(undefined);
  // };

  // Обработка нажатия enter в select
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setSelectValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
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

    form.append("name", data.name);
    form.append("slug", data.slug);
    form.append("description", data.description);
    form.append("endDate", data.endDate);
    form.append("startDate", data.startDate);
    form.append("isActive", JSON.stringify(data.isActive));

    if (editor.getHTML() !== "") {
      form.append("conditions", editor.getHTML());
    }

    form.append("type", data.type.value);

    const response = await DiscountService.updateDiscount(discount.slug, form);
    if (response.status === 200) {
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
        conditions: "",
        description: "",
        endDate: "",
        name: "",
        image: {},
        startDate: "",
        isActive: false,
        slug: "",
      });
      setFile({} as File);
      setPhoto(undefined);
      editor.commands.setContent("");
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
        {isUserHaveRights(userStore.user, UserRoles.Admin) && (
          <div className={styles.string}>
            <h2 className={styles.title}>{texts.titleText}</h2>
            <button
              type="submit"
              form="discountForm"
              className={styles.addButton}
            >
              {texts.buttonText}
            </button>
          </div>
        )}
        <div className={styles.string}>
          <p className={isSuccess(error)}>{error.value}</p>
        </div>
        {isUserHaveRights(userStore.user, UserRoles.Admin) && (
          <>
            {/* Форма */}
            <form
              className={styles.addForm}
              id="discountForm"
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
                  required
                  placeholder="Название акции"
                  {...register("name", {
                    required: true,
                  })}
                  className={`${styles.textInput} ${styles.fullInput}`}
                />
              </div>
              <div className={styles.string}>
                {/* Ссылка */}
                <div className={styles.inputWrapper}>
                  <label htmlFor="slug" className={styles.label}>
                    Ссылка
                  </label>
                  <input
                    type="text"
                    id="slug"
                    required
                    placeholder="akcia-1"
                    {...register("slug", {
                      required: true,
                    })}
                    className={styles.textInput}
                  />
                </div>

                {/* Активно */}
                <div className={styles.inputWrapper}>
                  <label htmlFor="isActive" className={styles.label}>
                    Активно
                  </label>
                  <input
                    defaultChecked={discount.isActive}
                    type="checkbox"
                    {...register("isActive")}
                    id="isActive"
                    className={styles.checkboxInput}
                  />
                </div>
              </div>

              {/* Описание */}
              <div className={styles.inputWrapper}>
                <label htmlFor="description" className={styles.label}>
                  Описание
                </label>
                <textarea
                  id="description"
                  required
                  placeholder="Описание"
                  {...register("description", {
                    required: true,
                  })}
                  className={styles.textArea}
                />
              </div>

              {/* Стиль кухни */}
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Тип акции</label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <CreatableSelect
                      className={styles.select}
                      components={components}
                      options={discountsTypes}
                      value={field.value}
                      defaultValue={
                        discountsTypes.find(
                          (type) => type.value === discount.type,
                        ) || discountsTypes[0]
                      }
                      isSearchable
                      onChange={(newValue) => field.onChange(newValue)}
                      onInputChange={(newValue) => setInputValue(newValue)}
                      onKeyDown={handleKeyDown}
                      placeholder="Тип акции"
                    />
                  )}
                />
              </div>

              <div className={styles.string}>
                {/* Дата начала */}
                <div className={styles.column}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="startDate" className={styles.label}>
                      Стартует с
                    </label>
                    <ReactInputMask
                      type="text"
                      mask="99.99.9999"
                      maskChar={null}
                      defaultValue={discount.startDate}
                      id="startDate"
                      placeholder="01.01.2024"
                      required
                      {...register("startDate", {
                        required: true,
                        minLength: 10,
                        maxLength: 10,
                        pattern: {
                          value:
                            /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                          message:
                            "Введите корректную дату в формате ДД.ММ.ГГГГ",
                        },
                      })}
                      className={styles.textInput}
                    />
                  </div>
                  {errors.startDate && (
                    <p className={styles.error}>{errors.startDate.message}</p>
                  )}
                </div>

                {/* Дата конца */}
                <div className={styles.column}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="endDate" className={styles.label}>
                      Заканчивается
                    </label>
                    <ReactInputMask
                      type="text"
                      mask="99.99.9999"
                      maskChar={null}
                      id="endDate"
                      defaultValue={discount.endDate}
                      placeholder="01.01.2024"
                      required
                      {...register("endDate", {
                        required: true,
                        minLength: 10,
                        maxLength: 10,
                        pattern: {
                          value:
                            /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                          message:
                            "Введите корректную дату в формате ДД.ММ.ГГГГ",
                        },
                      })}
                      className={styles.textInput}
                    />
                  </div>
                  {errors.endDate && (
                    <p className={styles.error}>{errors.endDate.message}</p>
                  )}
                </div>
              </div>

              {/* Фото */}
              {/* <div className={styles.inputWrapper}>
                <label className={styles.label}>Фото</label>
                <input
                  id="image"
                  type="file"
                  {...register("image", {
                    required: true,
                    value: photo,
                  })}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className={styles.inputPhotos}
                  onChange={(event) => changeHandler(event)}
                  onDragStart={(event) => dragStartHandler(event, setDrag)}
                  onDragLeave={(event) => dragLeaveHandler(event, setDrag)}
                  onDragOver={(event) => dragStartHandler(event, setDrag)}
                  onDrop={(event) => dropHandler(event)}
                />
                <label htmlFor="image" className={styles.labelPhotos}>
                  {!drag
                    ? "Нажмите или перетащите изображение"
                    : "Отпустите изображение"}
                </label>
              </div> */}

              {/* Предпросмотр фото */}
              {photo !== undefined && (
                <div className={styles.photosPreview}>
                  <div className={styles.photo}>
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className={styles.previewPhoto}
                    />
                    <p className={styles.photoTitle}>{photo.title}</p>
                  </div>
                </div>
              )}
            </form>
            <EditorContent editor={editor} className={styles.editor}>
              <EditorButtons editor={editor} setLink={setLink} />
            </EditorContent>
          </>
        )}
      </div>
    </div>
  );
};

export default EditDiscountPage;
