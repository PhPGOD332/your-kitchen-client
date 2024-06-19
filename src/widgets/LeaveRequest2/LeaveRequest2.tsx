"use client";

import { isErrorStyles } from "@/features/isErrorStyles";
import ClaimService from "@/services/admin/ClaimService";
import { Icons } from "@/shared/IconsComponents/Icons";
import { PrivacyPolicy } from "@/shared/PrivacyPolicy";
import { links, pagesLinks } from "@/shared/constants";
import { OrangeButton } from "@/shared/ui";
import { TFormInputsNames, type TFormInputs } from "@/types/TFormInputs";
import { CreateClaimDto } from "@/types/dtos/CreateClaim.dto";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { TextModal } from "../Modals/TextModal/TextModal";
import styles from "./LeaveRequest2.module.scss";

interface LeaveRequestProps {
  isModal?: boolean;
  onClick?: (...options: any) => void;
  setIsOpen?: (isOpen: boolean) => void;
  buttonText?: string;
  descriptionText?: string | ReactNode;
  tag?: string;
  location?: string;
  before?: {
    title?: string;
    subtitle?: string;
  };
}

export const LeaveRequest2 = ({
  isModal,
  onClick,
  setIsOpen,
  buttonText,
  descriptionText,
  tag,
  location,
  before,
}: LeaveRequestProps) => {
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

    const result = await ClaimService.addClaim(newClaim);

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
        <div className={styles.container} onClick={onClick}>
          {/* Карточка */}
          <div className={styles.card}>
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
            <div className={styles.wrapper}>
              <p className={styles.minus}>—</p>
              <h3 className={styles.title}>
                Оставьте заявку и специалист напишет вам
              </h3>
            </div>
            <p className={styles.text}>
              {descriptionText ? (
                descriptionText
              ) : (
                <>
                  чтобы <span>рассчитать стоимость кухни</span> по телефону или
                  договориться о выезде на замер кухни.
                  <br /> Выезд <span>бесплатный</span> и возможен в этот же день
                </>
              )}
            </p>
            <p className={styles.moreText}>
              при обращении через сайт дополнительная скидка 3%
            </p>
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
              </div>
              <div className={styles.contactsWrapper}>
                <div className={styles.column}>
                  <p className={styles.writeText}>
                    Или напишите нам сами удобным способом:
                  </p>
                  <div className={styles.contacts}>
                    <Link
                      href={links.tgChat}
                      className={styles.contactCard}
                      target="_blank"
                    >
                      <Icons.telegram className={styles.contactsIcon} />
                      <p className={styles.contactText}>Telegram</p>
                    </Link>
                    <Link
                      href={links.whatsapp}
                      className={styles.contactCard}
                      target="_blank"
                    >
                      <Icons.whatsapp className={styles.contactsIcon} />
                      <p className={styles.contactText}>WhatsApp</p>
                    </Link>
                    <Link
                      href={links.vk}
                      className={styles.contactCard}
                      target="_blank"
                    >
                      <Icons.vk className={styles.contactsIcon} />
                      <p className={styles.contactText}>VK.com</p>
                    </Link>
                  </div>
                </div>
                <div className={styles.column}>
                  <OrangeButton
                    className={styles.button}
                    onClick={handleSubmit(onSubmitLeaveRequest)}
                  >
                    {buttonText || "Рассчитать стоимость"}
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
        <div className={styles.container} onClick={onClick}>
          {/* Карточка */}
          {before && before.title && (
            <h3 className={styles.beforeTitle}>{before.title}</h3>
          )}
          {before && before.subtitle && (
            <p className={styles.beforeSubtitle}>{before.subtitle}</p>
          )}
          <div className={styles.card}>
            <div className={styles.wrapper}>
              <p className={styles.minus}>—</p>
              <h3 className={styles.title}>
                Оставьте заявку и специалист напишет вам
              </h3>
            </div>
            <p className={styles.text}>
              {descriptionText ? (
                descriptionText
              ) : (
                <>
                  чтобы <span>рассчитать стоимость кухни</span> по телефону или
                  договориться о выезде на замер кухни.
                  <br /> Выезд <span>бесплатный</span> и возможен в этот же день
                </>
              )}
            </p>
            <p className={styles.moreText}>
              при обращении через сайт дополнительная скидка 3%
            </p>
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
              </div>
              <div className={styles.contactsWrapper}>
                <div className={styles.column}>
                  <p className={styles.writeText}>
                    Или напишите нам сами удобным способом:
                  </p>
                  <div className={styles.contacts}>
                    <Link
                      href={links.tgChat}
                      className={styles.contactCard}
                      target="_blank"
                    >
                      <Icons.telegram className={styles.contactsIcon} />
                      <p className={styles.contactText}>Telegram</p>
                    </Link>
                    <Link
                      href={links.whatsapp}
                      className={styles.contactCard}
                      target="_blank"
                    >
                      <Icons.whatsapp className={styles.contactsIcon} />
                      <p className={styles.contactText}>WhatsApp</p>
                    </Link>
                    <Link
                      href={links.vk}
                      className={styles.contactCard}
                      target="_blank"
                    >
                      <Icons.vk className={styles.contactsIcon} />
                      <p className={styles.contactText}>VK.com</p>
                    </Link>
                  </div>
                </div>
                <div className={styles.column}>
                  <OrangeButton
                    className={styles.button}
                    onClick={handleSubmit(onSubmitLeaveRequest)}
                  >
                    {buttonText || "Рассчитать стоимость"}
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
          </div>
        </div>
      </div>
    </>
  );
};
