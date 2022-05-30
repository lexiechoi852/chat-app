import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Chat } from "./chatsSlice";

const API_BASE_URL = '/api/chats';

interface CreateSingleChatAttributes {
    chatName: string,
    userId: string
}

interface CreateGroupChatAttributes {
    chatName: string,
    userIds: string[]
}

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

export const createSingleChat = createAsyncThunk<Chat, CreateSingleChatAttributes,  { rejectValue: string }>(
    ('chats/createSingle'), async (newChat, thunkAPI) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/single`, {
                body: {
                    chatName: newChat.chatName,
                    userIds: newChat.userId
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

export const createGroupChat = createAsyncThunk<Chat, CreateGroupChatAttributes,  { rejectValue: string }>(
    ('chats/createGroup'), async (newChat, thunkAPI) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/group`, {
                body: {
                    chatName: newChat.chatName,
                    userIds: newChat.userIds
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