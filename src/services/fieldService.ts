import {api} from './api';
import {Field, FieldDTO} from '../types/field';

const FieldService = {
    saveField: async (fieldDTO: FieldDTO): Promise<Field> => {
        const formData = new FormData();
        Object.entries(fieldDTO).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, String(value));
            }
        });

        const response = await api.post<Field>('/field', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateField: async (id: string, fieldDTO: FieldDTO): Promise<Field> => {
        const formData = new FormData();
        Object.entries(fieldDTO).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, String(value));
            }
        });

        const response = await api.patch<Field>(`/field/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateFieldStaff: async (id: string, staffIds: string[]): Promise<void> => {
        await api.patch(`/field/${id}/staff`, staffIds);
    },

    deleteField: async (id: string): Promise<void> => {
        await api.delete(`/field/${id}`);
    },

    getField: async (id: string): Promise<Field> => {
        const response = await api.get<Field>(`/field/${id}`);
        return response.data;
    },

    getAllFields: async (): Promise<Field[]> => {
        const response = await api.get<Field[]>('/field');
        return response.data;
    },

    getFieldStaff: async (id: string): Promise<any[]> => {
        const response = await api.get(`/field/${id}/staff`);
        return response.data;
    },

    getFieldCrops: async (fieldId: string): Promise<any[]> => {
        const response = await api.get(`/field/${fieldId}/crops`);
        return response.data;
    },
};

export default FieldService;