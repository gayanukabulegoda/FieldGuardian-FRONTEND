import {api} from './api';
import {Equipment, EquipmentDTO, UpdateEquipmentStaffDTO} from '../types/equipment';

const EquipmentService = {
    saveEquipment: async (equipmentDTO: EquipmentDTO): Promise<Equipment> => {
        const response = await api.post<Equipment>('/equipment', equipmentDTO);
        return response.data;
    },

    updateEquipment: async (id: string, equipmentDTO: EquipmentDTO): Promise<Equipment> => {
        const response = await api.patch<Equipment>(`/equipment/${id}`, equipmentDTO);
        return response.data;
    },

    updateFieldEquipments: async (fieldCode: string, equipmentIds: string[]): Promise<void> => {
        await api.patch(`/equipment/field/${fieldCode}`, equipmentIds);
    },

    updateEquipmentStaff: async (updateDTO: UpdateEquipmentStaffDTO): Promise<void> => {
        await api.patch('/equipment/update-staff', updateDTO);
    },

    deleteEquipment: async (id: string): Promise<void> => {
        await api.delete(`/equipment/${id}`);
    },

    getEquipment: async (id: string): Promise<Equipment> => {
        const response = await api.get<Equipment>(`/equipment/${id}`);
        return response.data;
    },

    getAllEquipments: async (): Promise<Equipment[]> => {
        const response = await api.get<Equipment[]>('/equipment');
        return response.data;
    },

    getAvailableEquipments: async (): Promise<Equipment[]> => {
        const response = await api.get<Equipment[]>('/equipment/available');
        return response.data;
    },

    getInUseFieldEquipments: async (fieldCode: string): Promise<Equipment[]> => {
        const response = await api.get<Equipment[]>(`/equipment/field/${fieldCode}`);
        return response.data;
    }
};

export default EquipmentService;