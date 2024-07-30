import React from "react";
import styles from "@/widgets/Contacts/Contacts.module.scss";
import { Icons } from "@/shared/IconsComponents/Icons";

interface Props {
  order?: number;
}

const ContactsYouCan = ({order}:Props) => {
  return (
    <div className={styles.content} style={order ? {order: order} : {}}>
      <div className={styles.upperText}>
        <h5>
          <b>В нашем офисе вы всегда в спокойной обстановке можете:</b>
        </h5>
        <br />
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <Icons.rubleWithoutBg className={styles.icon} />
          <p className={styles.cardText}>
            встретиться с дизайнером для обсуждения проекта изготовления
            кухни и другой корпусной мебели;
          </p>
        </div>
        <br />
        <div className={styles.card}>
          <Icons.lamp className={styles.icon} />
          <p className={styles.cardText}>
            обсудить с менеджером все детали процесса заключения договора,
            доставки, сборки, задать все интересующие вас вопросы;
          </p>
        </div>
        <br />
        <div className={styles.card}>
          <Icons.diamond2 className={styles.icon} />
          <p className={styles.cardText}>
            увидеть и оценить качество фасадов, корпусов, столешниц и других
            материалов используемых в производстве;
          </p>
        </div>
        <br />
        <div className={styles.card}>
          <Icons.settings className={styles.icon} />
          <p className={styles.cardText}>
            знакомится с договором и сопутствующими документами на доставку
            и другими этапами выполняемых работ.
          </p>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ContactsYouCan;