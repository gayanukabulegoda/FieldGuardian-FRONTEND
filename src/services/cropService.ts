import {api} from './api';
import {Crop, CropDTO} from '../types/crop';

const CropService = {
    saveCrop: async (cropDTO: CropDTO): Promise<Crop> => {
        const formData = new FormData();
        Object.entries(cropDTO).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await api.post<Crop>('/crop', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    },

    updateCrop: async (id: string, cropDTO: CropDTO): Promise<Crop> => {
        const formData = new FormData();
        Object.entries(cropDTO).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await api.patch<Crop>(`/crop/${id}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    },

    deleteCrop: async (id: string): Promise<void> => {
        await api.delete(`/crop/${id}`);
    },

    getCrop: async (id: string): Promise<Crop> => {
        const response = await api.get<Crop>(`/crop/${id}`);
        return response.data;
    },

    getAllCrops: async (): Promise<Crop[]> => {
        const response = await api.get<Crop[]>('/crop');
        return response.data;
    }
};

export default CropService;