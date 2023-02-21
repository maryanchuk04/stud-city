import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activeStep: 1,
	userInformation: {
		firstName: "",
		lastName: "",
		userName: "",
		email: "",
		gender: 1,
		phoneNumber: ""
	},
	avatar: {},
	role: {},
	groups: {},
	settings: {}
};

const registerCompleteSlice = createSlice({
	name: "registerComplete",
	initialState,
	reducers: {
		changeActiveState: (state, action) => {
			state.activeStep = action.payload;
		},
		changeRegisterCompleteState: (state, action) => {
			state.userInformation = action.payload.userInformation;
			state.avatar = action.payload.avatar;
			state.role = action.payload.role;
			state.groups = action.payload.groups;
			state.settings = action.payload.settings;
		}
	}
})

export const { changeActiveState, changeRegisterCompleteState } = registerCompleteSlice.actions;

export const selectRegisterCompleteDefaultInfo = (state) => state.registerComplete;

export const selectActiveStep = (state) => state.registerComplete.activeStep; 

export default registerCompleteSlice.reducer;