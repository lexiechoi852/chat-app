import { createSlice } from '@reduxjs/toolkit'
import { createGroupChat, createSingleChat, fetchAllChats, fetchChatById } from './chatsThunk';
import { User } from './usersSlice';

export interface Chat {
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  latestMessage: any;
  groupAdmin?: User;
  _id: string;
  _v: number;
  createdAt: Date,
  updatedAt: Date
}

export interface ChatState {
  chats: Chat[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: ChatState = {
  chats: [],
  isLoading: false,
  isError: false,
  message: ''
}

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(fetchAllChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.message = action.payload;
        }
      })
      .addCase(fetchChatById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChatById.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchChatById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.message = action.payload;
        }
      })
      .addCase(createSingleChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSingleChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = [...state.chats, action.payload];
      })
      .addCase(createSingleChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.message = action.payload;
        }
      })
      .addCase(createGroupChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = [...state.chats, action.payload];
      })
      .addCase(createGroupChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.message = action.payload;
        }
      })
  }
})

export const { reset } = chatsSlice.actions

export default chatsSlice.reducer