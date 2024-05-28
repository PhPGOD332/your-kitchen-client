"use client";

import ClaimService from "@/services/admin/ClaimService";
import { Icons } from "@/shared/IconsComponents/Icons";
import type { IClaim } from "@/types/IClaim";
import Link from "next/link";
import { useState, type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./AdminClaim.module.scss";

interface AdminClaimProps {
  propsClaim: IClaim;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Функция копирования
const copy = (event: any, value: string) => {
  let target = event.currentTarget;
  target.classList.add(styles.success);
  navigator.clipboard.writeText(value);

  setTimeout(() => {
    target.classList.remove(styles.success);
  }, 2000);
};

interface TInputs {
  firstName: string;
  mobilePhone: string;
  email?: string;
}

const AdminClaim: FC<AdminClaimProps> = ({ propsClaim }) => {
  const { register, handleSubmit, setValue } = useForm<TInputs>({
    defaultValues: {
      firstName: propsClaim.firstName,
      mobilePhone: propsClaim.mobilePhone,
      email: propsClaim.email,
    },
  });

  const [claim, setClaim] = useState(propsClaim);
  const [isEdit, setIsEdit] = useState(false);

  const deleteClaim = async (id: string) => {
    const response = await ClaimService.deleteClaim(id);

    if (response.status === 200) {
      setClaim({} as IClaim);
    }
  };

  const editClaim = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  // Если нет заявки, пустой компонент
  if (!claim._id) {
    return;
  }

  const cancelEdit = () => {
    setIsEdit(false);
    setValue("firstName", claim.firstName || "");
    setValue("mobilePhone", claim.mobilePhone);
    setValue("email", claim.email);
  };

  const onSubmit: SubmitHandler<TInputs> = async (fields) => {
    setIsEdit(false);
    if (
      fields.firstName === claim.firstName &&
      fields.mobilePhone === claim.mobilePhone &&
      fields.email === claim.email
    ) {
      return;
    }

    const response = await ClaimService.updateClaim(claim._id, {
      firstName: fields.firstName || undefined,
      mobilePhone: fields.mobilePhone,
    });
    setClaim(response.data);
  };

  return (
    <div className={styles.claim}>
      <div className={styles.header}>
        <p className={styles.title}>Новая заявка!</p>
        <div className={styles.buttons}>
          {isEdit ? (
            <button
              type="button"
              className={styles.button}
              onClick={handleSubmit(onSubmit)}
            >
              <Icons.done className={styles.icon} />
            </button>
          ) : (
            <button type="button" className={styles.button} onClick={editClaim}>
              <Icons.edit className={styles.icon} />
            </button>
          )}
          {isEdit && (
            <button
              type="button"
              className={styles.button}
              onClick={cancelEdit}
            >
              <Icons.cancel className={styles.icon} />
            </button>
          )}
          <button
            type="button"
            className={styles.button}
            onClick={() => deleteClaim(claim._id)}
          >
            <Icons.remove className={styles.icon} />
          </button>
        </div>
      </div>
      <div className={styles.info}>
        {claim.firstName && (
          <div className={styles.fieldWrapper}>
            <div className={styles.fieldInfo}>
              <p className={styles.fieldTitle}>Имя:</p>
              {!isEdit ? (
                <p className={styles.fieldValue}>{claim.firstName}</p>
              ) : (
                <input
                  type="text"
                  {...register("firstName", {
                    required: true,
                  })}
                  className={styles.input}
                />
              )}
            </div>
            <button
              type="button"
              className={styles.button}
              onClick={(event: any) => copy(event, claim.firstName || "")}
            >
              <Icons.copy className={styles.icon} />
            </button>
          </div>
        )}
        <div className={styles.fieldWrapper}>
          <div className={styles.fieldInfo}>
            <p className={styles.fieldTitle}>Телефон:</p>
            {!isEdit ? (
              <p className={styles.fieldValue}>{claim.mobilePhone}</p>
            ) : (
              <input
                type="tel"
                {...register("mobilePhone", {
                  required: true,
                })}
                className={styles.input}
              />
            )}
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={(event: any) => copy(event, claim.mobilePhone)}
          >
            <Icons.copy className={styles.icon} />
          </button>
        </div>
        {claim.email && (
          <div className={styles.fieldWrapper}>
            <div className={styles.fieldInfo}>
              <p className={styles.fieldTitle}>Почта:</p>
              {!isEdit ? (
                <p className={styles.fieldValue}>{claim.email}</p>
              ) : (
                <input
                  type="email"
                  className={styles.input}
                  value={claim.email}
                />
              )}
            </div>
            <button
              type="button"
              className={styles.button}
              onClick={(event: any) => copy(event, claim.email || "")}
            >
              <Icons.copy className={styles.icon} />
            </button>
          </div>
        )}
        <div className={styles.fieldWrapper}>
          <div className={styles.fieldInfo}>
            <p className={styles.fieldTitle}>Дата заявки:</p>
            <time dateTime={claim.date} className={styles.fieldValue}>
              {new Date(claim.date).toLocaleString("ru")}
            </time>
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={(event: any) =>
              copy(event, new Date(claim.date).toLocaleString("ru"))
            }
          >
            <Icons.copy className={styles.icon} />
          </button>
        </div>
        {claim.tag && (
          <div className={styles.fieldWrapper}>
            <div className={styles.fieldInfo}>
              <p className={styles.fieldTitle}>Тег:</p>
              <p className={styles.fieldValue}>{claim.tag}</p>
            </div>
            <button
              type="button"
              className={styles.button}
              onClick={(event: any) => copy(event, claim.tag || "")}
            >
              <Icons.copy className={styles.icon} />
            </button>
          </div>
        )}
        {claim.location && (
          <div className={styles.fieldWrapper}>
            <p className={styles.fieldInfo}>
              <span className={styles.fieldTitle}>Расположение:</span>
              <span className={styles.fieldValue}>{claim.location}</span>
            </p>
            <button
              type="button"
              className={styles.button}
              onClick={(event: any) => copy(event, claim.location || "")}
            >
              <Icons.copy className={styles.icon} />
            </button>
          </div>
        )}
        {claim.files && claim.files.length > 0 && (
          <p className={styles.fieldInfo}>
            <span className={styles.fieldTitle}>Файлы:</span>
          </p>
        )}
        {claim.files &&
          claim.files.length > 0 &&
          claim.files.map((file, index) => (
            <div className={styles.fieldWrapper} key={index}>
              <Link
                href={`${API_URL}/files/${file}`}
                className={styles.fieldInfoLink}
              >
                {file}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminClaim;
