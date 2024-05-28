import type { DiscountType } from "@/types/IDiscount";

export const getDiscountType = (type: DiscountType): string => {
  switch (type) {
    case "discount":
      return "Скидка";
    case "gift":
      return "Подарок";
    case "promotion":
      return "Акция";
    default:
      return "Акция";
  }
};
