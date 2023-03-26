import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from "./features";

export const store = configureStore({
	reducer: rootReducer, middleware: () => getDefaultMiddleware({
		serializableCheck: false,
	}),
});
