export interface IDiscount {
  _id: string;
  name: string;
  description: string;
  conditions?: string; // условия
  image: string;
  slug: string;
  type: DiscountType;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// 'Акция', 'Подарок', 'Скидка'
export type DiscountType = "promotion" | "gift" | "discount";
