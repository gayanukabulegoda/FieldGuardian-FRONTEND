export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type Designation = string;

export interface Staff {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
    postalCode: string;
    contactNo: string;
    email: string;
    joinedDate: string;
    gender: Gender;
    designation: Designation;
}

export interface StaffDTO {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
    postalCode: string;
    contactNo: string;
    email: string;
    joinedDate: string;
    gender: Gender;
    designation: Designation;
}

export interface StaffFilters {
    name?: string;
    designation?: string;
    gender?: Gender;
}