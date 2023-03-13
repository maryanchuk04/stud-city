import { configureStore } from '@reduxjs/toolkit';
import fetchSpinnerReduce from './features/fetch-spinner/fetchSpinnerSlice';
import navbarReduce from './features/navbar/navbarSlice';
import registerCompleteReduce from './features/register-complete/registerCompleteSlice';
import userReduce from './features/user/userSlice';

export const store = configureStore({
	reducer: {
		registerComplete: registerCompleteReduce,
		fetchSpinner: fetchSpinnerReduce,
		user: userReduce,
		navbar: navbarReduce
	},
});
