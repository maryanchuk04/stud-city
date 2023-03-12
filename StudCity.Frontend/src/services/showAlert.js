import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
	ripple: false,
	dismissible: true,
	position: {
		x: 'center',
		y: 'top'
	},
	types: [
		{
			type: 'info',
			background: '#F4D690',
			duration: 4000
		},
		{
			type: 'warning',
			background: '#ffc127',
			duration: 4000
		}
	]
});

export const showAlert = (message = '', type = 'success') => {
	notyf.open({ type, message });
};