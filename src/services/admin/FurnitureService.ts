import $api from '@/http';
import { IFurniture } from '@/types/IFurniture';
import type { AxiosResponse } from 'axios';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default class FurnitureService {
	static async getAllFurniture(): Promise<IFurniture[]> {
		const response = await $api.get<IFurniture[]>('/furniture');

		const returnFurniture = [...response.data];
		const furnitureWithPhotos: IFurniture[] = returnFurniture.map(
			(furniture) => {
				const furniturePhotos = furniture.photos.map((file) => {
					return `${NEXT_PUBLIC_API_URL}/images/${file}`;
				});
				furniture.photos = furniturePhotos;
				return furniture;
			},
		);

		return furnitureWithPhotos;
	}

	static async getOneFurniture(id: string): Promise<IFurniture> {
		const response = await $api.get<IFurniture>(`/furniture/${id}`);

		const returnFurniture = { ...response.data };
		const furnitureWithPhotos = returnFurniture.photos.map((file) => {
			return `${NEXT_PUBLIC_API_URL}/images/${file}`;
		});

		returnFurniture.photos = furnitureWithPhotos;
		return returnFurniture;
	}

	static async addFurniture(body: object): Promise<AxiosResponse<IFurniture>> {
		return await $api.post('/furniture', body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	static async deleteFurniture(id: string): Promise<AxiosResponse<IFurniture>> {
		return await $api.delete<IFurniture>(`/furniture/${id}`);
	}

	static async updateFurniture(
		slug: string,
		body: object,
	): Promise<AxiosResponse<IFurniture>> {
		return await $api.patch(`/furniture/${slug}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
}
