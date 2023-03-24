import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoomService } from "../../services/roomService";

const service = new RoomService();

export const fetchChat = createAsyncThunk(
	"chats/fetchChats",
	async (id, { rejectWithValue, fulfillWithValue }) => {
		try {
			const data = await service.getChatById(id);
			return fulfillWithValue(data);
		} 
		catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
)

export const fetchUserChats = createAsyncThunk(
	"chats/fetchUserChats",
	async (_, { rejectWithValue, fulfillWithValue }) => {
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
		data: [],
		chat: {
			id: null,
			messages: [],
			users: [],
			title: null,
			image: null
		},
		loading: false,
	},
	reducers: {
		addMessageAction: (state, action) => {
			state.chat.messages = [...state.chat.messages, action.payload];	
		}	
	},
	extraReducers: {
		[fetchUserChats.fulfilled]: (state, action) => {
			state.data = action.payload;
		},
		[fetchChat.pending]: (state) => {
			state.loading = true;
		},
		[fetchChat.fulfilled]: (state, action) => {
			state.chat = action.payload;
			state.loading = false;
		}
	}
});

export const { addMessageAction } = chatsSlice.actions;

export const selectUserChats = (state) => state.chats.data; 

export const selectChat = (state) => state.chats.chat;

export const selectChatLoading = (state) => state.chats.loading;

export default chatsSlice.reducer;