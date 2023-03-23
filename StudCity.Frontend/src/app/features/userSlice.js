import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserService } from '../../services/userService';
import { showAlert } from '../../services/showAlert';

const initialState = {
	data: {
		id: '',
		firstName: '',
		lastName: '',
		fullName: '',
		userName: '',
		email: '',
		avatar: '',
		dateOfBirth: '',
		phoneNumber: '',
		gender: '',
		settings: {
			theme: '',
			language: '',
			backgroundImage: '',
		},
	},
	loading: false,
};

export const fetchCurrentUser = createAsyncThunk(
	'user/getCurrentUser',
	async (
		_,
		{ fulfillWithValue, rejectWithValue },
		userService = new UserService()
	) => {
		try {
			const { data } = await userService.getCurrentUser();
			return fulfillWithValue(data);
		} catch (err) {
			if (!err.response) {
				showAlert('Something went wrong', 'error');
				return rejectWithValue();
			}

			showAlert(err.response.data.error, 'error');
			return rejectWithValue();
		}
	}
);

export const saveCurrentUser = createAsyncThunk(
	'user/saveCurrentUser',
	async (
		userData,
		{ fulfillWithValue, rejectWithValue },
		userService = new UserService()
	) => {
		try {
			await userService.editCurrentUser(userData);
			return fulfillWithValue(userData);
		} catch (err) {
			if (!err.response) {
				showAlert('Something went wrong', 'error');
				return;
			}

			showAlert(err.response.data.error, 'error');
			return rejectWithValue(userData);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {},
	extraReducers: {
		[fetchCurrentUser.pending]: (state) => {
			state.loading = true;
		},
		[fetchCurrentUser.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.loading = false;
		},
		[fetchCurrentUser.rejected]: (state) => {
			state.loading = false;
		},
		[saveCurrentUser.pending]: (state) => {
			state.loading = true;
		},
		[saveCurrentUser.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.loading = false;
		},
		[saveCurrentUser.rejected]: (state) => {
			state.loading = false;
		},
	},
});

export const selectCurrentUser = (state) => state.user;

export const selectCurrentUserData = (state) => state.user.data;

export const selectUserForHeader = (state) => {
	return {
		data: {
			firstName: state.user.data.firstName,
			lastName: state.user.data.lastName,
			avatar: state.user.data.avatar,
		},
		loading: state.user.loading,
	};
};

export const selectCurrentUserId = (state) => state.user.data.id;

export default userSlice.reducer;
