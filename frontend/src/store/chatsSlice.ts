import { createSlice } from '@reduxjs/toolkit'

export interface ChatState {
  chatName?: string;
  isGroupChat?: boolean;
  users?: any;
  latestMessage?: any;
  groupAdmin?: any;
}

const initialState: ChatState = {
  

}

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {

  },
})

export const {  } = chatsSlice.actions

export default chatsSlice.reducer