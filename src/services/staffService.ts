import {api} from './api';
import {Staff, StaffDTO, StaffFilters} from '../types/staff';

const StaffService = {
    saveStaff: async (staffDTO: StaffDTO): Promise<Staff> => {
        const response = await api.post<Staff>('/staff', staffDTO);
        return response.data;
    },

    updateStaff: async (id: string, staffDTO: StaffDTO): Promise<Staff> => {
        const response = await api.patch<Staff>(`/staff/${id}`, staffDTO);
        return response.data;
    },

    deleteStaff: async (id: string): Promise<void> => {
        await api.delete(`/staff/${id}`);
    },

    getStaff: async (id: string): Promise<Staff> => {
        const response = await api.get<Staff>(`/staff/${id}`);
        return response.data;
    },

    getAllStaff: async (): Promise<Staff[]> => {
        const response = await api.get<Staff[]>('/staff');
        return response.data;
    },

    getStaffVehicles: async (id: string): Promise<any[]> => {
        const response = await api.get(`/staff/${id}/vehicles`);
        return response.data;
    },

    getStaffFields: async (id: string): Promise<any[]> => {
        const response = await api.get(`/staff/${id}/fields`);
        return response.data;
    },

    getStaffWithoutEquipment: async (): Promise<Staff[]> => {
        const response = await api.get<Staff[]>('/staff/without-equipment');
        return response.data;
    },

    getAllStaffDesignations: async (): Promise<string[]> => {
        const response = await api.get<string[]>('/staff/designations');
        return response.data;
    },

    filterStaff: async (filters: StaffFilters): Promise<Staff[]> => {
        const response = await api.post<Staff[]>('/staff/filter', filters);
        return response.data;
    },
};

export default StaffService;