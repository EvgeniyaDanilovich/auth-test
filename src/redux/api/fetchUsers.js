import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../const/const';

export const fetchUsers = createAsyncThunk(
    'auth/fetchUsers',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(   `${baseUrl}users`);

            if (!response.ok) {
                throw new Error();
            } else {
                const newData = await response.json();
                return newData;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);