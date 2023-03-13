import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
	name: "navbar",
	initialState: {
		isOpen: false,
		active: 0,
		activeName: ""
	},
	reducers: {
		toggleNavbar: (state) => {
			state.isOpen = !state.isOpen;
		},
		changeMenuState: (state, action) => {
			state.isOpen = true;
			console.log(action)
			state.active = action.payload.active;
			state.activeName = action.payload.activeName;
		}
	}
})

export const { toggleNavbar, changeMenuState } = navbarSlice.actions;

export const selectNavbarState = (state) => state.navbar;

export default navbarSlice.reducer;

