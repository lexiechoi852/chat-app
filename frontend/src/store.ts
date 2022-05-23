import { configureStore } from '@reduxjs/toolkit'
import chatsReducer from './store/chatsSlice'
import authReducer from './store/authSlice'
import usersReducer from './store/usersSlice'

export const store = configureStore({
  reducer: {
      chats: chatsReducer,
      auth: authReducer,
      users: usersReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch