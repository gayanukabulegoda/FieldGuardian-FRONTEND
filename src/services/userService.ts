import {UserRequestDTO, UserResponse} from '../types/user';
import {api} from './api';

const UserService = {
    updateUser: async (userRequestDTO: UserRequestDTO): Promise<UserResponse> => {
        const response = await api.patch<UserResponse>('/user/update', userRequestDTO);
        return response.data;
    },

    deleteUser: async (email: string): Promise<void> => {
        try {
            await api.delete(`/user`, {params: {email}});
        } catch (error) {
            console.error('Error during user deletion:', error);
            throw new Error('Failed to delete user');
        }
    },

    getUser: async (email: string): Promise<UserResponse> => {
        try {
            const response = await api.get<UserResponse>('/user', {params: {email}});
            return response.data;
        } catch (error) {
            console.error('Error during user retrieval:', error);
            throw new Error('Failed to retrieve user');
        }
    },

    getAllUsers: async (): Promise<UserResponse[]> => {
        try {
            const response = await api.get<UserResponse[]>('/user/all');
            return response.data;
        } catch (error) {
            console.error('Error during users retrieval:', error);
            throw new Error('Failed to retrieve users');
        }
    },
};

export default UserService;