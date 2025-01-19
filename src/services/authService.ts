import {api} from './api';
import {UserRequestDTO, AuthResponse, ValidationResponse} from '../types/auth';

const AuthService = {
    signUp: async (userRequestDTO: UserRequestDTO): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register', userRequestDTO);
        return response.data;
    },

    signIn: async (userRequestDTO: UserRequestDTO): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/authenticate', userRequestDTO);
        return response.data;
    },

    validateUser: async (token: string): Promise<ValidationResponse> => {
        try {
            const response = await api.post<ValidationResponse>('/auth/validate', null, {
                headers: {Authorization: `Bearer ${token}`},
            });
            return response.data;
        } catch (error) {
            console.error('Error during user validation:', error);
            throw new Error('Failed to validate user');
        }
    },

    requestOtp: async (option: number, email: string): Promise<void> => {
        try {
            await api.post(`/auth/otp`, null, {
                params: {option, email},
            });
        } catch (error) {
            console.error('Error during OTP request:', error);
            throw new Error('Failed to request OTP');
        }
    },

    refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
        try {
            const response = await api.post<AuthResponse>('/auth/refresh', {refreshToken});
            return response.data;
        } catch (error) {
            console.error('Error during token refresh:', error);
            throw new Error('Failed to refresh token');
        }
    },
};

export default AuthService;