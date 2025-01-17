import {useState} from 'react';
import {CropFilters as FilterType} from '../../types/crop';
import {Field} from '../../types/field';
import styles from '../../styles/sectionStyles/cropSection.module.css';

interface CropFiltersProps {
    fields: Field[];
    onSearch: (filters: FilterType) => void;
}

export const CropFilters = ({fields, onSearch}: CropFiltersProps) => {
    const [filters, setFilters] = useState<FilterType>({
        name: '',
        field: ''
    });

    const handleSearch = () => {
        onSearch(filters);
    };

    return (
        <div className={styles.searchSection}>
            <div className={styles.searchInput}>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={filters.name || ''}
                    onChange={(e) => setFilters(prev => ({...prev, name: e.target.value}))}
                />
                <img src="/public/icons/search-icon.svg" alt="search" className={styles.searchIcon}/>
            </div>

            <select
                className={styles.filterSelect}
                value={filters.field || ''}
                onChange={(e) => setFilters(prev => ({...prev, field: e.target.value}))}
            >
                <option value="" disabled hidden>Field</option>
                {fields.map((field) => (
                    <option key={field.code} value={field.code}>
                        {field.name}
                    </option>
                ))}
            </select>

            <button className={styles.searchBtn} onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};