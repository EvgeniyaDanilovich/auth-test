import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './api/fetchUsers';
import { updateLastLoginDate } from './api/updateLastLoginDate';
import { updateUserStatus } from './api/updateUserStatus';

export const initialAuthState = {
    users: [],
    isLoading: false,
    error: undefined,
};

const usersSlice = createSlice({
    name: 'users',
    initialState: initialAuthState,
    reducers: {
        setChecked(state, action) {
            state.users.map(user => {
                if (user.id === action.payload.userId) {
                    user.checked = action.payload.checked;
                }
            });
        },

        setAllCheckbox(state, action) {
            state.users.map(user => {
                user.checked = action.payload;
            });
        },

        deleteUser(state, action) {
            if (action.payload) {
                const index = state.users.findIndex((user) => user.id === action.payload);
                state.users.splice(index, 1);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(updateLastLoginDate.pending, (state) => {
            state.error = undefined;
        });
        builder.addCase(updateLastLoginDate.fulfilled, (state, action) => {
            state.users.filter(user => {
                if (user.id === action.payload.id) {
                    user.lastLoginDate = action.payload.lastLoginDate;
                }
            });
        });
        builder.addCase(updateLastLoginDate.rejected, (state, action) => {
            state.error = action.payload;
        });

        builder.addCase(updateUserStatus.pending, (state) => {
            state.error = undefined;
        });
        builder.addCase(updateUserStatus.fulfilled, (state, action) => {
            state.users.filter(user => {
                if (user.id === action.payload.id) {
                    user.status = action.payload.status;
                }
            });
        });
        builder.addCase(updateUserStatus.rejected, (state, action) => {
            state.error = action.payload;
        });

        // builder.addCase(deleteUser.pending, (state) => {
        //     state.error = undefined;
        // });
        // builder.addCase(deleteUser.fulfilled, (state, action) => {
        //
        // });
        // builder.addCase(deleteUser.rejected, (state, action) => {
        //     state.error = action.payload;
        // });
    },
});

export const { actions: usersActions } = usersSlice;
export const { reducer: usersReducer } = usersSlice;