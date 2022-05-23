import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { UserState } from './usersSlice';

const API_BASE_URL = '/api/auth/';

interface RegisterUserAttributes {
    name: string;
    email: string;
    password: string;
}

interface LoginUserAttributes {
    email: string;
    password: string;
}

export const register = createAsyncThunk<UserState, RegisterUserAttributes>(
    ('auth/register'), async (user, thunkAPI) => {
        try {
            console.log(user, 'register user')
            const res = await axios.post(`${API_BASE_URL}/signup`, user);
            console.log(res.data, 'res.data')
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data))
            }
    
            return res.data;
        } catch (err) {
           console.log(err, 'register err')
           let message = 'something went wrong'
           return thunkAPI.rejectWithValue(message);
        }
    }
)

export const login = createAsyncThunk<UserState, LoginUserAttributes>(
    ('auth/login'), async (user, thunkAPI) => {
        try {
            console.log(user, 'login user')
            const res = await axios.post(`${API_BASE_URL}/login`, user);
            console.log(res.data, 'res.data')
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data))
            }
    
            return res.data;
        } catch (err) {
           console.log(err, 'login err')
           let message = 'something went wrong'
           return thunkAPI.rejectWithValue(message);
        }
    }
)