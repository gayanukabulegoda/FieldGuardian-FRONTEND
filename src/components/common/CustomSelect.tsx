import React from 'react';
import Select, {SingleValue, StylesConfig} from 'react-select';
import styles from '../../styles/popupStyles/addEdit/addEditEquipmentPopup.module.css';

interface SelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    value?: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder: string;
    error?: string;
    isDisabled?: boolean;
    isClearable?: boolean;
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
    indicatorSeparator: () => ({
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

export const CustomSelect: React.FC<CustomSelectProps> = ({
                                                              value,
                                                              onChange,
                                                              options,
                                                              placeholder,
                                                              error,
                                                              isDisabled = false,
                                                              isClearable = false
                                                          }) => {
    return (
        <div className={styles.formGroup}>
            <Select
                value={options.find(option => option.value === value)}
                onChange={(newValue: unknown) => {
                    const option = newValue as SingleValue<SelectOption>;
                    onChange(option?.value || '');
                }}
                options={options}
                isDisabled={isDisabled}
                placeholder={placeholder}
                className={`${styles.select} ${error ? styles.error : ''}`}
                classNamePrefix="select"
                styles={customStyles}
                isClearable={isClearable}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};