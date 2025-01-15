import {configureStore} from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice.ts";
import userSlice from "./slices/userSlice.ts";
import staffSlice from "./slices/staffSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        staff: staffSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;