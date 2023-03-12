import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserService } from '../../../services/userService';
import { showAlert } from '../../../services/showAlert'

const userService = new UserService();

const initialState = {
	data: {
		id: "",
		firstName: "",
		lastName: "",
		fullName: "",
		userName: "",
		email: "",
		avatar: "",
		dateOfBirth: "",
		phoneNumber: "",
		gender: "",
		settings: {
			theme: "",
			language: "",
			backgroundImage: ""
		}
	},
	loading: false
}

export const fetchCurrentUser = createAsyncThunk(
	"user/getCurrentUser",
	async (_, { fulfillWithValue }) => {
		try {
			const { data } = await userService.getCurrentUser();
			return fulfillWithValue(data);
		}
		catch (err) {
			if (!err.response) { 
				showAlert("Something went wrong", "error");
				return;
			}

			showAlert(err.response.data.error, "error");
		}
	}
)

export const saveCurrentUser = createAsyncThunk(
	"user/saveCurrentUser",
	async (userData, { fulfillWithValue, rejectWithValue }) => {
		try {
			await userService.editCurrentUser(userData);
			return fulfillWithValue(userData);
		}
		catch (err) {
			console.log(err)
			if (!err.response) {
				showAlert("Something went wrong", "error");
				return;
			}

			showAlert(err.response.data.error, "error");
			return rejectWithValue(userData);
		}
	}
)

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
	},
	extraReducers: {
		[fetchCurrentUser.pending]: (state) => {
			state.loading = true;
		},
		[fetchCurrentUser.fulfilled]: (state, action) => {
			state.data = action.payload;
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
		}
	}
})

export const selectCurrentUser = (state) => state.user;

export default userSlice.reducer;