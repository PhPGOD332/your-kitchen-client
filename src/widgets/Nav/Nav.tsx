"use client";

import { Icons } from "@/shared/IconsComponents/Icons";
import Logo from "@/shared/Logo/Logo";
import { links, pagesLinks } from "@/shared/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import styles from "./Nav.module.scss";
import { handleNav } from "./handleNav";

// const teamLinks = [
//   { href: "/team/designers", label: "Дизайнеры" },
//   { href: "/team/masters", label: "Мастера" },
//   { href: "/team/managers", label: "Менеджеры" },
// ];

const Nav = () => {
  const burgerWrapper = useRef<HTMLDivElement>(null);
  const path = usePathname();

  const isActive = (link: string) =>
    path === link ? `${styles.link} ${styles.active}` : styles.link;
  // const [rotate, setRotate] = useState<ChevronDirection>(ChevronDirection.Up);

  // const handleRotate = () => {
  //   if (rotate === ChevronDirection.Up) {
  //     setRotate(ChevronDirection.Down);
  //   } else {
  //     setRotate(ChevronDirection.Up);
  //   }
  // };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Logo />
          <div className={styles.burgerWrapper} ref={burgerWrapper}>
            <menu className={styles.pages}>
              <Link href={`/`} className={isActive(`/`)}>
                Главная
              </Link>
              <Link
                href={pagesLinks.portfolio}
                className={isActive(pagesLinks.portfolio)}
              >
                Кухни
              </Link>
              <Link
                href={pagesLinks.furniture}
                className={isActive(pagesLinks.furniture)}
              >
                Мебель
              </Link>

              <Link
                href={pagesLinks.advantages}
                className={isActive(pagesLinks.advantages)}
              >
                Преимущества
              </Link>
              <Link
                href={pagesLinks.articles}
                className={isActive(pagesLinks.articles)}
              >
                Статьи
              </Link>
              <Link
                href={pagesLinks.reviews}
                className={isActive(pagesLinks.reviews)}
              >
                Отзывы
              </Link>
              <Link
                href={pagesLinks.discounts}
                className={isActive(pagesLinks.discounts)}
              >
                Акции
              </Link>
              <Link
                href={pagesLinks.contacts}
                className={isActive(pagesLinks.contacts)}
              >
                Контакты
              </Link>

              {/* <div className={styles.menuWrapper}>
                <Menu>
                  <div className={styles.dropdownButtonWrapper}>
                    <Menu.Button
                      className={`${styles.link} ${styles.dropdownButton}`}
                      onClick={handleRotate}
                    >
                      Наша команда <Icon icon={Icons.chevron(rotate)} />
                    </Menu.Button>
                  </div>
                  <Menu.Items
                    className={`${styles.menuItems} ${styles.blurFilter}`}
                  >
                    {teamLinks.map((link) => (
                      <Menu.Item
                        as="a"
                        key={link.href}
                        href={link.href}
                        className={styles.link}
                      >
                        {link.label}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div> */}
            </menu>
            <div className={styles.contacts}>
              {/* <Link
                to={"/"}
                className={`${styles.contactsWrapper} ${styles.hover}`}
              >
                <Icon icon={Icons.person(styles.icon)} />
                <p className={styles.contactsText}>Кабинет</p>
              </Link> */}
              <Link href={links.tel} className={styles.contactsWrapper}>
                <Icons.phone className={styles.personIcon} />
                <p className={styles.contactsText} itemProp="telephone">
                  +7 (495) 988-55-28
                </p>
              </Link>
              <Link
                aria-label="Наш телеграм"
                href={links.tgChat}
                target="_blank"
              >
                <Icons.telegram className={styles.navIcon} />
              </Link>
              <Link aria-label="WhatsApp" href={links.whatsapp} target="_blank">
                <Icons.splashWhatsapp className={styles.navIcon} />
              </Link>
            </div>
          </div>
          <div
            className={styles.burger}
            onClick={(event) => handleNav(event, burgerWrapper, styles)}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
