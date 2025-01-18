import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {UserRequestDTO, UserResponse} from '../../types/user';
import userService from '../../services/userService';

interface User {
    name: string;
    email: string;
    gender: 'MALE' | 'FEMALE';
    role: string;
}

interface UserState {
    currentUser: User | null;
    users: UserResponse[];
    loading: boolean;
    error: string | null;
}

// const initialState: UserState = {
//     currentUser: null,
//     users: [],
//     loading: false,
//     error: null,
// };

const initialState: UserState = {
    currentUser: {
        name: "John Doe",
        email: "grbulegoda@gmail.com",
        gender: 'MALE',
        role: "MANAGER"
    },
    users: [
        {
            name: "John Doe",
            email: "grbulegoda@gmail.com",
            role: "MANAGER"
        },
        {
            name: "Jane Doe",
            email: "janedoe@gmail.com",
            role: "STAFF"
        },
        {
            name: "Alice",
            email: "alice@gmail.com",
            role: "STAFF"
        },
        {
            name: "Bob",
            email: "bob@gmail.com",
            role: "STAFF"
        }
    ],
    loading: false,
    error: null,
};

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAll',
    async () => {
        return await userService.getAllUsers();
    }
);

export const updateUser = createAsyncThunk(
    'user/update',
    async (userDTO: UserRequestDTO) => {
        return await userService.updateUser(userDTO);
    }
);

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (email: string) => {
        await userService.deleteUser(email);
        return email;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        clearUser: (state) => {
            state.currentUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(u => u.email === action.payload.email);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(u => u.email !== action.payload);
            });
    },
});

export const {setCurrentUser, clearUser} = userSlice.actions;
export default userSlice.reducer;