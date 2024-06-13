import image1 from "@/data/advantages/Кухни на заказ в Москве.jpg";
import image2 from "@/data/advantages/Изготовление кухни на заказ по индвидуальным размерам.jpg";
import image3 from "@/data/advantages/Кухни эноном, премиум, а также элитные.jpg";
import image4 from "@/data/advantages/Заказать кухню в Москве недорого.jpeg";
import image5 from "@/data/advantages/Кухни от производителя в москве, на заказ, недорого.jpeg";
import comp1 from "@/data/companies/comp1.webp";
import comp2 from "@/data/companies/comp2.webp";
import comp3 from "@/data/companies/comp3.webp";
import comp4 from "@/data/companies/comp4.webp";
import comp5 from "@/data/companies/comp5.webp";
import comp6 from "@/data/companies/comp6.webp";
import comp7 from "@/data/companies/comp7.webp";
import comp8 from "@/data/companies/comp8.webp";
import { Icons } from "@/shared/IconsComponents/Icons";
import Image, { type StaticImageData } from "next/image";
import styles from "./Advantages.module.scss";

interface ImageCard {
  title: string;
  image: StaticImageData;
  text: JSX.Element;
}

const imageCards: ImageCard[] = [
  {
    image: image1,
    title: "Каркасы",
    text: (
      <p>
        “Твоя кухня” использует высокопрочные ДСП от ведущих австрийских
        производителей - Egger и Kronospan для изготовления своих каркасов
        мебели. Эти ДСП соответствуют ГОСТам и самым строгим европейским
        стандартам экологической и санитарной безопасности, что подтверждено
        соответствующими сертификатами. Это гарантирует безопасность
        использования нашей мебели для человека и домашних животных.
      </p>
    ),
  },
  {
    image: image2,
    title: "Разнообразие фасадов",
    text: (
      <>
        <p>
          “Твоя кухня” предлагает изготовление фасадов из экологически чистых,
          современных материалов. Мы даем возможность нашим клиентам создать
          индивидуальный дизайн и проектирование, используя различные материалы.
        </p>
        <br />
        <p>
          Мы используем ДСП от европейских производителей, таких как Egger и
          Kronospan. Кроме того, мы работаем с МДФ, которую нам поставляет
          австрийская компания Egger. Также мы используем массив и шпон
          натурального дерева от итальянских партнеров.
        </p>
        <br />
        <p>
          Различные виды отделочных материалов для наших фасадов, такие как
          натуральный шпон, ламинат, HPL-пластик, меламин, акрил, термопластик и
          эмаль. Эти материалы не только защищают фасады от внешних воздействий,
          но и являются важным элементом дизайна наших моделей.
        </p>
      </>
    ),
  },
  {
    image: image3,
    title: "Столешницы",
    text: (
      <>
        <p>
          “Твоя кухня” предлагает столешницы из практичных и безопасных
          материалов, таких как ДСП с покрытием из HPL-пластика, искусственного
          и натурального камня.
        </p>
        <br />
        <p>
          Используем только высококачественные, прочные, красивые и
          износостойкие плиты ДСП и ЛДСП, покрытые пластиком, от надежных
          поставщиков - Arpa, Lamicolor, Cleaf (Италия), Formica (Финляндия) и
          Resopal (Германия). Мы гарантируем, что наши плиты выдерживают
          воздействие влаги.
        </p>
        <br />
        <p>
          Искусственный камень - это современный материал, сочетающий в себе
          преимущества натурального камня - прочность, долговечность и красоту,
          и при этом лишен его недостатков. Для производства столешниц мы
          используем материалы от компаний Hanex (Южная Корея). Также мы
          изготавливаем интегрированные мойки из искусственного материала.
        </p>
      </>
    ),
  },
  {
    image: image4,
    title: "Наполнение кухонь",
    text: (
      <p>
        Мы оснащаем свою мебель современными и практичными механизмами и
        фурнитурой от ведущих производителей, такие фирмы как Hettich
        (Германия), Blum (Австрия) под заказ. Это позволяет значительно
        упростить эксплуатацию наших кухонь и корпусной мебели, а также продлить
        срок их службы.
      </p>
    ),
  },
  {
    image: image5,
    title: "Техника",
    text: (
      <>
        <p>
          Мы работаем с ведущими производителями бытовой техники и электроники,
          такими как Gorenje, Krona, Liebherr, Hotpoint, Elica, Elikor, Faber,
          Candy, Beko, Maunfeld, Zigmund & Shtain, Haier, Kuppersbusch, Graude,
          SMEG, Asko и Korting.
        </p>
        <br />
        <p>
          Наши клиенты могут выбрать и заказать из широкого ассортимента,
          встраиваемая и отдельно стоящая техника, различной функциональности и
          ценовых категорий.
        </p>
      </>
    ),
  },
];
const companies: StaticImageData[] = [
  comp1,
  comp2,
  comp3,
  comp4,
  comp5,
  comp6,
  comp7,
  comp8,
];

const Advantages = () => {
  return (
    <div className={styles.advantagesPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Преимущества мебели «Твоя Кухня»</h1>
        <div className={styles.content}>
          <div className={styles.upperText}>
            <h4>
              <b>Когда кухонный гарнитур превзошел ожидания</b>
            </h4>
            <br />
            <p>
              Заказывая мебель «Твоя кухня», вы становитесь обладателем
              продукции, соответствующей всем вашим пожеланиям, целям
              эксплуатации и отвечающей вашим представлениям об эстетике,
              качестве и функциональности.
            </p>
            <br />
            <p>Мы гарантируем каждому покупателю:</p>
            <br />
          </div>
          <div className={styles.cards}>
            <div className={styles.card}>
              <Icons.house className={styles.icon} />
              <p className={styles.cardText}>
                Высокое качество. Фабрика сотрудничает только с надежными
                проверенными поставщиками – лидерами в своей отрасли. Мы уверены
                в качестве своей продукции, поэтому гарантия на мебель «Твоя
                кухня» – 10 лет.
              </p>
            </div>
            <div className={styles.companies}>
              {companies.map((company, index) => (
                <Image
                  key={index}
                  src={company}
                  alt="company"
                  className={styles.company}
                  width={188}
                  height={50}
                />
              ))}
            </div>
            <hr />
            <div className={styles.card}>
              <Icons.settings className={styles.icon} />
              <p className={styles.cardText}>
                Эргономику и функциональность. Мы создаем профессиональные
                интеллектуальные решения, которые улучшают качество пользования
                мебелью наших клиентов и покупателей.
              </p>
            </div>
            <hr />
            <div className={styles.card}>
              <Icons.diamond2 className={styles.icon} />
              <p className={styles.cardText}>
                Актуальные и уникальные дизайн решения. Мы разрабатываем
                индивидуальные проекты с учетом образа жизни, вкусов и
                предпочтений каждого конкретного заказчика. Предоставляем
                масштабные возможности для креатива и предлагаем продукцию,
                соответствующую трендам в интерьере.
              </p>
            </div>
            <hr />
            <div className={styles.card}>
              <Icons.repair className={styles.icon} />
              <p className={styles.cardText}>
                Исключительный фирменный сервис от замера до монтажа. Мы
                помогаем клиентам преодолевать все трудности ремонта и процесса
                выбора будущего кухонного гарнитура и корпусной мебели.
                Относимся с уважением, педантичны и всегда держим слово.
              </p>
            </div>
            <hr />
            <div className={styles.card}>
              <Icons.key className={styles.icon} />
              <p className={styles.cardText}>
                Под ключ: комплексное решение. Наша компания не только
                предлагает клиентам качественную мебель, но и обеспечивает их
                необходимой бытовой техникой и товарами для дома.
                <br />
                <br />В компании представлен широкий ассортимент, встроенная
                крупная и мелкая бытовая техника, а также каталог разнообразных
                товаров для обустройства дома. Наши специалисты помогут
                подобрать модель в соответствии с вашими предпочтениями по стилю
                и цветовому решению. Обеспечиваем доставку, установку и
                подключение всех приобретенных приборов, экономя время, нервы и
                средства наших клиентов.
              </p>
            </div>
          </div>
          <div className={styles.upperText}>
            <hr />
            {imageCards.map((card, index) => (
              <>
                <div className={styles.imageCard} key={`${index}c`}>
                  {/*<Image*/}
                  {/*  src={card.image}*/}
                  {/*  alt={card.title}*/}
                  {/*  className={styles.cardImage}*/}
                  {/*  width={250}*/}
                  {/*  height={220}*/}
                  {/*  draggable={false}*/}
                  {/*/>*/}
                  <img src={card.image.src} alt={card.title} className={styles.cardImage} draggable={false} />
                  <div className={styles.imageCardContent}>
                    <h5 className={styles.imageCardTitle}>
                      <b>{card.title}</b>
                    </h5>
                    <br />
                    {card.text}
                  </div>
                </div>
                <hr key={`${index}i`} />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
