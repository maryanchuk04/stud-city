import { createSlice } from "@reduxjs/toolkit";
import { ICON_NAVBAR_ICONS } from "../../utils/constants";

export const navbarSlice = createSlice({
	name: "navbar",
	initialState: {
		isOpen: false,
		active: 0,
		activeName: ICON_NAVBAR_ICONS[0].name
	},
	reducers: {
		toggleNavbar: (state) => {
			state.isOpen = !state.isOpen;
		},
		changeMenuState: (state, action) => {
			state.isOpen = true;
			state.active = action.payload.active;
			state.activeName = action.payload.activeName;
		}
	}
})

export const { toggleNavbar, changeMenuState } = navbarSlice.actions;

export const selectNavbarState = (state) => state.navbar;

export default navbarSlice.reducer;

