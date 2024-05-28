import { StaticImageData } from 'next/image';

export interface IFurniture {
	_id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	photos: string[] | StaticImageData[];
}
