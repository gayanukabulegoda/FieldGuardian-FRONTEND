import {api} from './api';
import {
    MonitoringLog,
    MonitoringLogDTO,
    MonitoringLogFilters,
    UpdateStaffAndCropsDTO,
} from '../types/monitoringLog';
import {Staff} from '../types/staff';
import {Crop} from '../types/crop';

const MonitoringLogService = {
    saveMonitoringLog: async (monitoringLogDTO: MonitoringLogDTO): Promise<MonitoringLog> => {
        const formData = new FormData();
        Object.entries(monitoringLogDTO).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(item => formData.append(key, item));
            } else {
                formData.append(key, value);
            }
        });

        const response = await api.post<MonitoringLog>('/monitoring-log', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    },

    updateMonitoringLog: async (id: string, monitoringLogDTO: MonitoringLogDTO): Promise<MonitoringLog> => {
        const formData = new FormData();
        Object.entries(monitoringLogDTO).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(item => formData.append(key, item));
            } else {
                formData.append(key, value);
            }
        });

        const response = await api.patch<MonitoringLog>(`/monitoring-log/${id}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    },

    updateStaffAndCrops: async (updateDTO: UpdateStaffAndCropsDTO): Promise<void> => {
        await api.patch('/monitoring-log/update-staff-and-crops', updateDTO);
    },

    deleteMonitoringLog: async (id: string): Promise<void> => {
        await api.delete(`/monitoring-log/${id}`);
    },

    getMonitoringLog: async (id: string): Promise<MonitoringLog> => {
        const response = await api.get<MonitoringLog>(`/monitoring-log/${id}`);
        return response.data;
    },

    getAllMonitoringLogs: async (): Promise<MonitoringLog[]> => {
        const response = await api.get<MonitoringLog[]>('/monitoring-log');
        return response.data;
    },

    getCropsByMonitoringLogId: async (id: string): Promise<Crop[]> => {
        const response = await api.get<Crop[]>(`/monitoring-log/${id}/crops`);
        return response.data;
    },

    getStaffByMonitoringLogId: async (id: string): Promise<Staff[]> => {
        const response = await api.get<Staff[]>(`/monitoring-log/${id}/staff`);
        return response.data;
    },

    filterMonitoringLogs: async (filters: MonitoringLogFilters): Promise<MonitoringLog[]> => {
        const response = await api.post<MonitoringLog[]>('/monitoring-log/filter', filters);
        return response.data;
    }
};

export default MonitoringLogService;