import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { User } from "./usersSlice";

const API_BASE_URL = '/api/users';


export const fetchAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    ('users/fetchAll'), async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${API_BASE_URL}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
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

export const searchUsers = createAsyncThunk<User[], string, { rejectValue: string }>(
    ('users/search'), async (search, thunkAPI) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/search`, {
                params: {
                    q: search
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
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