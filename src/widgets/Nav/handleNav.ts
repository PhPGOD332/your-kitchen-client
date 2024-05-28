// Вызов меню бургера
export const handleNav = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, burgerWrapper: React.RefObject<HTMLDivElement>, styles: CSSModuleClasses) => {
  const eventClick = event.currentTarget;
  const myBurgerWrapper: HTMLDivElement | null = document.querySelector(`.${styles.burgerWrapper}`);
  const burgerElement: HTMLDivElement | null = document.querySelector(`.${styles.burger}`);
  
  if (burgerWrapper.current) {
    eventClick.classList.toggle(styles.active);
    burgerWrapper.current.classList.toggle(styles.active);
    document.body.classList.toggle("overflow");
  }
  const navLinks = document.querySelectorAll(`.${styles.link}`);

  document.body.addEventListener('click', (event) => {
    if(burgerElement && event.composedPath().includes(burgerElement)){
      return;
    }
    if(myBurgerWrapper && !event.composedPath().includes(myBurgerWrapper)){
      burgerWrapper.current?.classList.remove(styles.active);
      burgerElement?.classList.remove(styles.active);
      document.body.classList.remove('overflow');
    }
  })

  // Закрытие бургера при клике на любую страницу
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (burgerWrapper.current) {
        eventClick.classList.remove(styles.active);
        burgerWrapper.current.classList.remove(styles.active);
        document.body.classList.remove("overflow");
      }
    });
  });
};