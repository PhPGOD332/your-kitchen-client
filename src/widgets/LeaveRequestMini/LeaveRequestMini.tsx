"use client";

import { isErrorStyles } from "@/features/isErrorStyles";
import ClaimService from "@/services/admin/ClaimService";
import { Icons } from "@/shared/IconsComponents/Icons";
import { PrivacyPolicy } from "@/shared/PrivacyPolicy";
import { pagesLinks } from "@/shared/constants";
import { OrangeButton } from "@/shared/ui";
import { TFormInputsNames, type TFormInputs } from "@/types/TFormInputs";
import { CreateClaimDto } from "@/types/dtos/CreateClaim.dto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { TextModal } from "../Modals/TextModal/TextModal";
import styles from "./LeaveRequestMini.module.scss";
import Link from "next/link";

const API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Api url has been not imported from .env");
}

export type ModalType = "default" | "promotion" | "call" | "measuring";

interface LeaveRequestMiniProps {
  isModal?: boolean;
  onClick?: (...options: any) => void;
  setIsOpen?: (isOpen: boolean) => void;
  title?: string;
  tag?: string;
  location?: string;
  button?: {
    text?: string;
    arrow?: "left" | "right" | "up" | "down";
  };
  type?: ModalType;
  before?: {
    title?: string;
    subtitle?: string;
  };
}

const getModalType = (type: ModalType): string => {
  switch (type) {
    case "default":
      return styles.card;
    case "promotion":
      return styles.promotion;
    case "call":
      return styles.call;
    case "measuring":
      return styles.measuring;
    default:
      return styles.card;
  }
};

export const LeaveRequestMini = ({
  title,
  tag,
  onClick,
  setIsOpen,
  location,
  button,
  type = "default",
  before,
  isModal,
}: LeaveRequestMiniProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm<TFormInputs>();

  // const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);
  const router = useRouter();

  const onSubmitLeaveRequest: SubmitHandler<TFormInputs> = async (data) => {
    const newClaim = new CreateClaimDto({
      ...data,
      date: new Date().toISOString(),
      location,
      tag,
    });
    await ClaimService.addClaim(newClaim);
    resetField("firstName");
    setValue("mobilePhone", "");
    router.push(pagesLinks.thankyou, {
      scroll: true,
    });

    if (isModal && setIsOpen) {
      setIsOpen(false);
      document.body.classList.remove("overflow");
    }
  };

  if (isModal && setIsOpen) {
    return (
      <>
        {/*<TextModal*/}
        {/*  isOpen={isOpenPrivacy}*/}
        {/*  setIsOpen={setIsOpenPrivacy}*/}
        {/*  text={PrivacyPolicy}*/}
        {/*/>*/}
        <div className={styles.leaveRequest}>
          <div className={styles.container} onClick={onClick}>
            {/* Карточка */}
            {before && before.title && (
              <h3 className={styles.beforeTitle}>{before.title}</h3>
            )}
            {before && before.subtitle && (
              <p className={styles.beforeSubtitle}>{before.subtitle}</p>
            )}
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
            <div className={getModalType(type)}>
              <div className={styles.wrapper}>
                <p className={styles.minus}>—</p>
                <h3 className={styles.title}>
                  {title ? title : "Получите бесплатный эскиз вашего проекта"}
                </h3>
              </div>

              <form className={styles.formWrapper2}>
                <div className={styles.inputsWrapper2}>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      autoComplete="given-name"
                      className={isErrorStyles(
                        TFormInputsNames.firstName,
                        errors,
                        styles,
                      )}
                      placeholder="Ваше имя"
                      {...register("firstName", {
                        required: "Введите ваше имя",
                        minLength: 2,
                      })}
                    />
                    <Icons.user className={styles.icon} />
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
                    <Icons.phoneGray className={styles.icon} />
                  </div>
                  <div className={styles.column}>
                    <OrangeButton
                      onClick={handleSubmit(onSubmitLeaveRequest)}
                      className={styles.button}
                      arrow={button && button.arrow ? button.arrow : undefined}
                    >
                      {button && button.text ? button.text : "Получить эскиз"}
                    </OrangeButton>
                    <p className={styles.infoText}>
                      Нажимая на кнопку «Отправить» вы даёте{" "}
                      <Link
                        href={pagesLinks.PrivacyPolicy}
                        type="button"
                        // onClick={() => setIsOpenPrivacy(true)}
                        target={"_blank"}
                      >
                        согласие на обработку персональных данных
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
              <p className={styles.text}>
                Менеджер свяжется с вами в течение <span>15 минут</span>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/*<TextModal*/}
      {/*  isOpen={isOpenPrivacy}*/}
      {/*  setIsOpen={setIsOpenPrivacy}*/}
      {/*  text={PrivacyPolicy}*/}
      {/*/>*/}
      <div className={styles.leaveRequest}>
        <div className={styles.container}>
          {/* Карточка */}
          {before && before.title && (
            <h3 className={styles.beforeTitle}>{before.title}</h3>
          )}
          {before && before.subtitle && (
            <p className={styles.beforeSubtitle}>{before.subtitle}</p>
          )}
          <div className={getModalType(type)}>
            <div className={styles.wrapper}>
              <p className={styles.minus}>—</p>
              <h3 className={styles.title}>
                {title ? title : "Получите бесплатный эскиз вашего проекта"}
              </h3>
            </div>

            <form className={styles.formWrapper2}>
              <div className={styles.inputsWrapper2}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    autoComplete="given-name"
                    className={isErrorStyles(
                      TFormInputsNames.firstName,
                      errors,
                      styles,
                    )}
                    placeholder="Ваше имя"
                    {...register("firstName", {
                      required: "Введите ваше имя",
                      minLength: 2,
                    })}
                  />
                  <Icons.user className={styles.icon} />
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
                  <Icons.phoneGray className={styles.icon} />
                </div>
                <div className={styles.column}>
                  <OrangeButton
                    onClick={handleSubmit(onSubmitLeaveRequest)}
                    className={styles.button}
                    arrow={button && button.arrow ? button.arrow : undefined}
                  >
                    {button && button.text ? button.text : "Получить эскиз"}
                  </OrangeButton>
                  <p className={styles.infoText}>
                    Нажимая на кнопку «Отправить» вы даёте{" "}
                    <Link
                      href={pagesLinks.PrivacyPolicy}
                      type="button"
                      // onClick={() => setIsOpenPrivacy(true)}
                      target={"_blank"}
                    >
                      согласие на обработку персональных данных
                    </Link>
                  </p>
                </div>
              </div>
            </form>
            <p className={styles.text}>
              Менеджер свяжется с вами в течение <span>15 минут</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
