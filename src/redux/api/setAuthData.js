import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentDate } from '../../utils/getCurrentDate';
import { baseUrl } from '../../const/const';

export const setAuthData = createAsyncThunk(
    'auth/signUp',
    async (data, thunkAPI) => {
        const registrationDate = getCurrentDate();
        try {
            const response = await fetch(`${baseUrl}users`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ ...data, registrationDate, status: 'Active' }),
            });

            if (!response.ok) {
                throw new Error();
            } else {
                const newData = await response.json();
                console.log(newData);
                window.location.replace('/login');
                return newData;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);