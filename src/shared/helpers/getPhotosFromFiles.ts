export const getPhotosFromFiles = (
	files: any[],
	setPhotos: (photos: any[]) => void,
) => {
	const photos: any[] = [];

	files.map((file) => {
		let photo = {
			title: file.name,
			src: URL.createObjectURL(file),
		};

		photos.push(photo);
	});

	setPhotos(photos);
};
