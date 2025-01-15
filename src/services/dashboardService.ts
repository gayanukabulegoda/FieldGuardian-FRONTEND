import {api} from './api';

interface TopField {
    fieldName: string;
    monitoringCount: number;
}

const DashboardService = {
    getTotalUsers: async (): Promise<number> => {
        const response = await api.get<number>('/dashboard/user-count');
        return response.data;
    },

    getTotalActiveStaff: async (): Promise<number> => {
        const response = await api.get<number>('/dashboard/staff-count');
        return response.data;
    },

    getTotalActiveCrops: async (): Promise<number> => {
        const response = await api.get<number>('/dashboard/crop-count');
        return response.data;
    },

    getTotalActiveVehicles: async (): Promise<number> => {
        const response = await api.get<number>('/dashboard/vehicle-count');
        return response.data;
    },

    getTotalActiveEquipment: async (): Promise<number> => {
        const response = await api.get<number>('/dashboard/equipment-count');
        return response.data;
    },

    getTopMonitoredFields: async (): Promise<TopField[]> => {
        const response = await api.get<TopField[]>('/dashboard/top-fields');
        return response.data;
    },
};

export default DashboardService;