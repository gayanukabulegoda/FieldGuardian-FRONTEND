export type VehicleStatus = 'AVAILABLE' | 'IN_USE' | 'OUT_OF_SERVICE';
export type VehicleCategory =
    'TRACTOR' | 'COMBINE_HARVESTER' | 'FORAGE_HARVESTER' | 'SUGARCANE_HARVESTER' |
    'TRUCK' | 'VAN' | 'LORRY' | 'TRAILER' | 'SEED_DRILL' | 'PLANTER' |
    'TRANSPLANTER' | 'WATER_TANKER' | 'IRRIGATION_TRUCK' | 'SPRAYER' | 'DUSTER';
export type FuelType =
    'DIESEL' | 'PETROL' | 'BIODIESEL' | 'ETHANOL' | 'LPG' | 'ELECTRICITY';

export interface Vehicle {
    code: string;
    licensePlateNumber: string;
    category: VehicleCategory;
    status: VehicleStatus;
    fuelType: FuelType;
    driverId?: string;
    remark?: string;
}

export interface VehicleDTO {
    licensePlateNumber: string;
    category: VehicleCategory;
    status?: VehicleStatus;
    fuelType: FuelType;
    driverId?: string;
    remark?: string;
}

export interface VehicleFilters {
    licensePlateNumber?: string;
    category?: VehicleCategory;
    status?: VehicleStatus;
}