export const closeModalOnEscape = (
	event: KeyboardEvent,
	setIsOpen: (value: boolean) => void,
) => {
	if (event.key === 'Escape') {
		setIsOpen(false);
		document.body.classList.remove('overflow');
	}
};
