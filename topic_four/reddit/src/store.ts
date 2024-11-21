import { configureStore } from "@reduxjs/toolkit";
import PostsReducer from './reducers/postsSlice';
import localStorage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const postsPersistConfig = {
    key: "posts",
    storage: localStorage,
}

const persistedReducer = persistReducer(postsPersistConfig, PostsReducer);

export const store = configureStore({
    reducer: {
        posts: persistedReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

