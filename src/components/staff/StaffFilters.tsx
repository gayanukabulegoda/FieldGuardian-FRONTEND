import {useState} from 'react';
import {StaffFilters as FilterType} from '../../types/staff';
import styles from '../../styles/sectionStyles/staffSection.module.css';

interface StaffFiltersProps {
    designations: string[];
    onSearch: (filters: FilterType) => void;
}

export const StaffFilters = ({designations, onSearch}: StaffFiltersProps) => {
    const [filters, setFilters] = useState<FilterType>({
        name: '',
        designation: '',
        gender: undefined
    });

    const handleSearch = () => {
        onSearch(filters);
    };

    const handleClear = () => {
        setFilters({
            name: '',
            designation: '',
            gender: undefined
        });
        onSearch({});
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
                value={filters.designation || ''}
                onChange={(e) => setFilters(prev => ({...prev, designation: e.target.value}))}
            >
                <option value="" disabled hidden>Filter by Designation</option>
                {designations.map(designation => (
                    <option key={designation} value={designation}>
                        {designation}
                    </option>
                ))}
            </select>

            <select
                className={styles.filterSelect}
                value={filters.gender || ''}
                onChange={(e) => setFilters(prev => ({...prev, gender: e.target.value as any}))}
            >
                <option value="" disabled hidden>Filter by Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
            </select>

            <button className={styles.searchBtn} onClick={handleSearch}>
                Search
            </button>

            <button className={styles.clearBtn} onClick={handleClear}>
                Clear
            </button>
        </div>
    );
};