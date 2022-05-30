import { createSlice } from '@reduxjs/toolkit'
import { fetchAllUsers, searchUsers, updateUserProfile } from './usersThunk';


export interface User {
  name: string;
  email: string;
  password: string;
  _id: string;
  _v: number;
  createdAt: Date,
  updatedAt: Date
}

export interface UserState {
  users: User[]
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  isError: false,
  message: ''
}

export const usersSlice = createSlice({
  name: 'users',
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
    .addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    })
    .addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

      if (action.payload) {
        state.message = action.payload;
      }
    })
    .addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    .addCase(updateUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      
      if (action.payload) {
        state.message = action.payload;
      }
    })
    .addCase(searchUsers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(searchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    .addCase(searchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      
      if (action.payload) {
        state.message = action.payload;
      }
    })
  }
})

export const { reset } = usersSlice.actions

export default usersSlice.reducer