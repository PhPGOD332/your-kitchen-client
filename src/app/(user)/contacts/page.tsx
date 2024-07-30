import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import officeBg from "@/data/images/office_bg.jpg";
import styles from "@/pages/FurniturePage.module.scss";
import { SITE_NAME, pagesData } from "@/shared/constants";
import { CenterHelloScreen } from "@/widgets/CenterHelloScreen/CenterHelloScreen";
import { Contacts } from "@/widgets/Contacts/Contacts";
import { LeaveRequestMini } from "@/widgets/LeaveRequestMini/LeaveRequestMini";
import { PhotoSlider } from "@/widgets/PhotoSlider/PhotoSlider";
import { Metadata } from "next";
import ContactsYouCan from "@/widgets/ContactsYouCan/ContactsYouCan";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.contacts.url),
  title: pagesData.contacts.title,
  description: pagesData.contacts.description,
  keywords: pagesData.contacts.keywords,
  openGraph: {
    type: pagesData.contacts.type,
    title: pagesData.contacts.title,
    url: pagesData.contacts.url,
    description: pagesData.contacts.description,
    siteName: SITE_NAME,
    images: [main1.src, main2.src, main3.src, main4.src, main5.src],
  },
  alternates: {
    canonical: pagesData.contacts.url,
  },
};

export const revalidate = 30;

export default function ContactsPage() {
  return (
    <div className={styles.bg}>
      <CenterHelloScreen
        subtitle="Адрес офиса и способы связи с мебельной фабрикой «Твоя кухня»"
        title="Контакты"
        bg={officeBg}
        miniHeight
      />
      <Contacts />
      <PhotoSlider
        title='Производство мебельной фабрики "Твоя кухня"'
        subtitle="Адрес: г.&nbsp;Ульяновск, 42 Инженерный проезд, д.&nbsp;6"
      />
      <LeaveRequestMini
        tag="Заказать обратный звонок"
        location="Страница контактов"
        title="Заказать обратный звонок"
        button={{
          text: "Заказать звонок",
          arrow: "right",
        }}
        type="call"
      />
    </div>
  );
}
