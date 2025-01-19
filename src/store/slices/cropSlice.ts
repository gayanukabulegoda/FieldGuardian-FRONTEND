import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Crop, CropDTO, CropFilters} from '../../types/crop';
import cropService from '../../services/cropService';

interface CropState {
    crops: Crop[];
    loading: boolean;
    error: string | null;
}

const initialState: CropState = {
    crops: [
        {
            code: 'CROP001',
            commonName: 'Tomato',
            scientificName: 'Solanum lycopersicum',
            category: 'VEGETABLE',
            season: 'SUMMER',
            fieldCode: 'FIELD001',
            cropImage: '/public/images/temp-image.jpg'
        },
        {
            code: 'CROP002',
            commonName: 'Corn',
            scientificName: 'Zea mays',
            category: 'GRAIN',
            season: 'SUMMER',
            fieldCode: 'FIELD002',
            cropImage: '/public/images/temp-image.jpg'
        },
        {
            code: 'CROP003',
            commonName: 'Wheat',
            scientificName: 'Triticum aestivum',
            category: 'GRAIN',
            season: 'AUTUMN',
            fieldCode: 'FIELD003',
            cropImage: '/public/images/temp-image.jpg'
        },
        {
            code: 'CROP004',
            commonName: 'Carrot',
            scientificName: 'Daucus carota',
            category: 'VEGETABLE',
            season: 'SPRING',
            fieldCode: 'FIELD004',
            cropImage: '/public/images/temp-image.jpg'
        },
        {
            code: 'CROP005',
            commonName: 'Apple',
            scientificName: 'Malus domestica',
            category: 'FRUIT',
            season: 'AUTUMN',
            fieldCode: 'FIELD005',
            cropImage: '/public/images/temp-image.jpg'
        },
        {
            code: 'CROP006',
            commonName: 'Lettuce',
            scientificName: 'Lactuca sativa',
            category: 'VEGETABLE',
            season: 'SPRING',
            fieldCode: 'FIELD006',
            cropImage: '/public/images/temp-image.jpg'
        },
        {
            code: 'CROP007',
            commonName: 'Strawberry',
            scientificName: 'Fragaria × ananassa',
            category: 'FRUIT',
            season: 'SUMMER',
            fieldCode: 'FIELD007',
            cropImage: '/public/images/temp-image.jpg'
        },
        {
            code: 'CROP008',
            commonName: 'Basil',
            scientificName: 'Ocimum basilicum',
            category: 'HERB',
            season: 'SUMMER',
            fieldCode: 'FIELD008',
            cropImage: '/public/images/temp-image.jpg'
        }
    ],
    loading: false,
    error: null
};

export const fetchAllCrops = createAsyncThunk(
    'crop/fetchAll',
    async () => {
        return await cropService.getAllCrops();
    }
);

export const addCrop = createAsyncThunk(
    'crop/add',
    async (cropDTO: CropDTO) => {
        return await cropService.saveCrop(cropDTO);
    }
);

export const updateCrop = createAsyncThunk(
    'crop/update',
    async ({id, cropDTO}: { id: string; cropDTO: CropDTO }) => {
        return await cropService.updateCrop(id, cropDTO);
    }
);

export const deleteCrop = createAsyncThunk(
    'crop/delete',
    async (id: string) => {
        await cropService.deleteCrop(id);
        return id;
    }
);

const cropSlice = createSlice({
    name: 'crop',
    initialState,
    reducers: {
        filterCrops: (state, action) => {
            const filters: CropFilters = action.payload;
            if (!filters.name && !filters.field) return;

            state.crops = state.crops.filter(crop => {
                const nameMatch = !filters.name ||
                    crop.commonName.toLowerCase().includes(filters.name.toLowerCase());
                const fieldMatch = !filters.field ||
                    crop.fieldCode === filters.field;
                return nameMatch && fieldMatch;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCrops.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCrops.fulfilled, (state, action) => {
                state.loading = false;
                state.crops = action.payload;
            })
            .addCase(fetchAllCrops.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch crops';
            })
            .addCase(addCrop.fulfilled, (state, action) => {
                state.crops.push(action.payload);
            })
            .addCase(updateCrop.fulfilled, (state, action) => {
                const index = state.crops.findIndex(c => c.code === action.payload.code);
                if (index !== -1) {
                    state.crops[index] = action.payload;
                }
            })
            .addCase(deleteCrop.fulfilled, (state, action) => {
                state.crops = state.crops.filter(c => c.code !== action.payload);
            });
    }
});

export const {filterCrops} = cropSlice.actions;
export default cropSlice.reducer;