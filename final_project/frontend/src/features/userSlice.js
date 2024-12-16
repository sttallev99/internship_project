import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            state.initialState = action.payload;
        },
        updateUser: (state, action) => {
            state.initialState = action.payload
        },
        removeUser: (state, action) => {
            state.initialState = null
        }
    }
});

export const { addUser, updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
