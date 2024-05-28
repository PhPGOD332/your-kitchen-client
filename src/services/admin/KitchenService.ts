import $api from "@/http";
import type { IKitchen } from "@/types/IKitchen";
import type { AxiosResponse } from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default class KitchenService {
  static async getMainKitchens(): Promise<IKitchen[]> {
    const response = await $api.get<IKitchen[]>("/kitchens-main");

    const returnKitchens = [...response.data];
    const kitchensWithPhotos: IKitchen[] = returnKitchens.map((kitchen) => {
      const kitchenPhotos = kitchen.photos.map((file) => {
        return `${NEXT_PUBLIC_API_URL}/images/${file}`;
      });
      kitchen.photos = kitchenPhotos;
      return kitchen;
    });

    return kitchensWithPhotos;
  }

  static async getKitchens(): Promise<IKitchen[]> {
    const response = await $api.get<IKitchen[]>("/kitchens");

    const returnKitchens = [...response.data];
    const kitchensWithPhotos: IKitchen[] = returnKitchens.map((kitchen) => {
      const kitchenPhotos = kitchen.photos.map((file) => {
        return `${NEXT_PUBLIC_API_URL}/images/${file}`;
      });
      kitchen.photos = kitchenPhotos;
      return kitchen;
    });

    return kitchensWithPhotos;
  }

  static async getKitchen(id: string): Promise<IKitchen> {
    const response = await $api.get<IKitchen>(`/kitchens/${id}`);

    const returnKitchen = { ...response.data };
    const kitchenPhotos = returnKitchen.photos.map((file) => {
      return `${NEXT_PUBLIC_API_URL}/images/${file}`;
    });

    returnKitchen.photos = kitchenPhotos;
    return returnKitchen;
  }

  static async getKitchenBySlug(slug: string): Promise<IKitchen> {
    const response = await $api.get<IKitchen>(`/kitchens-by-slug/${slug}`);

    const returnKitchen = { ...response.data };
    const kitchenPhotos = returnKitchen.photos.map((file) => {
      return `${NEXT_PUBLIC_API_URL}/images/${file}`;
    });

    returnKitchen.photos = kitchenPhotos;
    return returnKitchen;
  }

  static async addKitchen(body: object): Promise<AxiosResponse<IKitchen>> {
    return await $api.post("/kitchens", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async deleteKitchen(id: string): Promise<AxiosResponse<IKitchen>> {
    return await $api.delete<IKitchen>(`/kitchens/${id}`);
  }

  static async checkSlug(
    slug: string,
  ): Promise<AxiosResponse<{ valid: boolean }>> {
    return await $api.get(`/check-slug/${slug}`);
  }

  static async updateKitchen(
    id: string,
    body: object,
  ): Promise<AxiosResponse<IKitchen>> {
    return await $api.patch(`/kitchens/${id}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
