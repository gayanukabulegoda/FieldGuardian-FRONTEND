import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Vehicle, VehicleDTO, VehicleFilters} from '../../types/vehicle';
import vehicleService from '../../services/vehicleService';

interface VehicleState {
    vehicles: Vehicle[];
    loading: boolean;
    error: string | null;
}

// const initialState: VehicleState = {
//     vehicles: [],
//     loading: false,
//     error: null
// };

const initialState: VehicleState = {
    vehicles: [
        {
            code: 'V001',
            licensePlateNumber: 'ABC123',
            category: 'TRACTOR',
            status: 'AVAILABLE',
            fuelType: 'DIESEL',
            driverId: 'D001',
            remark: 'New vehicle'
        },
        {
            code: 'V002',
            licensePlateNumber: 'XYZ789',
            category: 'WATER_TANKER',
            status: 'IN_USE',
            fuelType: 'PETROL',
            driverId: 'D002',
            remark: 'Needs maintenance'
        },
        {
            code: 'V003',
            licensePlateNumber: 'LMN456',
            category: 'SPRAYER',
            status: 'OUT_OF_SERVICE',
            fuelType: 'LPG',
            driverId: 'D003',
            remark: 'Battery issue'
        },
        {
            code: 'V004',
            licensePlateNumber: 'JKL321',
            category: 'TRACTOR',
            status: 'AVAILABLE',
            fuelType: 'DIESEL',
            driverId: 'D004',
            remark: 'Ready for use'
        },
        {
            code: 'V005',
            licensePlateNumber: 'GHI654',
            category: 'IRRIGATION_TRUCK',
            status: 'IN_USE',
            fuelType: 'PETROL',
            driverId: 'D005',
            remark: 'In good condition'
        },
        {
            code: 'V006',
            licensePlateNumber: 'DEF987',
            category: 'SPRAYER',
            status: 'OUT_OF_SERVICE',
            fuelType: 'ETHANOL',
            driverId: 'D006',
            remark: 'Requires repair'
        },
        {
            code: 'V007',
            licensePlateNumber: 'PQR123',
            category: 'TRACTOR',
            status: 'AVAILABLE',
            fuelType: 'DIESEL',
            driverId: 'D007',
            remark: 'Newly acquired'
        },
        {
            code: 'V008',
            licensePlateNumber: 'STU456',
            category: 'SUGARCANE_HARVESTER',
            status: 'IN_USE',
            fuelType: 'PETROL',
            driverId: 'D008',
            remark: 'Operational'
        }
    ],
    loading: false,
    error: null
};

export const fetchAllVehicles = createAsyncThunk(
    'vehicle/fetchAll',
    async () => {
        return await vehicleService.getAllVehicles();
    }
);

export const filterVehicles = createAsyncThunk(
    'vehicle/filter',
    async (filters: VehicleFilters) => {
        return await vehicleService.filterVehicles(filters);
    }
);

export const addVehicle = createAsyncThunk(
    'vehicle/add',
    async (vehicleDTO: VehicleDTO) => {
        return await vehicleService.saveVehicle(vehicleDTO);
    }
);

export const updateVehicle = createAsyncThunk(
    'vehicle/update',
    async ({id, vehicleDTO}: { id: string; vehicleDTO: VehicleDTO }) => {
        return await vehicleService.updateVehicle(id, vehicleDTO);
    }
);

export const deleteVehicle = createAsyncThunk(
    'vehicle/delete',
    async (id: string) => {
        await vehicleService.deleteVehicle(id);
        return id;
    }
);

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllVehicles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllVehicles.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = action.payload;
            })
            .addCase(fetchAllVehicles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch vehicles';
            })
            .addCase(filterVehicles.fulfilled, (state, action) => {
                state.vehicles = action.payload;
            })
            .addCase(addVehicle.fulfilled, (state, action) => {
                state.vehicles.push(action.payload);
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                const index = state.vehicles.findIndex(v => v.code === action.payload.code);
                if (index !== -1) {
                    state.vehicles[index] = action.payload;
                }
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.vehicles = state.vehicles.filter(v => v.code !== action.payload);
            });
    }
});

export default vehicleSlice.reducer;