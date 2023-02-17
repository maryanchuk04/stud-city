import { createSlice } from '@reduxjs/toolkit'

export const registerCompleteSlice = createSlice({
	name: "registration_complete",
	initialState: {
		userInformation: {
			firstName: "",
			lastName: "",
			userName: "",
			email: "",
			gender: null,
			phoneNumber: ""
		}
	},
	regucers: {
		changeUserInformation: (state, action) => {
			state.userInformation = action.payload
		}
	}
})

export const { changeUserInformation } = registerCompleteSlice.actions;

export const selectRegisterCompleteUserInformation = (state) => state.userInformation;

export default registerCompleteSlice.reducer;