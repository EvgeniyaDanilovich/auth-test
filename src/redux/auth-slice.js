import { createSlice } from '@reduxjs/toolkit';
import { loginByUserName } from './api/loginByUserName';
import { setAuthData } from './api/setAuthData';
import { getCurrentDate } from '../utils/getCurrentDate';

export const initialAuthState = {
    id: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
    registrationDate: undefined,
    lastLoginDate: undefined,
    status: undefined,
    isAuth: false,
    error: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload;
        },
        setStateUserId(state, action) {
            if (action.payload.id) {
                state.id = action.payload.id;
            }
        },
        resetUserData(state) {
            state.token = '';
            state.login = '';
        },

    },
    extraReducers: (builder) => {
        builder.addCase(setAuthData.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(setAuthData.fulfilled, (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.registrationDate = action.payload.currentDate;
            state.status = action.payload.status;
            state.isLoading = false;
        });
        builder.addCase(setAuthData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(loginByUserName.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(loginByUserName.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.lastLoginDate = getCurrentDate();

            state.isAuth = true;
            state.isLoading = false;
        });
        builder.addCase(loginByUserName.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

// export const { actions: authActions } = authSlice.actions;
export const { setIsAuth } = authSlice.actions;
export const { reducer: authReducer } = authSlice;