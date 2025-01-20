import React from 'react';
import Select, {SingleValue, StylesConfig} from 'react-select';
import {Staff} from '../../types/staff';
import styles from '../../styles/popupStyles/addEdit/addEditEquipmentPopup.module.css';

interface StaffSelectProps {
    value?: string;
    onChange: (value: string) => void;
    staff: Staff[];
    error?: string;
    isDisabled?: boolean;
}

interface OptionType {
    value: string;
    label: string;
}

const customStyles: StylesConfig = {
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

export const StaffSelect: React.FC<StaffSelectProps> = ({
                                                            value,
                                                            onChange,
                                                            staff,
                                                            error,
                                                            isDisabled = false
                                                        }) => {
    const options = staff.map(member => ({
        value: member.id,
        label: `${member.firstName} ${member.lastName} - ${member.contactNo}`
    }));

    return (
        <div className={styles.formGroup}>
            <Select
                value={options.find(option => option.value === value)}
                onChange={(option: SingleValue<OptionType>) => onChange(option?.value || '')}
                options={options}
                isDisabled={isDisabled}
                placeholder="Select Staff Member"
                className={`${styles.select} ${error ? styles.error : ''}`}
                classNamePrefix="select"
                styles={customStyles}
                isClearable
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};