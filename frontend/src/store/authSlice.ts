import { createSlice } from '@reduxjs/toolkit'
import { getInfo, login, logout, register } from './authThunk';
import { User } from './usersSlice';

export interface AuthState {
  isAuth: boolean,
  user: User | undefined;
  isRegisterSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: AuthState = {
  isAuth: (localStorage.getItem('token') !== null),
  user: undefined,
  isRegisterSuccess: false,
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
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isRegisterSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.message = action.payload;
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload) {
          state.isAuth = true;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        
        if (action.payload) {
          state.message = action.payload;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.user = undefined;
      })
      .addCase(getInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = undefined;
        
        if (action.payload) {
          state.message = action.payload;
        }
      })
  }
})

export const { reset } = authSlice.actions

export default authSlice.reducer