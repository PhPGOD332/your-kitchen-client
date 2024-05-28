import $api from '@/http';
import type { IReview } from '@/types/IReview';
import type { AxiosResponse } from 'axios';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class ReviewService {
	static async getReviews(): Promise<IReview[]> {
		const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/reviews`, {
			method: 'GET',
			next: {
				revalidate: 30,
			},
		});
		const jsonReviews: IReview[] = await response.json();

		const returnReviews: IReview[] = [...jsonReviews];

		const reviewWithPhotos: IReview[] = returnReviews.map((review) => {
			if (review.photo) {
				review.photo = `${NEXT_PUBLIC_API_URL}/images/${review.photo}`;
			}
			const reviewPhotos = review.photos.map((file) => {
				return `${NEXT_PUBLIC_API_URL}/images/${file}`;
			});

			review.photos = reviewPhotos;
			return review;
		});

		return reviewWithPhotos;
	}

	static async getReview(id: string): Promise<IReview> {
		const response = await $api.get<IReview>(`/reviews/${id}`);

		const returnReview = { ...response.data };
		const reviewPhotos = returnReview.photos.map((file) => {
			return `${NEXT_PUBLIC_API_URL}/images/${file}`;
		});
		if (returnReview.photo) {
			returnReview.photo = `${NEXT_PUBLIC_API_URL}/images/${returnReview.photo}`;
		}

		returnReview.photos = reviewPhotos;
		return returnReview;
	}

	static async addReview(body: object): Promise<AxiosResponse<IReview>> {
		return await $api.post('/reviews', body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	static async deleteReview(id: string): Promise<AxiosResponse<IReview>> {
		return await $api.delete<IReview>(`/reviews/${id}`);
	}

	static async updateReview(
		id: string,
		body: object,
	): Promise<AxiosResponse<IReview>> {
		return await $api.patch(`/reviews/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
}
