import { configureStore } from '@reduxjs/toolkit';
import registerCompleteReduce from './features/register-complete/registerCompleteSlice';

export const store = configureStore({
	reducer: {
		registerComplete: registerCompleteReduce
	},
});
