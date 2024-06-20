"use client";

import requestBgImage from "@/data/images/leave_request_designer_bg.jpg";
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
import styles from "./LeaveRequestDesigner.module.scss";
import Link from "next/link";

interface LeaveRequestProps {
  title?: string;
  cardTitle?: string;
  buttonText?: string;
  descriptionText?: string | ReactNode;
  tag?: string;
  location?: string;
  noPadding?: boolean;
  tags?: string[];
}

const initialTags = ["Бесплатно", "День в день", "В удобное время"];

export const LeaveRequestDesigner = ({
  title,
  buttonText,
  descriptionText,
  tag,
  location,
  cardTitle,
  noPadding,
  tags,
}: LeaveRequestProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<TFormInputsFile>();
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
              <div
                className={`${styles.tags} ${styles.column} ${styles.upperTags}`}
              >
                {tags
                  ? tags.map((tag, index) => (
                      <div className={styles.tagWrapper} key={index}>
                        <p className={styles.tag}>{tag}</p>
                        <div
                          className={`${styles.circle} ${
                            tags.length === index + 1 && styles.last
                          }`}
                        ></div>
                      </div>
                    ))
                  : initialTags.map((tag, index) => (
                      <div className={styles.tagWrapper} key={index}>
                        <p className={styles.tag}>{tag}</p>
                        <div
                          className={`${styles.circle} ${
                            initialTags.length === index + 1 && styles.last
                          }`}
                        ></div>
                      </div>
                    ))}
              </div>

              <div className={styles.title}>
                {title ? title : "Бесплатный выезд дизайнера"}
              </div>
              <div className={styles.description}>
                {descriptionText
                  ? descriptionText
                  : "Оформляйте бесплатный выезд нашего специалиста для проведения точных замеров, создания проекта и визуализации будущего кухонного гарнитура"}
              </div>
              <div className={styles.card}>
                <div className={styles.text}>
                  <p className={styles.cardTitle}>
                    {cardTitle
                      ? cardTitle
                      : "Введите ваш номер телефона и нажмите «Оформить»"}
                  </p>
                  <p className={styles.moreText}>
                    при обращении через сайт дополнительная скидка 3%
                  </p>
                </div>
                <form className={styles.form} name="request_form">
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
                      {buttonText ? buttonText : "Оформить"}
                    </OrangeButton>
                    <p className={styles.infoText}>
                      <span>Нажимая на кнопку «Отправить» вы даёте </span>
                      <Link href={pagesLinks.privacyPolicy} type="button" target="_blank">
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
