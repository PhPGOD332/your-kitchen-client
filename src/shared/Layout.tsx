import Nav from "@/widgets/Nav/Nav";
import Footer from "@/widgets/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Layout = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollTo: HTMLElement | null = document.querySelector(hash);

      if (scrollTo) {
        window.scrollTo({
          behavior: "smooth",
          top: scrollTo.offsetTop - 90,
        });
      }
    }
  }, [hash]);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
        minHeight: "100vh",
        fontFamily: "Gilroy",
      }}
    >
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
