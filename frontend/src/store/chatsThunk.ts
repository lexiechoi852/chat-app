import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Chat } from "./chatsSlice";

const API_BASE_URL = '/api/chats';

export const fetchAllChats = createAsyncThunk<Chat[], void,  { rejectValue: string }>(
    ('chats/fetchAll'), async (_, thunkAPI) => {
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