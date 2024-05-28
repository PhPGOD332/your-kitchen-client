"use client";

import miniLogo from "@/data/images/logo.webp";
import phone from "@/data/images/phoneHand.webp";
import designer from "@/data/team/team2.webp";
import { isErrorStyles } from "@/features/isErrorStyles";
import ClaimService from "@/services/admin/ClaimService";
import { Icons } from "@/shared/IconsComponents/Icons";
import { PrivacyPolicy } from "@/shared/PrivacyPolicy";
import { links, pagesLinks } from "@/shared/constants";
import { OrangeButton } from "@/shared/ui";
import { TFormInputsNames, type TFormInputs } from "@/types/TFormInputs";
import { CreateClaimDto } from "@/types/dtos/CreateClaim.dto";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { TextModal } from "../Modals/TextModal/TextModal";
import styles from "./LeaveRequest.module.scss";

interface LeaveRequestProps {
  isModal?: boolean;
  onClick?: (...options: any) => void;
  setIsOpen?: (isOpen: boolean) => void;
  title?: string;
  buttonText?: string;
  descriptionText?: string | ReactNode;
  tag?: string;
  location?: string;
}

export const LeaveRequest = ({
  isModal,
  onClick,
  setIsOpen,
  title,
  buttonText,
  descriptionText,
  tag,
  location,
}: LeaveRequestProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<TFormInputs>();

  const router = useRouter();
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);

  const onSubmitLeaveRequest: SubmitHandler<TFormInputs> = async (data) => {
    const newClaim = new CreateClaimDto({
      ...data,
      date: new Date().toISOString(),
      location,
      tag,
    });
    const result = await ClaimService.addClaim(newClaim);

    if (result.status === 201) {
      resetField("firstName");
      setValue("mobilePhone", "");
      router.push(pagesLinks.thankyou, {
        scroll: true,
      });
    }
    if (isModal && setIsOpen) {
      setIsOpen(false);
      document.body.classList.remove("overflow");
    }
  };

  if (isModal && setIsOpen) {
    return (
      <>
        <TextModal
          isOpen={isOpenPrivacy}
          setIsOpen={setIsOpenPrivacy}
          text={PrivacyPolicy}
        />
        <div className={styles.container} onClick={onClick}>
          {/* Карточка */}
          <div className={styles.card}>
            <Image
              src={phone}
              alt="Чат"
              className={styles.phone}
              draggable={false}
            />
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
                {title ? title : "Оставьте заявку и специалист напишет вам"}
              </h3>
              <div className={styles.designer}>
                <Image
                  src={designer}
                  alt="Дизайнер"
                  draggable={false}
                  className={styles.designerImg}
                />
                <div className={styles.designerWrapper}>
                  <p className={styles.name}>Настя Лебедева</p>
                  <div className={styles.description}>
                    <p>Главный дизайнер компании</p>{" "}
                    <span>
                      <Image src={miniLogo} alt="Логотип" draggable={false} />{" "}
                      <p>Твоя Кухня</p>
                    </span>
                  </div>
                </div>
              </div>
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
            <form className={styles.formWrapper}>
              <div className={styles.inputsWrapper}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "Введите ваше имя",
                      minLength: 2,
                    })}
                    className={isErrorStyles(
                      TFormInputsNames.firstName,
                      errors,
                      styles,
                    )}
                    placeholder="Ваше имя"
                    autoComplete="given-name"
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
                      TFormInputsNames.firstName,
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
            </form>
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
                  <button type="button" onClick={() => setIsOpenPrivacy(true)}>
                    согласие на обработку персональных данных
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <TextModal
        isOpen={isOpenPrivacy}
        setIsOpen={setIsOpenPrivacy}
        text={PrivacyPolicy}
      />
      <div className={styles.leaveRequest}>
        <div className={styles.container} onClick={onClick}>
          {/* Карточка */}

          <div className={styles.card}>
            <Image
              src={phone}
              alt="Чат"
              className={styles.phone}
              draggable={false}
            />
            <div className={styles.wrapper}>
              <p className={styles.minus}>—</p>
              <h3 className={styles.title}>
                Оставьте заявку и специалист напишет вам
              </h3>
              <div className={styles.designer}>
                <Image
                  src={designer}
                  alt="Дизайнер"
                  draggable={false}
                  className={styles.designerImg}
                />
                <div className={styles.designerWrapper}>
                  <p className={styles.name}>Настя Лебедева</p>
                  <div className={styles.description}>
                    <p>Главный дизайнер компании</p>{" "}
                    <span>
                      <Image src={miniLogo} alt="Логотип" draggable={false} />{" "}
                      <p>Твоя Кухня</p>
                    </span>
                  </div>
                </div>
              </div>
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
            <form className={styles.formWrapper}>
              <div className={styles.inputsWrapper}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "Введите ваше имя",
                      minLength: 2,
                    })}
                    className={isErrorStyles(
                      TFormInputsNames.firstName,
                      errors,
                      styles,
                    )}
                    placeholder="Ваше имя"
                    autoComplete="given-name"
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
                      TFormInputsNames.firstName,
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
            </form>
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
                  <button type="button" onClick={() => setIsOpenPrivacy(true)}>
                    согласие на обработку персональных данных
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
