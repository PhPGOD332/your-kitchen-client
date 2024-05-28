import styles from "./Unavailable.module.scss";

interface UnavailableProps {
  children: React.ReactNode;
}

const stopClick = (event: any) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  return false;
};

const Unavailable = ({ children }: UnavailableProps) => {
  return (
    <div className={styles.unavailable} onClick={stopClick}>
      {children}
    </div>
  );
};

export default Unavailable;
