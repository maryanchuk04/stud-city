import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HubService } from '../../services/hubService';
import { RoomService } from '../../services/roomService';

const hubService = new HubService();

export const fetchChat = createAsyncThunk(
	'chats/fetchChats',
	async (
		id,
		{ rejectWithValue, fulfillWithValue },
		service = new RoomService()
	) => {
		try {
			const data = await service.getChatById(id);
			return fulfillWithValue(data);
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const connectToChatHub = createAsyncThunk(
	'chats/connectToHub',
	async (ids, { rejectWithValue, fulfillWithValue }) => {
		try {
			hubService.configure();
			const connection = await hubService.startConnection();
			connection.invoke('JoinToUsersRooms', ids);

			return fulfillWithValue(connection);
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const fetchUserChats = createAsyncThunk(
	'chats/fetchUserChats',
	async (
		_,
		{ rejectWithValue, fulfillWithValue },
		service = new RoomService()
	) => {
		try {
			const data = await service.getChats();
			return fulfillWithValue(data);
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

const chatsSlice = createSlice({
	name: 'chats',
	initialState: {
		userChats: [],
		chat: {
			id: null,
			messages: [],
			users: [],
			title: null,
			image: null,
		},
		typing: {
			text: null,
			userId: null,
		},
		loading: false,
		hubConnection: null,
	},
	reducers: {
		addMessageAction: (state, action) => {
			state.chat.messages = [...state.chat.messages, action.payload];
		},
		changeLastMessage: (state, action) => {
			const index = state.userChats.findIndex(
				(chat) => chat.id === action.payload.roomId
			);
			state.userChats[index].message = action.payload;
		},
		handleTyping: (state, action) => {
			state.typing.userId = action.payload.userId;
			state.typing.text = action.payload.text;
		},
		restoreHandleTyping: (state) => {
			state.typing.userId = null;
			state.typing.text = null;
		},
	},
	extraReducers: {
		[fetchUserChats.fulfilled]: (state, action) => {
			state.userChats = action.payload;
		},
		[fetchChat.pending]: (state) => {
			state.loading = true;
		},
		[fetchChat.fulfilled]: (state, action) => {
			state.chat = action.payload;
			state.loading = false;
		},
		[connectToChatHub.fulfilled]: (state, action) => {
			state.hubConnection = action.payload;
		},
	},
});

export const {
	addMessageAction,
	changeLastMessage,
	handleTyping,
	restoreHandleTyping,
} = chatsSlice.actions;

export const selectUserChats = (state) => state.chats.userChats;

export const selectChat = (state) => state.chats.chat;

export const selectNotification = (state) => state.chats.notification;

export const selectHubConnection = (state) => state.chats.hubConnection;

export const selectChatLoading = (state) => state.chats.loading;

export const selectTypingState = (state) => state.chats.typing;

export default chatsSlice.reducer;
