import { IFurniture } from '@/types/IFurniture';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Сервис для клиентских get запросов
// ISR Next
export class UserFurnitureService {
	static async getAllFurniture(): Promise<IFurniture[]> {
		const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/furniture`, {
			method: 'GET',
			next: {
				revalidate: 30,
			},
		});

		const jsonFurniture: IFurniture[] = await response.json();

		const returnFurniture: IFurniture[] = [...jsonFurniture];

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
}
