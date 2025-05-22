import React from "react";
import styles from "@/widgets/WidgetsList/WidgetsList.module.scss";
import Script from "next/script";

interface WidgetsProps {
  width?: number;
  height?: number;
  zoonHide?: boolean;
  yandexHide?: boolean;
  twoGisHide?: boolean;
}

const WidgetsList = ({
  width,
  height,
  zoonHide,
  yandexHide,
  twoGisHide
                     }: WidgetsProps) => {
  return (
    <div className={styles.badge}>
      {
        !yandexHide &&
        <iframe
          title="Рейтинг в Яндекс"
          src="https://yandex.ru/sprav/widget/rating-badge/192446974752?type=rating&theme=dark"
          width={width ? width : 150}
          height={height ? height : 50}
        ></iframe>
      }
      {
        !twoGisHide &&
          <>
            <iframe id="medium_dark_70000001079809399" frameBorder="0" width={width ? width : 150}
                height={height ? height : 50}
                sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>
            <Script
              id={"2gisScript"}
              dangerouslySetInnerHTML={{
                __html: `((r, p
              )=>{const l=document.getElementById(r);l.contentWindow.document.open(),l.contentWindow.document.write(decodeURIComponent(escape(atob(p)))),l.contentWindow.document.close()})
              ("medium_dark_70000001079809399", "PGhlYWQ+PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPgogICAgd2luZG93Ll9fc2l6ZV9fPSdtZWRpdW0nOwogICAgd2luZG93Ll9fdGhlbWVfXz0nZGFyayc7CiAgICB3aW5kb3cuX19icmFuY2hJZF9fPSc3MDAwMDAwMTA3OTgwOTM5OScKICAgIHdpbmRvdy5fX29yZ0lkX189JycKICAgPC9zY3JpcHQ+PHNjcmlwdCBjcm9zc29yaWdpbj0iYW5vbnltb3VzIiB0eXBlPSJtb2R1bGUiIHNyYz0iaHR0cHM6Ly9kaXNrLjJnaXMuY29tL3dpZGdldC1jb25zdHJ1Y3Rvci9hc3NldHMvaWZyYW1lLmpzIj48L3NjcmlwdD48bGluayByZWw9Im1vZHVsZXByZWxvYWQiIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiIGhyZWY9Imh0dHBzOi8vZGlzay4yZ2lzLmNvbS93aWRnZXQtY29uc3RydWN0b3IvYXNzZXRzL2RlZmF1bHRzLmpzIj48bGluayByZWw9InN0eWxlc2hlZXQiIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiIGhyZWY9Imh0dHBzOi8vZGlzay4yZ2lzLmNvbS93aWRnZXQtY29uc3RydWN0b3IvYXNzZXRzL2RlZmF1bHRzLmNzcyI+PC9oZWFkPjxib2R5PjxkaXYgaWQ9ImlmcmFtZSI+PC9kaXY+PC9ib2R5Pg=="
              )`
              }}
            />
          </>
      }
      {
        !zoonHide &&
        <a id="zoon_widget_240x80_dark"
           href="https://zoon.ru/service/65136fa2f56c9b77f90407bc/"><img
          src="https://zoon.ru/wg/240x80/65136fa2f56c9b77f90407bc/dark/" alt="Мебельная фабрика
Твоя кухня" title="Мебельная фабрика Твоя кухня" width={width ? width : 150} height={height ? height : 50}
          style={{ minWidth: width ? width : 150 }} /></a>
      }
    </div>
  );
};

export default WidgetsList;