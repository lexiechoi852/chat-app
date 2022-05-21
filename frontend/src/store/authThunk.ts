import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const API_BASE_URL = '/api/auth/';

export const register = createAsyncThunk(
    ('auth/register'), async (user, thunkAPI) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/signup`, user);
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