import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { UserRequestDTO } from '../../types/auth';

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    loading: false,
    error: null,
};

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (credentials: UserRequestDTO) => {
        const response = await authService.signIn(credentials);
        return response.token;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.token = null;
            state.error = null;
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.token = action.payload;
                state.loading = false;
                document.cookie = `token=${action.payload}; path=/`;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to sign in';
            });
    },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;