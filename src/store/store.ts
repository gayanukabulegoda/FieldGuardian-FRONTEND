import {configureStore} from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice.ts";
import userSlice from "./slices/userSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;