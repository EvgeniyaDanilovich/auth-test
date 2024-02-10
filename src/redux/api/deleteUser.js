import { createAsyncThunk } from '@reduxjs/toolkit';
import { usersActions } from '../users-slice';
import { baseUrl } from '../../const/const';

export const deleteUser = createAsyncThunk(
    'auth/deleteUser',
    async (userId, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}${userId}`,{
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error();
            } else {
                thunkAPI.dispatch(usersActions.deleteUser(userId))
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);