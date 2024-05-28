import $api from '@/http';

export default class GalleryService {
	static async addPhotos(body: object) {
		return await $api.post('/photos', body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
}
