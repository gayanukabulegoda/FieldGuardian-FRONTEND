import React from 'react';
import Select, {StylesConfig} from 'react-select';
import {EquipmentType} from '../../types/equipment';
import styles from '../../styles/popupStyles/addEdit/addEditEquipmentPopup.module.css';

interface EquipmentSelectProps {
    value: EquipmentType;
    onChange: (value: EquipmentType) => void;
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

const customStyles: StylesConfig<{ value: EquipmentType; label: string }, false> = {
    control: (provided, state) => ({
        ...provided,
        width: '100%',
        padding: '0 16px',
        border: state.isFocused ? 'none' : '1px solid var(--primary-green)',
        borderRadius: '32px',
        color: 'var(--text-gray)',
        fontSize: '13px',
        lineHeight: '18.2px',
        background: 'var(--white)',
        height: '48px',
        boxShadow: state.isFocused ? '0 0 0 1.5px var(--text-field-focus)' : 'none',
        outline: 'none',
        '&:hover': {
            borderColor: 'var(--primary-green)'
        }
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--text-gray)'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--text-gray)'
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '8px',
        overflow: 'hidden'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'var(--light-green)' : 'var(--white)',
        color: state.isSelected ? 'var(--primary-green)' : 'var(--text-gray)',
        fontSize: '13px',
        '&:hover': {
            backgroundColor: 'var(--light-green)'
        }
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none'
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: 0,
        height: '48px'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: 0,
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '48px',
    }),
    container: (provided) => ({
        ...provided,
        width: '100%',
        margin: 0,
        padding: 0
    }),
};

export const EquipmentSelect: React.FC<EquipmentSelectProps> = ({
                                                                    onChange,
                                                                    error,
                                                                    isDisabled = false
                                                                }) => {
    return (
        <div className={styles.formGroup}>
            <Select
                onChange={(option) => option && onChange(option.value)}
                options={EQUIPMENT_TYPES}
                isDisabled={isDisabled}
                placeholder="Select Type"
                className={`${styles.select} ${error ? styles.error : ''}`}
                classNamePrefix="select"
                styles={customStyles}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};