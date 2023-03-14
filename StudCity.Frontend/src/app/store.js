import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./features"

export const store = configureStore({
	reducer: rootReducer
});
