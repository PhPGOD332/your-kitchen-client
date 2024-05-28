import $api from "@/http";
import type { IDiscount } from "@/types/IDiscount";
import type { AxiosResponse } from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default class DiscountService {
  static async getDiscounts(): Promise<IDiscount[]> {
    const response = await $api.get<IDiscount[]>("/discounts");

    const returnObjects = [...response.data];
    const objectWithPhotos: IDiscount[] = returnObjects.map((discount) => {
      const discountImage = `${NEXT_PUBLIC_API_URL}/images/${discount.image}`;
      discount.image = discountImage;
      return discount;
    });

    return objectWithPhotos;
  }

  static async getDiscount(slug: string): Promise<IDiscount> {
    const response = await $api.get<IDiscount>(`/discounts/${slug}`);

    const returnObject = { ...response.data };
    const objectImage = `${NEXT_PUBLIC_API_URL}/images/${returnObject.image}`;

    returnObject.image = objectImage;
    return returnObject;
  }
  static async addDiscount(body: object): Promise<AxiosResponse<IDiscount>> {
    return await $api.post("/discounts", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async deleteDiscount(slug: string): Promise<AxiosResponse<IDiscount>> {
    return await $api.delete<IDiscount>(`/discounts/${slug}`);
  }

  static async updateDiscount(
    slug: string,
    body: object,
  ): Promise<AxiosResponse<IDiscount>> {
    return await $api.patch(`/discounts/${slug}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
