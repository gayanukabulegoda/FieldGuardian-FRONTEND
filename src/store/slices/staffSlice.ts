import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Staff, StaffDTO, StaffFilters, Designation} from '../../types/staff';
import staffService from '../../services/staffService';

interface StaffState {
    staff: Staff[];
    designations: Designation[];
    loading: boolean;
    error: string | null;
    selectedStaff: Staff | null;
}

// const initialState: StaffState = {
//     staff: [],
//     designations: [],
//     loading: false,
//     error: null,
//     selectedStaff: null,
// };

const initialState: StaffState = {
    staff: [
        {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '1990-01-01',
            address: '123 Main St',
            postalCode: '12345',
            contactNo: '123-456-7890',
            email: 'john.doe@example.com',
            joinedDate: '2020-01-01',
            gender: 'MALE',
            designation: 'Manager'
        },
        {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            dateOfBirth: '1985-05-15',
            address: '456 Elm St',
            postalCode: '67890',
            contactNo: '987-654-3210',
            email: 'jane.smith@example.com',
            joinedDate: '2019-05-15',
            gender: 'FEMALE',
            designation: 'Scientist'
        },
        {
            id: '3',
            firstName: 'Alice',
            lastName: 'Johnson',
            dateOfBirth: '1992-03-10',
            address: '789 Oak St',
            postalCode: '11223',
            contactNo: '555-123-4567',
            email: 'alice.johnson@example.com',
            joinedDate: '2021-03-10',
            gender: 'FEMALE',
            designation: 'Technician'
        },
        {
            id: '4',
            firstName: 'Bob',
            lastName: 'Brown',
            dateOfBirth: '1988-07-22',
            address: '321 Pine St',
            postalCode: '33445',
            contactNo: '555-987-6543',
            email: 'bob.brown@example.com',
            joinedDate: '2018-07-22',
            gender: 'MALE',
            designation: 'Manager'
        },
        {
            id: '5',
            firstName: 'Charlie',
            lastName: 'Davis',
            dateOfBirth: '1995-11-30',
            address: '654 Maple St',
            postalCode: '55667',
            contactNo: '555-654-3210',
            email: 'charlie.davis@example.com',
            joinedDate: '2022-11-30',
            gender: 'MALE',
            designation: 'Scientist'
        },
        {
            id: '6',
            firstName: 'Diana',
            lastName: 'Evans',
            dateOfBirth: '1983-02-14',
            address: '987 Birch St',
            postalCode: '77889',
            contactNo: '555-321-0987',
            email: 'diana.evans@example.com',
            joinedDate: '2017-02-14',
            gender: 'FEMALE',
            designation: 'Technician'
        },
        {
            id: '7',
            firstName: 'Eve',
            lastName: 'Foster',
            dateOfBirth: '1991-06-25',
            address: '123 Cedar St',
            postalCode: '99001',
            contactNo: '555-789-0123',
            email: 'eve.foster@example.com',
            joinedDate: '2020-06-25',
            gender: 'FEMALE',
            designation: 'Manager'
        },
        {
            id: '8',
            firstName: 'Frank',
            lastName: 'Green',
            dateOfBirth: '1987-09-18',
            address: '456 Spruce St',
            postalCode: '22334',
            contactNo: '555-456-7890',
            email: 'frank.green@example.com',
            joinedDate: '2019-09-18',
            gender: 'MALE',
            designation: 'Scientist'
        }
    ],
    designations: ['Manager', 'Scientist', 'Technician'],
    loading: false,
    error: null,
    selectedStaff: null,
};

export const fetchAllStaff = createAsyncThunk(
    'staff/fetchAll',
    async () => {
        return await staffService.getAllStaff();
    }
);

export const fetchDesignations = createAsyncThunk(
    'staff/fetchDesignations',
    async () => {
        return await staffService.getAllStaffDesignations();
    }
);

export const filterStaff = createAsyncThunk(
    'staff/filter',
    async (filters: StaffFilters) => {
        return await staffService.filterStaff(filters);
    }
);

export const addStaff = createAsyncThunk(
    'staff/add',
    async (staffDTO: StaffDTO) => {
        return await staffService.saveStaff(staffDTO);
    }
);

export const updateStaff = createAsyncThunk(
    'staff/update',
    async ({id, staffDTO}: { id: string; staffDTO: StaffDTO }) => {
        return await staffService.updateStaff(id, staffDTO);
    }
);

export const deleteStaff = createAsyncThunk(
    'staff/delete',
    async (id: string) => {
        await staffService.deleteStaff(id);
        return id;
    }
);

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setSelectedStaff: (state, action) => {
            state.selectedStaff = action.payload;
        },
        clearSelectedStaff: (state) => {
            state.selectedStaff = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllStaff.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllStaff.fulfilled, (state, action) => {
                state.loading = false;
                state.staff = action.payload;
            })
            .addCase(fetchAllStaff.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch staff';
            })
            .addCase(fetchDesignations.fulfilled, (state, action) => {
                state.designations = action.payload;
            })
            .addCase(filterStaff.fulfilled, (state, action) => {
                state.staff = action.payload;
            })
            .addCase(addStaff.fulfilled, (state, action) => {
                state.staff.push(action.payload);
            })
            .addCase(updateStaff.fulfilled, (state, action) => {
                const index = state.staff.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.staff[index] = action.payload;
                }
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                state.staff = state.staff.filter(s => s.id !== action.payload);
            });
    },
});

export const {setSelectedStaff, clearSelectedStaff} = staffSlice.actions;
export default staffSlice.reducer;