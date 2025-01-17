import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
    name: string;
    email: string;
    gender: 'MALE' | 'FEMALE';
    role: string;
}

interface UserState {
    currentUser: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        clearUser: (state) => {
            state.currentUser = null;
        },
    },
});

export const {setCurrentUser, clearUser} = userSlice.actions;
export default userSlice.reducer;