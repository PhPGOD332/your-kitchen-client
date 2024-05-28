import Page404 from "@/pages/Page404";
import Nav from "@/widgets/Nav/Nav";
import "./styles";
import Footer from "@/widgets/Footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Страница не найдена",
  description: "Страницы не существует",
};

const NotFound = () => {
  return (
    <body
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
        <Page404 />
      </main>
      <Footer />
    </body>
  );
};

export default NotFound;
