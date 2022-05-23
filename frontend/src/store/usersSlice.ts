import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  name: string | null;
  email: string | null;
  password: string | null;
  _id: string | null;
  _v: number | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  password: null,
  _id: null,
  _v: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },

})

export const {  } = usersSlice.actions

export default usersSlice.reducer