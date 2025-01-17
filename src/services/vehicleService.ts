import {api} from './api';
import {Vehicle, VehicleDTO, VehicleFilters} from '../types/vehicle';

const VehicleService = {
    saveVehicle: async (vehicleDTO: VehicleDTO): Promise<Vehicle> => {
        const response = await api.post<Vehicle>('/vehicle', vehicleDTO);
        return response.data;
    },

    updateVehicle: async (id: string, vehicleDTO: VehicleDTO): Promise<Vehicle> => {
        const response = await api.patch<Vehicle>(`/vehicle/${id}`, vehicleDTO);
        return response.data;
    },

    updateVehicleDriver: async (vehicleId: string, driverId: string): Promise<void> => {
        await api.patch(`/vehicle/${vehicleId}/driver/${driverId}`);
    },

    deleteVehicle: async (id: string): Promise<void> => {
        await api.delete(`/vehicle/${id}`);
    },

    getVehicle: async (id: string): Promise<Vehicle> => {
        const response = await api.get<Vehicle>(`/vehicle/${id}`);
        return response.data;
    },

    getAllVehicles: async (): Promise<Vehicle[]> => {
        const response = await api.get<Vehicle[]>('/vehicle');
        return response.data;
    },

    filterVehicles: async (filters: VehicleFilters): Promise<Vehicle[]> => {
        const response = await api.post<Vehicle[]>('/vehicle/filter', filters);
        return response.data;
    }
};

export default VehicleService;