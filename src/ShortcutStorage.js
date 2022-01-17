const prefix = 'PSC';

export const readShortcuts = () => {
	return JSON.parse(window.localStorage.getItem(`${prefix}-shortcuts`)) || [];
};

export const saveShortcuts = (shortcuts) => {
	window.localStorage.setItem(`${prefix}-shortcuts`, JSON.stringify(shortcuts));
};
