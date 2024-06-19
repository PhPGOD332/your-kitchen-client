"use client";

import requestBgImage from "@/data/images/bg_request_file.webp";
import ipadImg from "@/data/images/ipad_project.webp";
import { isErrorStyles } from "@/features/isErrorStyles";
import ClaimService from "@/services/admin/ClaimService";
import { Icons } from "@/shared/IconsComponents/Icons";
import { pagesLinks } from "@/shared/constants";
import { closeModalOnEscape } from "@/shared/helpers/closeModalOnEscape";
import { OrangeButton } from "@/shared/ui";
import { ModalProps } from "@/types";
import { TFormInputsNames } from "@/types/TFormInputs";
import type { TFormInputsFile } from "@/types/TFormInputsFile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import styles from "./LeaveRequestFileModal.module.scss";
import Link from "next/link";

const isOpenStyles = (isOpen: boolean) =>
  isOpen ? styles.modal : `${styles.modal} ${styles.hidden}`;

type FileModal = Omit<ModalProps, "setIsOpenThanks">;

export const LeaveRequestFileModal = ({
  title,
  buttonText,
  descriptionText,
  tag,
  location,
  cardTitle,
  isOpen,
  setIsOpen,
  // setIsOpenPrivacy,
}: FileModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<TFormInputsFile>();
  const [filesCount, setFilesCount] = useState(0);
  const router = useRouter();
  // const openPrivacy = () => {
  //   if (setIsOpenPrivacy) {
  //     setIsOpenPrivacy(true);
  //     document.body.classList.add("overflow");
  //   }
  // };

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      closeModalOnEscape(event, setIsOpen);
    });
    return () =>
      document.removeEventListener("keydown", (event) => {
        closeModalOnEscape(event, setIsOpen);
      });
  }, []);

  const onSubmitLeaveRequest: SubmitHandler<TFormInputsFile> = async (data) => {
    const form = new FormData();

    const files: any = [...data.files];

    files.forEach((file: any) => {
      form.append("files", file);
    });

    form.append("mobilePhone", data.mobilePhone);
    form.append("date", new Date().toISOString());

    if (location) {
      form.append("location", location);
    }
    if (tag) {
      form.append("tag", tag);
    }

    const response = await ClaimService.addFileClaim(form);

    if (response.status === 201) {
      resetField("files");
      setValue("mobilePhone", "");
      setIsOpen(false);
      document.body.classList.remove("overflow");
      router.push(pagesLinks.thankyou, {
        scroll: true,
      });
    }
  };

  return (
    <>
      <div
        className={isOpenStyles(isOpen)}
        onClick={() => {
          setIsOpen(false);
          document.body.classList.remove("overflow");
        }}
      >
        <div
          className={`${styles.leaveRequest}`}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Image
            src={requestBgImage}
            alt="Фон"
            className={styles.bgImage}
            draggable={false}
          />
          <div className={styles.container}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => {
                setIsOpen(false);
                document.body.classList.remove("overflow");
              }}
            >
              ×
            </button>
            <div className={styles.left}>
              <div className={styles.title}>
                {title ? title : "Есть проект - сравните цены!"}
              </div>
              <div className={styles.description}>
                {descriptionText
                  ? descriptionText
                  : "Если у вас есть дизайн проект, эскиз, схема или картинка вашей кухни с размерами - пришлите информацию для расчета стоимости и получите консультанцию дизайнера."}
              </div>
              <div className={styles.asks}>
                <div className={styles.ask}>
                  <Icons.lamp className={styles.icon} />
                  <p className={styles.askText}>Как улучшить проект?</p>
                </div>
                <div className={styles.ask}>
                  <Icons.keys className={styles.icon} />
                  <p className={styles.askText}>
                    Из чего сделать надежную и долговечную кухню?
                  </p>
                </div>
              </div>
              <div className={styles.right}>
                <Image
                  src={ipadImg}
                  alt="Проект"
                  draggable={false}
                  className={styles.rightImage}
                />
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>
                  {cardTitle
                    ? cardTitle
                    : "Загрузите информацию, введите ваш номер телефона и нажмите «Узнать цену»"}
                </p>
                <form className={styles.form} name="request_form">
                  <div className={styles.columnFileInput}>
                    <input
                      type="file"
                      multiple
                      accept="image/*, .pdf, .doc, .docx, .xls, .xlsx, .rtf, .txt"
                      id="file"
                      {...register("files", {
                        required: true,
                        onChange: (event) => {
                          setFilesCount(event.target.files.length);
                        },
                      })}
                      className={styles.inputFile}
                    />
                    <label htmlFor="file">
                      <div className={styles.labelFile}>
                        <Icons.file className={styles.inputIconCenter} />
                      </div>
                    </label>
                    <label htmlFor="file" className={styles.labelText}>
                      {filesCount > 0
                        ? `Файлов: ${filesCount}`
                        : "Загрузить файл"}
                    </label>
                  </div>

                  <div className={styles.inputWrapper}>
                    <ReactInputMask
                      type="tel"
                      autoComplete="tel"
                      mask="+7 999 999-99-99"
                      maskChar={null}
                      className={isErrorStyles(
                        TFormInputsNames.mobilePhone,
                        errors,
                        styles,
                      )}
                      placeholder="Ваш телефон"
                      {...register("mobilePhone", {
                        required: "Введите ваш телефон",
                        minLength: 16,
                      })}
                    />
                    <Icons.phoneGray className={styles.inputIcon} />
                  </div>
                  <div className={styles.columnInput}>
                    <OrangeButton
                      className={styles.button}
                      type="submit"
                      onClick={handleSubmit(onSubmitLeaveRequest)}
                    >
                      {buttonText ? buttonText : "Узнать цену"}
                    </OrangeButton>
                    <p className={styles.infoText}>
                      Нажимая на кнопку «Отправить» вы даёте{" "}
                      <Link
                        href={pagesLinks.PrivacyPolicy}
                        type="button"
                        // onClick={openPrivacy}
                        target={"_blank"}
                      >
                        согласие на обработку персональных данных
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
