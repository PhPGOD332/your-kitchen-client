"use client";

import requestBgImage from "@/data/images/bg_request_file.webp";
import ipadImg from "@/data/images/ipad_project.webp";
import { isErrorStyles } from "@/features/isErrorStyles";
import ClaimService from "@/services/admin/ClaimService";
import { Icons } from "@/shared/IconsComponents/Icons";
import { PrivacyPolicy } from "@/shared/PrivacyPolicy";
import { pagesLinks } from "@/shared/constants";
import { closeModalOnEscape } from "@/shared/helpers/closeModalOnEscape";
import { OrangeButton } from "@/shared/ui";
import { TFormInputsNames } from "@/types/TFormInputs";
import type { TFormInputsFile } from "@/types/TFormInputsFile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { TextModal } from "../Modals/TextModal/TextModal";
import styles from "./LeaveRequestFile.module.scss";
import Link from "next/link";

interface LeaveRequestProps {
  title?: string;
  cardTitle?: string;
  buttonText?: string;
  descriptionText?: string | ReactNode;
  tag?: string;
  location?: string;
  noPadding?: boolean;
}

export const LeaveRequestFile = ({
  title,
  buttonText,
  descriptionText,
  tag,
  location,
  cardTitle,
  noPadding,
}: LeaveRequestProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<TFormInputsFile>();
  const [filesCount, setFilesCount] = useState(0);
  // const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);
  const router = useRouter();

  // const openPrivacy = () => {
  //   setIsOpenPrivacy(true);
  //   document.body.classList.add("overflow");
  // };

  // useEffect(() => {
  //   document.addEventListener("keydown", (event) => {
  //     closeModalOnEscape(event, setIsOpenPrivacy);
  //   });
  //   return () =>
  //     document.removeEventListener("keydown", (event) => {
  //       closeModalOnEscape(event, setIsOpenPrivacy);
  //     });
  // }, []);

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
      router.push(pagesLinks.thankyou, {
        scroll: true,
      });
    }
  };

  return (
    <>
      {/*<TextModal*/}
      {/*  isOpen={isOpenPrivacy}*/}
      {/*  setIsOpen={setIsOpenPrivacy}*/}
      {/*  text={PrivacyPolicy}*/}
      {/*/>*/}
      <div className={`${styles.wrapper} ${noPadding && styles.noPadding}`}>
        <div className={styles.container}>
          <div className={styles.leaveRequest}>
            <Image
              src={requestBgImage}
              alt="Фон"
              className={styles.bgImage}
              draggable={false}
            />
            <div className={styles.left}>
              <div className={styles.title}>
                {title ? title : "Есть проект - сравните цены!"}
              </div>
              <div className={styles.description}>
                {descriptionText
                  ? descriptionText
                  : "Если у вас есть дизайн проект, планировка, эскиз, схема, фото или картинка вашей мебели с размерами - пришлите информацию, чтобы рассчитать стоимость."}
              </div>
              <div className={styles.asks}>
                <div className={styles.ask}>
                  <Icons.lamp className={styles.icon} />
                  <p className={styles.askText}>
                    Как оформить и улучшить проект?
                  </p>
                </div>
                <div className={styles.ask}>
                  <Icons.keys className={styles.icon} />
                  <p className={styles.askText}>
                    Из чего сделать надежную и долговечную мебель?
                  </p>
                </div>
                <div className={styles.ask}>
                  <Icons.house className={styles.icon} />

                  <p className={styles.askText}>
                    Лучшие варианты и сочетания, примеры? Где заказать? Какая
                    подойдет в частный дом? Прямая или угловая?
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
                <div className={styles.text}>
                  <p className={styles.cardTitle}>
                    {cardTitle
                      ? cardTitle
                      : "Загрузите информацию, введите ваш номер телефона и нажмите «Узнать цену»"}
                  </p>
                  <p className={styles.moreText}>
                    при обращении через сайт дополнительная скидка 3%
                  </p>
                </div>
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
                      onClick={handleSubmit(onSubmitLeaveRequest)}
                    >
                      {buttonText ? buttonText : "Узнать цену"}
                    </OrangeButton>
                    <p className={styles.infoText}>
                      <span>Нажимая на кнопку «Отправить» вы даёте </span>
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
