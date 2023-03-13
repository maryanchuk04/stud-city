import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
	name: "navbar",
	initialState: {
		isOpen: false
	},
	reducers: {
		toggleNavbar: (state) => {
			state.isOpen = !state.isOpen;
		}
	}
})

export const { toggleNavbar } = navbarSlice.actions;

export const selectNavbarState = (state) => state.navbar.isOpen;

export default navbarSlice.reducer;

