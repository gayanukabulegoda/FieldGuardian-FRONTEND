export interface Field {
    code: string;
    name: string;
    location: string;
    extentSize: number;
    fieldImage1?: string;
    fieldImage2?: string;
}

export interface FieldDTO {
    name: string;
    location: string;
    extentSize: number;
    fieldImage1?: File;
    fieldImage2?: File;
    staffIds?: string[];
    equipmentIds?: string[];
}

export interface FieldFilters {
    name?: string;
    landSize?: 'SMALL' | 'MEDIUM' | 'LARGE';
}

export interface FieldStaff {
    id: string;
    firstName: string;
    lastName: string;
    contactNo: string;
}

export interface FieldEquipment {
    id: string;
    name: string;
    type: string;
}

export interface Coordinates {
    lat: string;
    lng: string;
}