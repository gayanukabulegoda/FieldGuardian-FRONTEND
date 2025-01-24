import React, {useState} from 'react';
import styles from '../../styles/common/dataFilter.module.css';

interface FilterOption {
    value: string;
    label: string;
}

export interface FilterField {
    type: 'text' | 'select' | 'date';
    key: string;
    placeholder?: string;
    options?: FilterOption[];
    width?: number;
}

interface DataFilterProps {
    fields: FilterField[];
    onSearch: (filters: any) => void;
    variant?: 'default' | 'field' | 'staff' | 'monitoring' | 'vehicle';
}

export const DataFilter: React.FC<DataFilterProps> = ({
                                                          fields,
                                                          onSearch,
                                                          variant = 'default'
                                                      }) => {
    const [filters, setFilters] = useState<Record<string, any>>({});

    const handleInputChange = (key: string, value: any) => {
        setFilters(prev => ({...prev, [key]: value}));
    };

    const handleSearch = () => {
        const hasValues = Object.values(filters).some(value => value);
        if (!hasValues) {
            alert('Select a value to search!');
            return;
        }
        onSearch(filters);
    };

    const handleClear = () => {
        setFilters({});
        onSearch({});
    };

    const getFilterClass = () => {
        switch (variant) {
            case 'field':
                return styles.fieldFilter;
            case 'staff':
                return styles.staffFilter;
            case 'monitoring':
                return styles.monitoringFilter;
            default:
                return '';
        }
    };

    const getSearchInputClass = () => {
        switch (variant) {
            case 'staff':
                return styles.searchInputStaffVehicle;
            case 'vehicle':
                return styles.searchInputStaffVehicle;
            default:
                return styles.searchInput;
        }
    }

    return (
        <div className={`${styles.searchSection} ${getFilterClass()}`}>
            {fields.map((field, index) => (
                <div
                    key={index}
                    className={field.type === 'text' ? getSearchInputClass() : styles.filterSelect}
                    style={field.width ? {flex: field.width} : undefined}
                >
                    {field.type === 'text' && (
                        <>
                            <input
                                type="text"
                                placeholder={field.placeholder}
                                value={filters[field.key] || ''}
                                onChange={e => handleInputChange(field.key, e.target.value)}
                            />
                            <img src="/icons/search-icon.svg" alt="search" className={styles.searchIcon}/>
                        </>
                    )}
                    {field.type === 'select' && field.options && (
                        <select
                            value={filters[field.key] || ''}
                            onChange={e => handleInputChange(field.key, e.target.value)}
                        >
                            <option value="" disabled hidden>{field.placeholder}</option>
                            {field.options.map((option, optIndex) => (
                                <option key={optIndex} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                    {field.type === 'date' && (
                        <div className={styles.dateInput}>
                            <input
                                type="date"
                                value={filters[field.key] || ''}
                                onChange={e => handleInputChange(field.key, e.target.value)}
                            />
                            <img src="/icons/calendar-icon.svg" alt="calendar" className={styles.calendarIcon}/>
                        </div>
                    )}
                </div>
            ))}

            <button className={styles.searchBtn} onClick={handleSearch}>
                Search
            </button>

            {variant === 'staff' && (
                <button className={styles.clearBtn} onClick={handleClear}>
                    Clear
                </button>
            )}
        </div>
    );
};