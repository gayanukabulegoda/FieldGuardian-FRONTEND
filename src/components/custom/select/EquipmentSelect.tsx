import React from 'react';
import {EquipmentType} from '../../../types/equipment.ts';
import {CustomSelect} from "../../common/CustomSelect.tsx";

interface EquipmentSelectProps {
    value: EquipmentType;
    onChange: (value: string) => void;
    error?: string;
    isDisabled?: boolean;
}

const EQUIPMENT_TYPES: { value: EquipmentType; label: string }[] = [
    {value: 'Tractor', label: 'Tractor'},
    {value: 'Plow', label: 'Plow'},
    {value: 'Harrow', label: 'Harrow'},
    {value: 'Cultivator', label: 'Cultivator'},
    {value: 'Rotavator', label: 'Rotavator'},
    {value: 'Seed Drill', label: 'Seed Drill'},
    {value: 'Planter', label: 'Planter'},
    {value: 'Transplanter', label: 'Transplanter'},
    {value: 'Sprinkler System', label: 'Sprinkler System'},
    {value: 'Drip Irrigation System', label: 'Drip Irrigation System'},
    {value: 'Water Pump', label: 'Water Pump'},
    {value: 'Sprayer', label: 'Sprayer'},
    {value: 'Duster', label: 'Duster'},
    {value: 'Combine Harvester', label: 'Combine Harvester'},
    {value: 'Reaper', label: 'Reaper'},
    {value: 'Thresher', label: 'Thresher'},
    {value: 'Grain Dryer', label: 'Grain Dryer'},
    {value: 'Rice Mill', label: 'Rice Mill'},
    {value: 'Winnower', label: 'Winnower'},
    {value: 'Trailer', label: 'Trailer'},
    {value: 'Farm Truck', label: 'Farm Truck'},
    {value: 'Power Tiller', label: 'Power Tiller'},
    {value: 'Weeder', label: 'Weeder'},
    {value: 'Mulcher', label: 'Mulcher'}
];

export const EquipmentSelect: React.FC<EquipmentSelectProps> = ({
                                                                    value,
                                                                    onChange,
                                                                    error,
                                                                    isDisabled
                                                                }) => {
    return (
        <CustomSelect
            value={value}
            onChange={onChange}
            options={EQUIPMENT_TYPES}
            placeholder="Select Type"
            error={error}
            isDisabled={isDisabled}
        />
    );
};