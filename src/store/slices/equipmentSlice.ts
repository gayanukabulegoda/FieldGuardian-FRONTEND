import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Equipment, EquipmentDTO, EquipmentFilters} from '../../types/equipment';
import equipmentService from '../../services/equipmentService';

interface EquipmentState {
    equipment: Equipment[];
    loading: boolean;
    error: string | null;
}

const initialState: EquipmentState = {
    equipment: [
        {
            id: 'EQ001',
            name: 'Tractor A',
            type: 'Tractor',
            status: 'AVAILABLE',
            assignedFieldCode: 'FIELD001',
            assignedStaffId: 'STAFF001'
        },
        {
            id: 'EQ002',
            name: 'Plow B',
            type: 'Plow',
            status: 'IN_USE',
            assignedFieldCode: 'FIELD002',
            assignedStaffId: 'STAFF002'
        },
        {
            id: 'EQ003',
            name: 'Harrow C',
            type: 'Harrow',
            status: 'UNDER_MAINTENANCE',
            assignedFieldCode: 'FIELD003',
            assignedStaffId: 'STAFF003'
        },
        {
            id: 'EQ004',
            name: 'Cultivator D',
            type: 'Cultivator',
            status: 'AVAILABLE',
            assignedFieldCode: 'FIELD004',
            assignedStaffId: 'STAFF004'
        },
        {
            id: 'EQ005',
            name: 'Sprinkler System E',
            type: 'Sprinkler System',
            status: 'IN_USE',
            assignedFieldCode: 'FIELD005',
            assignedStaffId: 'STAFF005'
        },
        {
            id: 'EQ006',
            name: 'Combine Harvester F',
            type: 'Combine Harvester',
            status: 'AVAILABLE',
            assignedFieldCode: 'FIELD006',
            assignedStaffId: 'STAFF006'
        },
        {
            id: 'EQ007',
            name: 'Rice Mill G',
            type: 'Rice Mill',
            status: 'UNDER_MAINTENANCE',
            assignedFieldCode: 'FIELD007',
            assignedStaffId: 'STAFF007'
        },
        {
            id: 'EQ008',
            name: 'Farm Truck H',
            type: 'Farm Truck',
            status: 'AVAILABLE',
            assignedFieldCode: 'FIELD008',
            assignedStaffId: 'STAFF008'
        }
    ],
    loading: false,
    error: null
};

export const fetchAllEquipment = createAsyncThunk(
    'equipment/fetchAll',
    async () => {
        return await equipmentService.getAllEquipments();
    }
);

export const addEquipment = createAsyncThunk(
    'equipment/add',
    async (equipmentDTO: EquipmentDTO) => {
        return await equipmentService.saveEquipment(equipmentDTO);
    }
);

export const updateEquipment = createAsyncThunk(
    'equipment/update',
    async ({id, equipmentDTO}: { id: string; equipmentDTO: EquipmentDTO }) => {
        return await equipmentService.updateEquipment(id, equipmentDTO);
    }
);

export const deleteEquipment = createAsyncThunk(
    'equipment/delete',
    async (id: string) => {
        await equipmentService.deleteEquipment(id);
        return id;
    }
);

const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        filterEquipment: (state, action) => {
            const filters: EquipmentFilters = action.payload;
            if (!filters.name && !filters.status) return;

            state.equipment = state.equipment.filter(equip => {
                const nameMatch = !filters.name ||
                    equip.name.toLowerCase().includes(filters.name.toLowerCase());
                const statusMatch = !filters.status ||
                    equip.status === filters.status;
                return nameMatch && statusMatch;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEquipment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllEquipment.fulfilled, (state, action) => {
                state.loading = false;
                state.equipment = action.payload;
            })
            .addCase(fetchAllEquipment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch equipment';
            })
            .addCase(addEquipment.fulfilled, (state, action) => {
                state.equipment.push(action.payload);
            })
            .addCase(updateEquipment.fulfilled, (state, action) => {
                const index = state.equipment.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.equipment[index] = action.payload;
                }
            })
            .addCase(deleteEquipment.fulfilled, (state, action) => {
                state.equipment = state.equipment.filter(e => e.id !== action.payload);
            });
    }
});

export const {filterEquipment} = equipmentSlice.actions;
export default equipmentSlice.reducer;