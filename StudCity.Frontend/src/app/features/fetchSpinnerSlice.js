import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	loading: false
}

const fetchSpinnerSlice = createSlice({
	name: "fetchSpinner",
	initialState: initialState,
	reducers: {
		handleChangeSpinerState: (state) => {
			state.loading = !state.loading
		}
	}
})

export const { handleChangeSpinerState } = fetchSpinnerSlice.actions;

export const selectSpinnerState = (state) => {
	return state.fetchSpinner.loading
};

export default fetchSpinnerSlice.reducer;