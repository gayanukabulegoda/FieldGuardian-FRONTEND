import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {UserRequestDTO} from '../../types/auth';
import authService from "../../services/authService.ts";

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
    email: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    loading: false,
    error: null,
    email: null,
    isAuthenticated: false,
};

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (credentials: UserRequestDTO) => {
        const response = await authService.signIn(credentials);
        return response;
    }
);

export const validateToken = createAsyncThunk(
    'auth/validateToken',
    async (token: string) => {
        const isValid = await authService.validateUser(token);
        return isValid;
    }
);

export const requestOtp = createAsyncThunk(
    'auth/requestOtp',
    async ({option, email}: { option: number; email: string }) => {
        await authService.requestOtp(option, email);
        return email;
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
            state.isAuthenticated = false;
            state.email = null;
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.loading = false;
                state.isAuthenticated = true;
                document.cookie = `token=${action.payload.token}; path=/`;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to sign in';
            })
            .addCase(validateToken.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload.valid;
            })
            .addCase(requestOtp.fulfilled, (state, action) => {
                state.email = action.payload;
            });
    },
});

export const {clearError, logout, setEmail} = authSlice.actions;
export default authSlice.reducer;