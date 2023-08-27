const defaultOptions = {
	icon: './logo.png',
	body: 'Notification Body',
};

export const startRecieveNotification = () => {
	if (!('Notification' in window)) {
		console.info('Browser does not support desktop notification');
	} else {
		if (Notification.permission !== 'granted') Notification.requestPermission();
	}
};

export const showNotification = (title, subTitle) => {
	// eslint-disable-next-line no-unused-vars
	return new Notification(title, { body: subTitle, ...defaultOptions });
};
/**
 * Close notification -> VOID
 * @param notification: Notification (JS)
 */
export const closeNotification = (notification) => {
	notification.close();
};
