import { createSlice } from '@reduxjs/toolkit'
import { Chat } from './chatsSlice';
import { fetchAllMessages } from './messagesThunk'
import { User } from './usersSlice'


export interface Message {
  sender: User;
  content: string;
  chat: Chat;
  createdAt: Date
}

export interface MessageState {
  messages: Message[]
  isLoading: boolean,
  isError: boolean,
  message: string
}

const initialState: MessageState = {
  messages: [],
  isLoading: false,
  isError: false,
  message: ''
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchAllMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.message = action.payload;
        }
      })
  }
})

export const { reset, setMessages, addMessage } = messagesSlice.actions

export default messagesSlice.reducer