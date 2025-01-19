export type EquipmentStatus = 'AVAILABLE' | 'IN_USE' | 'UNDER_MAINTENANCE';
export type EquipmentType =
    'Tractor' | 'Plow' | 'Harrow' | 'Cultivator' | 'Rotavator' |
    'Seed Drill' | 'Planter' | 'Transplanter' | 'Sprinkler System' |
    'Drip Irrigation System' | 'Water Pump' | 'Sprayer' | 'Duster' |
    'Combine Harvester' | 'Reaper' | 'Thresher' | 'Grain Dryer' |
    'Rice Mill' | 'Winnower' | 'Trailer' | 'Farm Truck' | 'Power Tiller' |
    'Weeder' | 'Mulcher';

export interface Equipment {
    id: string;
    name: string;
    type: EquipmentType;
    status: EquipmentStatus;
    assignedFieldCode?: string;
    assignedStaffId?: string;
}

export interface EquipmentDTO {
    name: string;
    type: EquipmentType;
    status?: EquipmentStatus;
    assignedStaffId?: string;
}

export interface EquipmentFilters {
    name?: string;
    status?: EquipmentStatus;
}

export interface UpdateEquipmentStaffDTO {
    equipmentId: string;
    staffId?: string;
}