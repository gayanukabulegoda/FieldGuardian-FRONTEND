import {useState} from 'react';
import {FieldFilters as FilterType} from '../../types/field';
import styles from '../../styles/sectionStyles/fieldSection.module.css';

interface FieldFiltersProps {
    onSearch: (filters: FilterType) => void;
}

export const FieldFilters = ({onSearch}: FieldFiltersProps) => {
    const [filters, setFilters] = useState<FilterType>({
        name: '',
        landSize: undefined
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
                value={filters.landSize || ''}
                onChange={(e) => setFilters(prev => ({...prev, landSize: e.target.value as any}))}
            >
                <option value="" disabled hidden>Land Size</option>
                <option value="SMALL">Small (&lt; 50 sq. m)</option>
                <option value="MEDIUM">Medium (50-150 sq. m)</option>
                <option value="LARGE">Large (&gt; 150 sq. m)</option>
            </select>

            <button className={styles.searchBtn} onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};