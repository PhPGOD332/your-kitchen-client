import $api from "@/http";
import type { IPhoto } from "@/types/IPhoto";
import type { AxiosResponse } from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default class PhotoService {
  static async getPhotos (): Promise<IPhoto[]> {
    const response =  await $api.get<IPhoto[]>('/photos');

    const returnItems = [...response.data];

    returnItems.forEach((item) => {
      item.name = `${NEXT_PUBLIC_API_URL}/images/${item.name}`;
    })

    return returnItems;
  }

  static async getPhoto (id: string): Promise<IPhoto> {
    const response = await $api.get<IPhoto>(`/photos/${id}`);

    const returnItem = {...response.data};

    returnItem.name = `${NEXT_PUBLIC_API_URL}/images/${returnItem.name}`;
    return returnItem;
  }

  static async addPhoto (body: object): Promise<AxiosResponse<IPhoto>> {
    return await $api.post<IPhoto>(`/photos`, body);
  }

  static async deletePhoto (id: string): Promise<AxiosResponse<IPhoto>> {
    return await $api.delete<IPhoto>(`/photos/${id}`);
  }
}