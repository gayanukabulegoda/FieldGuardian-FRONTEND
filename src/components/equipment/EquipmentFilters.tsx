import {useState} from 'react';
import {EquipmentFilters as FilterType, EquipmentStatus} from '../../types/equipment';
import styles from '../../styles/sectionStyles/equipmentSection.module.css';

interface EquipmentFiltersProps {
    onSearch: (filters: FilterType) => void;
}

export const EquipmentFilters = ({onSearch}: EquipmentFiltersProps) => {
    const [filters, setFilters] = useState<FilterType>({
        name: '',
        status: undefined
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
                value={filters.status || ''}
                onChange={(e) => setFilters(prev => ({...prev, status: e.target.value as EquipmentStatus}))}
            >
                <option value="" disabled hidden>Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="IN_USE">In Use</option>
                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
            </select>

            <button className={styles.searchBtn} onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};