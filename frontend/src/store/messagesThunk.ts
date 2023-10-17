import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Message } from "./messagesSlice";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/messages`;

export const fetchAllMessages = createAsyncThunk<Message[], void, { rejectValue: string }>(
    ('messages/fetchAll'), async (_, thunkAPI) => {
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