import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, localStorageKeys } from '../../const/const';
import { getCurrentDate } from '../../utils/getCurrentDate';

export const updateLastLoginDate = createAsyncThunk(
    'auth/updateLastLoginDate',
    async (_, thunkAPI) => {
        const currentDate = getCurrentDate();
        const userId = localStorage.getItem(localStorageKeys.userId);
        try {
            const response = await fetch(`${baseUrl}users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify({lastLoginDate: currentDate}),
            });
            console.log(response);

            if (!response.ok) {
                throw new Error();
            } else {
                const newData = await response.json();
                console.log(newData);
                return newData;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('No user');
        }
    }
);