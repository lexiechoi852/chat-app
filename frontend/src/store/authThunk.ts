import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { User } from './usersSlice';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/auth`;
const API_USER_URL = `${process.env.REACT_APP_API_URL}/api/users`;

interface LoginData {
    access_token: string;
}

interface RegisterUserAttributes {
    name: string;
    email: string;
    password: string;
}

interface LoginUserAttributes {
    email: string;
    password: string;
}

interface UpdateUserProfileAttributes {
    email?: string;
    password?: string;
    name?: string;
    profilePicture?: string;
}

export const register = createAsyncThunk<User, RegisterUserAttributes, { rejectValue: string }>(
    ('auth/register'), async (user, thunkAPI) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/signup`, user);
    
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

export const login = createAsyncThunk<LoginData, LoginUserAttributes, { rejectValue: string }>(
    ('auth/login'), async (user, thunkAPI) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/login`, user);
            if (res.data) {
                localStorage.setItem('token', res.data.access_token)
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

export const getInfo = createAsyncThunk<User, void, { rejectValue: string }>(
    ('auth/info'), async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/info`, {
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

export const updateUserProfile = createAsyncThunk<User, UpdateUserProfileAttributes, { rejectValue: string }>(
    ('users/update'), async ({email, password, name, profilePicture}, thunkAPI) => {
        try {
            const res = await axios.patch(`${API_USER_URL}`, {
                email,
                password,
                name,
                profilePicture
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
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

export const uploadProfilePicture = createAsyncThunk<void, File, { rejectValue: string }>(
    ('users/uploadProfilePicture'), async (image, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'chat-app');

            const url = process.env.REACT_APP_CLOUDINARY_URL;

            if (url) {
                const res = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                });
                if (res.data && res.data.secure_url) {
                    const updatedProfile = {
                        profilePicture: res.data.secure_url
                    }
                    thunkAPI.dispatch(updateUserProfile(updatedProfile));
                }
            }
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