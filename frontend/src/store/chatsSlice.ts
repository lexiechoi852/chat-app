import { createSlice } from '@reduxjs/toolkit'

interface Chat {
  chatName?: string;
  isGroupChat?: boolean;
  users?: any;
  latestMessage?: any;
  groupAdmin?: any;
}

export interface ChatState {
  chats: Chat[];
  status: "loading" | "idle";
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  status: "idle",
  error: null
}

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {

  },
})

export const {  } = chatsSlice.actions

export default chatsSlice.reducer