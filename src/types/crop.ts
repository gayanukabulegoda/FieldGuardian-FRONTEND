export type CropCategory = 'VEGETABLE' | 'FRUIT' | 'GRAIN' | 'HERB' | 'OTHER';
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'ALL';

export interface Crop {
    code: string;
    commonName: string;
    scientificName: string;
    category: CropCategory;
    season: Season;
    fieldCode: string;
    cropImage?: string;
}

export interface CropDTO {
    commonName: string;
    scientificName: string;
    category: CropCategory;
    season: Season;
    fieldCode: string;
    cropImage?: File;
}

export interface CropFilters {
    name?: string;
    field?: string;
}