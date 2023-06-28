import { createSlice } from '@reduxjs/toolkit';

export const groupsSlice = createSlice({
	name: 'groups',
	initialState: {
		viewMode: 'grid',
	},
	reducers: {
		changeViewMode: (state, { payload }) => {
			state.viewMode = payload;
		},
	},
});
export const { changeViewMode } = groupsSlice.actions;

export const selectViewMode = (state) => state.groups.viewMode;

export default groupsSlice.reducer;
