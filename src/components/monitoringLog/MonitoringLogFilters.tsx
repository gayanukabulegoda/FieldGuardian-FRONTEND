import {useState} from 'react';
import {MonitoringLogFilters as FilterType} from '../../types/monitoringLog';
import styles from '../../styles/sectionStyles/monitoringLogSection.module.css';

interface MonitoringLogFiltersProps {
    onSearch: (filters: FilterType) => void;
}

export const MonitoringLogFilters = ({onSearch}: MonitoringLogFiltersProps) => {
    const [filters, setFilters] = useState<FilterType>({
        field: '',
        date: ''
    });

    const handleSearch = () => {
        if (!filters.field && !filters.date) {
            alert('Select a value to search!');
            return;
        }
        onSearch(filters);
    };

    return (
        <div className={styles.searchSection}>
            <div className={styles.searchInput}>
                <input
                    type="text"
                    placeholder="Search by field"
                    value={filters.field || ''}
                    onChange={(e) => setFilters(prev => ({
                        ...prev,
                        field: e.target.value
                    }))}
                />
                <img src="/public/icons/search-icon.svg" alt="search" className={styles.searchIcon}/>
            </div>

            <div className={styles.dateInput}>
                <input
                    type="date"
                    value={filters.date || ''}
                    onChange={(e) => setFilters(prev => ({
                        ...prev,
                        date: e.target.value
                    }))}
                />
                <img src="/public/icons/calendar-icon.svg" alt="calendar" className={styles.calendarIcon}/>
            </div>

            <button className={styles.searchBtn} onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};