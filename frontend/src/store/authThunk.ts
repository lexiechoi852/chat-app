import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { User } from './usersSlice';

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

export const register = createAsyncThunk<User, RegisterUserAttributes, { rejectValue: string }>(
    ('auth/register'), async (user, thunkAPI) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/signup`, user);
            console.log(res.data, 'res.data')
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data))
            }
    
            return res.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                const message = ( err.response && err.response.data && err.response.data.message ) || err.message || err.toString();
                return thunkAPI.rejectWithValue(message);
            }
            throw err;
        }
    }
)

export const login = createAsyncThunk<User, LoginUserAttributes, { rejectValue: string }>(
    ('auth/login'), async (user, thunkAPI) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/login`, user);
            console.log(res.data, 'res.data')
            if (res.data) {
                localStorage.setItem('token', JSON.stringify(res.data.access_token))
            }
    
            return res.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                const message = ( err.response && err.response.data && err.response.data.message ) || err.message || err.toString();
                return thunkAPI.rejectWithValue(message);
            }
            throw err;
        }
    }
)

export const logout = createAsyncThunk(
    ('auth/logout'), () => {
        localStorage.removeItem('token')
    }
)