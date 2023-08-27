const defaultOptions = {
	icon: '/logo.png',
	dir: 'ltr',
	body: 'Notification Body',
};

export const startRecieveNotification = () => {
	if (!('Notification' in window)) {
		console.info('Browser does not support desktop notification');
	} else {
		Notification.requestPermission();
	}
};

export const showNotification = (title, subTitle) => {
	return new Notification(title, { body: subTitle, ...defaultOptions });
};
/**
 * Close notification -> VOID
 * @param notification: Notification (JS)
 */
export const closeNotification = (notification) => {
	notification.close();
};
