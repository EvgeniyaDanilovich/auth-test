import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../const/const';

export const updateUserStatus = createAsyncThunk(
    'auth/updateUserStatus',
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}users/${data.userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify({status: data.status}),
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
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);