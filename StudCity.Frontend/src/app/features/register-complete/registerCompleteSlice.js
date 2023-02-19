import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activeStep: 1,
	userInformation: {
		firstName: "",
		lastName: "",
		userName: "",
		email: "",
		gender: null,
		phoneNumber: ""
	},
};

const registerCompleteSlice = createSlice({
	name: "registerComplete",
	initialState,
	reducers: {
		changeActiveState: (state, action) => {
			state.activeStep = action.payload;
		},
		changeUserInformation: (state, action) => {
			state.userInformation = action.payload
		}
	}
})

export const { changeActiveState, changeUserInformation } = registerCompleteSlice.actions;

export const selectRegisterCompleteUserInformation = (state) => state.registerComplete.userInformation;

export const selectActiveStep = (state) => state.registerComplete.activeStep; 

export default registerCompleteSlice.reducer;