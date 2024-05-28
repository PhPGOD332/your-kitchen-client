import type { IDiscount } from "@/types/IDiscount";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default class UserDiscountService {
  static async getDiscounts(): Promise<IDiscount[]> {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/discounts`, {
      method: "GET",
      next: {
        revalidate: 30,
      },
    });
    const jsonDiscounts: IDiscount[] = await response.json();
    const returnObjects: IDiscount[] = [...jsonDiscounts];

    const objectWithPhotos: IDiscount[] = returnObjects.map((discount) => {
      const discountImage = `${NEXT_PUBLIC_API_URL}/images/${discount.image}`;
      discount.image = discountImage;
      return discount;
    });

    return objectWithPhotos;
  }

  static async getDiscount(slug: string): Promise<IDiscount> {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/discounts/${slug}`,
      {
        method: "GET",
        next: {
          revalidate: 30,
        },
      },
    );
    const jsonDiscount: IDiscount = await response.json();

    const objectImage = `${NEXT_PUBLIC_API_URL}/images/${jsonDiscount.image}`;

    jsonDiscount.image = objectImage;
    return jsonDiscount;
  }
}
