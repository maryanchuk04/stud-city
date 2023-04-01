import { format, isToday } from 'date-fns';

/**
 * 
 * @param {date} date 
 * @returns Date string. if this is today return only hour else return date and time
 */
export const formatDateTime = (date) => {
	const dateObj = new Date(date);

	if (isToday(dateObj)) {
		return format(dateObj, 'p');
	} else {
		return format(dateObj, 'Pp');
	}
}

/**
 * 
 * @param {date} date 
 * @returns Date string. If this is today return only hour else return only date 
 */
export const formatDateOrTime = (date) => {
	const dateObj = new Date(date);

	if (isToday(dateObj)) {
		return format(dateObj, 'p');
	} else {
		return format(dateObj, 'P');
	}
}