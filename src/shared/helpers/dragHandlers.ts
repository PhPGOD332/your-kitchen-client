import { getPhotosFromFiles } from './getPhotosFromFiles';

export const dragStartHandler = (
	event: any,
	setDrag: (value: boolean) => void,
) => {
	event.preventDefault();
	setDrag(true);
};
export const dragLeaveHandler = (
	event: any,
	setDrag: (value: boolean) => void,
) => {
	event.preventDefault();
	setDrag(false);
};

export const dropOrChangeHandler = (
	event: any,
	oldFiles: any[],
	setDrag: (value: boolean) => void,
	setFiles: (files: any[]) => void,
	setPhotos: (photos: any[]) => void,
) => {
	dragLeaveHandler(event, setDrag);

	let newFiles = [...oldFiles, ...event.target.files];
	setFiles(newFiles);

	if (newFiles && newFiles.length > 0) {
		getPhotosFromFiles(newFiles, setPhotos);
	}
};
