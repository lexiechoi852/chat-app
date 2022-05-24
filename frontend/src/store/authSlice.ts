import { createSlice } from '@reduxjs/toolkit'
import { login, register } from './authThunk';
import { UserState } from './usersSlice';

const user = JSON.parse(localStorage.getItem('user') || 'null');

export interface AuthState {
  user: UserState | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isError: false,
  message: ''
}

export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        if (action.payload) {
          state.message = action.payload;
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        
        if (action.payload) {
          state.message = action.payload;
        }
      })
  }
})

export const { reset } = authSlice.actions

export default authSlice.reducer