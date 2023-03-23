import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoomService } from "../../services/roomService";

export const fetchUserChats = createAsyncThunk(
	"chats/fetchUserChats",
	async (_, { rejectWithValue, fulfillWithValue }, service = new RoomService()) => {
		try {
			const data = await service.getChats();
			return fulfillWithValue(data);
		} 
		catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
)

const chatsSlice = createSlice({
	name: "chats",
	initialState: {
		data: []
	},
	reducers: {

	},
	extraReducers: {
		[fetchUserChats.fulfilled]: (state, action) => {
			state.data = action.payload;
		}
	}
});

export const selectUserChats = (state) => state.chats.data; 

export default chatsSlice.reducer;