export const deleteImage = (
	oldPhotos: any[],
	oldFiles: any[],
	photoTitle: string,
	setFiles: (files: any[]) => void,
	setPhotos: (photos: any[]) => void,
) => {
	const images = [...oldPhotos];

	const newPhotos = images.filter((image) => photoTitle !== image.title);
	const newFiles = oldFiles.filter((file) => photoTitle !== file.name);

	setFiles(newFiles);
	setPhotos(newPhotos);
};
