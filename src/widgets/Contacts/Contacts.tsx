import { Icons } from "@/shared/IconsComponents/Icons";
import { links } from "@/shared/constants";
import Link from "next/link";
import styles from "./Contacts.module.scss";

interface Props {
  title?: string;
}

export const Contacts = ({ title }: Props) => {
  return (
    <div className={styles.contactsPage}>
      <div className={styles.container}>
        {/*<div className={styles.content}>*/}
        {/*  <div className={styles.upperText}>*/}
        {/*    <h5>*/}
        {/*      <b>В нашем офисе вы всегда в спокойной обстановке можете:</b>*/}
        {/*    </h5>*/}
        {/*    <br />*/}
        {/*  </div>*/}
        {/*  <div className={styles.cards}>*/}
        {/*    <div className={styles.card}>*/}
        {/*      <Icons.rubleWithoutBg className={styles.icon} />*/}
        {/*      <p className={styles.cardText}>*/}
        {/*        встретиться с дизайнером для обсуждения проекта изготовления*/}
        {/*        кухни и другой корпусной мебели;*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    <br />*/}
        {/*    <div className={styles.card}>*/}
        {/*      <Icons.lamp className={styles.icon} />*/}
        {/*      <p className={styles.cardText}>*/}
        {/*        обсудить с менеджером все детали процесса заключения договора,*/}
        {/*        доставки, сборки, задать все интересующие вас вопросы;*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    <br />*/}
        {/*    <div className={styles.card}>*/}
        {/*      <Icons.diamond2 className={styles.icon} />*/}
        {/*      <p className={styles.cardText}>*/}
        {/*        увидеть и оценить качество фасадов, корпусов, столешниц и других*/}
        {/*        материалов используемых в производстве;*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    <br />*/}
        {/*    <div className={styles.card}>*/}
        {/*      <Icons.settings className={styles.icon} />*/}
        {/*      <p className={styles.cardText}>*/}
        {/*        знакомится с договором и сопутствующими документами на доставку*/}
        {/*        и другими этапами выполняемых работ.*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    <br />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <h3 className={styles.title}>{title ? title : "Офис в Москве:"}</h3>
        <div className={styles.map}>
          <iframe
            src="https://yandex.ru/map-widget/v1/?lang=ru_RU&scroll=true&source=constructor-api&um=constructor%3Ad66f7eaf9a8447cb43b64b598a5c4463dffa981e89572461d273a5661a32c9a6"
            width="610"
            height="400"
            allowFullScreen
          ></iframe>
          <div className={styles.content}>
            <div className={styles.card}>
              <Icons.gps className={styles.icon} />
              <div className={styles.column}>
                <p className={styles.cardText}>
                  <b>Офис:</b>
                </p>
                <p className={styles.cardText}>
                  г. Москва, ул. Новоостаповская, д. 6Б (м.&nbsp;Дубровка,
                  м.&nbsp;Волгоградский проспект)
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <Icons.phoneWithoutBg className={styles.icon} />
              <div className={styles.column}>
                <p className={styles.cardText}>
                  <b>Контакты:</b>
                </p>
                <p className={styles.cardText}>
                  тел:{" "}
                  <Link href={"tel:+74959885528"} className={styles.link}>
                    +7 (495) 988-55-28
                  </Link>
                </p>
                <p className={styles.cardText}>
                  e-mail:{" "}
                  <Link
                    href={"mailto:info@youkuhnya.ru"}
                    className={styles.link}
                  >
                    info@youkuhnya.ru
                  </Link>
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <Icons.keys className={styles.icon} />
              <div className={styles.column}>
                <p className={styles.cardText}>
                  <b>Реквизиты:</b>
                </p>
                <p className={styles.cardText}>
                  ООО &quot;ТК&quot;
                  <br />
                  ИНН 9701160947
                  <br />
                  ОГРН 1207700295824
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <Icons.phonePlus className={styles.icon} />
              <div className={styles.column}>
                <p className={styles.cardText}>
                  <b>Альтернативные способы связи с нами:</b>
                </p>
                <div className={styles.icons}>
                  <Link
                    aria-label="Наш телеграм"
                    href={links.tgChat}
                    target="_blank"
                  >
                    <Icons.telegram className={styles.navIcon} />
                  </Link>
                  <Link
                    aria-label="WhatsApp"
                    href={links.whatsapp}
                    target="_blank"
                  >
                    <Icons.splashWhatsapp className={styles.navIcon} />
                  </Link>
                  <Link aria-label="VK" href={links.vk} target="_blank">
                    <Icons.vk className={styles.navIcon} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
