import { configureStore } from '@reduxjs/toolkit';
import userReducer, { userSlice } from './features/userSlice';

export default configureStore({
    reducer: {
        user: userSlice,
    },
});

