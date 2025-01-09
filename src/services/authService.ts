import { api } from './api';
import { UserRequestDTO, AuthResponse, ValidationResponse } from '../types/auth';

export const authService = {
    signIn: async (userRequestDTO: UserRequestDTO): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/authenticate', userRequestDTO);
        return response.data;
    },

    validateUser: async (token: string): Promise<boolean> => {
        try {
            const response = await api.post<ValidationResponse>('/auth/validate', null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.valid;
        } catch (error) {
            console.error('Error during user validation:', error);
            return false;
        }
    },
};