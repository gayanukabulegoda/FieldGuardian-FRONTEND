import {Staff} from './staff';
import {Crop} from './crop';

export interface MonitoringLog {
    code: string;
    date: string;
    fieldCode: string;
    details?: string;
    observedImage?: string;
    staffCount: number;
}

export interface MonitoringLogDTO {
    fieldCode: string;
    details?: string;
    observedImage?: File;
    staffIds: string[];
    cropIds: string[];
}

export interface MonitoringLogFilters {
    field?: string;
    date?: string;
}

export interface MonitoringLogDetails extends MonitoringLog {
    staff: Staff[];
    crops: Crop[];
}

export interface UpdateStaffAndCropsDTO {
    monitoringLogId: string;
    staffIds: string[];
    cropIds: string[];
}