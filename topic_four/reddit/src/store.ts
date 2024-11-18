import { configureStore } from "@reduxjs/toolkit";

import PostsReducer from './reducers/postsSlice';

export const store = configureStore({
    reducer: {
        posts: PostsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

