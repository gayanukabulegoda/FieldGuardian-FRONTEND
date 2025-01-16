import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Field, FieldDTO} from '../../types/field';
import fieldService from '../../services/fieldService';

interface FieldState {
    fields: Field[];
    loading: boolean;
    error: string | null;
}

const initialState: FieldState = {
    fields: [
        {
            code: 'F001',
            name: 'Field One',
            location: 'Location One',
            extentSize: 100,
            fieldImage1: '/public/images/temp-image.jpg',
            fieldImage2: '/public/images/temp-image.jpg',
        },
        {
            code: 'F002',
            name: 'Field Two',
            location: 'Location Two',
            extentSize: 200,
            fieldImage1: '/public/images/temp-image.jpg',
            fieldImage2: '/public/images/temp-image.jpg',
        },
        {
            code: 'F003',
            name: 'Field Three',
            location: 'Location Three',
            extentSize: 300,
            fieldImage1: '/public/images/temp-image.jpg',
            fieldImage2: '/public/images/temp-image.jpg',
        },
        {
            code: 'F004',
            name: 'Field Four',
            location: 'Location Four',
            extentSize: 400,
            fieldImage1: '/public/images/temp-image.jpg',
            fieldImage2: '/public/images/temp-image.jpg',
        },
        {
            code: 'F005',
            name: 'Field Five',
            location: 'Location Five',
            extentSize: 500,
            fieldImage1: '/public/images/temp-image.jpg',
            fieldImage2: '/public/images/temp-image.jpg',
        },
        {
            code: 'F006',
            name: 'Field Six',
            location: 'Location Six',
            extentSize: 600,
            fieldImage1: '/public/images/temp-image.jpg',
            fieldImage2: '/public/images/temp-image.jpg',
        },
        {
            code: 'F007',
            name: 'Field Seven',
            location: 'Location Seven',
            extentSize: 700,
            fieldImage1: '/public/images/temp-image.jpg',
            fieldImage2: '/public/images/temp-image.jpg',
        },
        {
            code: 'F008',
            name: 'Field Eight',
            location: 'Location Eight',
            extentSize: 800,
            fieldImage1: '/public/images/temp-image.jpg',
            fieldImage2: '/public/images/temp-image.jpg',
        },
    ],
    loading: false,
    error: null
};

export const fetchAllFields = createAsyncThunk(
    'field/fetchAll',
    async () => {
        return await fieldService.getAllFields();
    }
);

export const addField = createAsyncThunk(
    'field/add',
    async (fieldDTO: FieldDTO) => {
        return await fieldService.saveField(fieldDTO);
    }
);

export const updateField = createAsyncThunk(
    'field/update',
    async ({id, fieldDTO}: { id: string; fieldDTO: FieldDTO }) => {
        return await fieldService.updateField(id, fieldDTO);
    }
);

export const deleteField = createAsyncThunk(
    'field/delete',
    async (id: string) => {
        await fieldService.deleteField(id);
        return id;
    }
);

const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFields.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllFields.fulfilled, (state, action) => {
                state.loading = false;
                state.fields = action.payload;
            })
            .addCase(fetchAllFields.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch fields';
            })
            .addCase(addField.fulfilled, (state, action) => {
                state.fields.push(action.payload);
            })
            .addCase(updateField.fulfilled, (state, action) => {
                const index = state.fields.findIndex(f => f.code === action.payload.code);
                if (index !== -1) {
                    state.fields[index] = action.payload;
                }
            })
            .addCase(deleteField.fulfilled, (state, action) => {
                state.fields = state.fields.filter(f => f.code !== action.payload);
            });
    }
});

export default fieldSlice.reducer;