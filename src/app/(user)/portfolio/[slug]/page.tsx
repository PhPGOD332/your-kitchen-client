import styles from "@/pages/ArticlePage.module.scss";
import { UserKitchenService } from "@/services/shared/UserKitchenService";
import { CLIENT_URL, SITE_NAME, pagesData } from "@/shared/constants";
import { OrangeButton, OrangeButtonModal } from "@/shared/ui";
import KitchenCard from "@/widgets/Kitchen/KitchenCard";
import { KitchenSlider } from "@/widgets/KitchenSlider/KitchenSlider";
import { LeaveRequestFile } from "@/widgets/LeaveRequestFile/LeaveRequestFile";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export const revalidate = 10;

export const generateStaticParams = async () => {
  const result = await UserKitchenService.getKitchens();

  const links = result.map((kitchen) => ({
    slug: kitchen.slug || kitchen._id,
  }));
  return links;
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const kitchen = await UserKitchenService.getKitchenBySlug(params.slug);

  if (kitchen.slug) {
    return {
      metadataBase: new URL(
        `${CLIENT_URL}/${pagesData.portfolio.name}/${kitchen.slug}`,
      ),
      title: `${kitchen.meta.title}` || `${kitchen.title} | ${SITE_NAME}`,
      description: kitchen.meta.description || undefined,
      keywords: kitchen.meta.keywords || undefined,
      openGraph: {
        type: "website",
        title: `${kitchen.meta.title}` || `${kitchen.title} | ${SITE_NAME}`,
        description: kitchen.meta.description || undefined,
        url: `${CLIENT_URL}/${pagesData.portfolio.name}/${kitchen.slug}`,
        images: kitchen.photos,
        siteName: SITE_NAME,
      },
      alternates: {
        canonical: `${CLIENT_URL}/${pagesData.portfolio.name}/${kitchen.slug}`,
      },
    };
  } else {
    return {
      title: "404: Кухня не найдена",
      description: "Страница не найдена",
    };
  }
};

interface Props {
  params: {
    slug: string;
  };
}

const KitchenPage = async ({ params }: Props) => {
  const kitchen = await UserKitchenService.getKitchenBySlug(params.slug);
  const moreKitchens = await UserKitchenService.getKitchens();

  if (!kitchen._id) {
    return notFound();
  }

  return (
    <>
      <article
        className={styles.kitchenPage}
        itemScope
        itemType="https://schema.org/Product"
      >
        <div className={styles.container}>
          <meta itemProp="brand" content={SITE_NAME} />
          <div className={styles.prevPage}>
            <Link
              href={`/${pagesData.portfolio.name}`}
              className={styles.prevButton}
            >
              <IoIosArrowBack />
              <p>Назад</p>
            </Link>
            <p className={styles.nameText}>
              <Link href={`/${pagesData.portfolio.name}`}>Кухни</Link>
              <span>/</span>
              <span className={`${styles.nameText} ${styles.articleName}`}>
                {kitchen.title}
              </span>
            </p>
          </div>
          <h1 className={styles.title} itemProp="name">
            {kitchen.title}
          </h1>
          <div className={styles.previewWrapperKitchen}>
            <KitchenSlider photos={kitchen.photos} />
            <div className={styles.betweenWrapper}>
              <div className={styles.tags}>
                <div className={styles.tag}>
                  <p>{kitchen.style.label}</p>
                </div>
                {kitchen.type && (
                  <div className={styles.tag}>
                    <p>{kitchen.type.label}</p>
                  </div>
                )}
              </div>
              <div
                className={styles.priceWrapper}
                itemProp="offers"
                itemScope
                itemType="http://schema.org/AggregateOffer"
              >
                <meta itemProp="lowPrice" content={kitchen.price.toString()} />
                <p
                  className={styles.price}
                  itemProp="price"
                  content={kitchen.price.toString()}
                >
                  <span className={styles.brown}>От </span>
                  {kitchen.price.toLocaleString("ru")}
                  <span>₽</span>
                </p>
                <div className={styles.price}>
                  <span className={styles.brown}>Срок </span>
                  {kitchen.term}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button}></div>
          <div className={styles.contentString}>
            <h5 className={styles.start}>
              <b>Описание</b>
            </h5>
            <OrangeButtonModal
              size="sm"
              modal={{
                buttonText: "Расчитать стоимость",
                location: `Страница: ${kitchen.title}`,
                tag: "Расчитать стоимость",
              }}
            >
              Рассчитать для себя
            </OrangeButtonModal>
          </div>
          <div
            className={`${styles.content} ${styles.kitchenContent}`}
            itemProp="description"
            dangerouslySetInnerHTML={{
              __html: kitchen.description,
            }}
          ></div>
        </div>
        <div className={styles.readMore}>
          <p className={styles.line}></p>
          <p className={styles.readMoreText}>Посмотреть другие кухни</p>
          <p className={styles.line}></p>
        </div>
        <div className={styles.container}>
          <div className={styles.articles}>
            {moreKitchens
              .filter((item) => item._id !== kitchen._id)
              .slice(0, 3)
              .map((kitchen) => (
                <KitchenCard
                  kitchen={kitchen}
                  key={kitchen._id}
                  href={
                    kitchen.slug
                      ? `/${pagesData.portfolio.name}/${kitchen.slug}`
                      : `/${pagesData.portfolio.name}/${kitchen._id}`
                  }
                />
              ))}
          </div>
          <div className={styles.buttonWrapper}>
            <OrangeButton href={`/${pagesData.portfolio.name}`} arrow="down">
              Вернуться в портфолио
            </OrangeButton>
          </div>
        </div>
        <LeaveRequestFile
          location={`Страница "${kitchen.title}"`}
          tag="Узнать цену"
        />
      </article>
    </>
  );
};

export default KitchenPage;
