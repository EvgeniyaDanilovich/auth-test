import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, localStorageKeys } from '../../const/const';
import { updateLastLoginDate } from './updateLastLoginDate';

export const loginByUserName = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}login`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                let message;
                if (response.status === 403) {
                    message = 'User not found';
                } else if (response.status === 401) {
                    message = 'User blocked';
                }
                throw new Error(message);
            } else {
                const newData = await response.json();
                localStorage.setItem(`${localStorageKeys.userId}`, newData.id);
                thunkAPI.dispatch(updateLastLoginDate());
                return newData;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);