import { configureStore } from '@reduxjs/toolkit';
import registerCompleteReducer from './features/register-complete/registerCompleteSlice';

export const store = configureStore({
  reducer: {
	registrationComplete: registerCompleteReducer
  },
});
