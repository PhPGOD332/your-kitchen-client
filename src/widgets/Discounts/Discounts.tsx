import type { IDiscount } from "@/types/IDiscount";
import { DiscountItem } from "../DiscountItem/DiscountItem";
import styles from "./Discounts.module.scss";

interface DiscountsProps {
  discounts: IDiscount[];
}

const NO_DISCOUNTS_TEXT = "Акций пока что нет";

const sortByStartDates = (a: IDiscount, b: IDiscount) => {
  const dateA = new Date(a.startDate.split(".").reverse().join("-"));
  const dateB = new Date(b.startDate.split(".").reverse().join("-"));

  return dateB.getTime() - dateA.getTime();
};

export const Discounts = ({ discounts }: DiscountsProps) => {
  return (
    <>
      <div className={styles.discountsPage} id="discounts">
        <div className={styles.container}>
          <div className={styles.discounts}>
            {!discounts.length && (
              <p className={styles.notFoundText}>{NO_DISCOUNTS_TEXT}</p>
            )}
            {/* Акции */}
            {discounts
              .sort(sortByStartDates)
              .sort((a, b) => +b.isActive - +a.isActive)
              .map((discount) => (
                <DiscountItem key={discount._id} discount={discount} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
