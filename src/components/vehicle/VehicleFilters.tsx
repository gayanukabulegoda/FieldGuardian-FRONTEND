import {useState} from 'react';
import {VehicleFilters as FilterType, VehicleCategory, VehicleStatus} from '../../types/vehicle';
import styles from '../../styles/sectionStyles/vehicleSection.module.css';

interface VehicleFiltersProps {
    onSearch: (filters: FilterType) => void;
}

const VEHICLE_CATEGORIES: { value: VehicleCategory; text: string }[] = [
    {value: 'TRACTOR', text: 'Tractor'},
    {value: 'COMBINE_HARVESTER', text: 'Combine Harvester'},
    {value: 'FORAGE_HARVESTER', text: 'Forage Harvester'},
    {value: 'SUGARCANE_HARVESTER', text: 'Sugarcane Harvester'},
    {value: 'TRUCK', text: 'Truck'},
    {value: 'VAN', text: 'Van'},
    {value: 'LORRY', text: 'Lorry'},
    {value: 'TRAILER', text: 'Trailer'},
    {value: 'SEED_DRILL', text: 'Seed Drill'},
    {value: 'PLANTER', text: 'Planter'},
    {value: 'TRANSPLANTER', text: 'Transplanter'},
    {value: 'WATER_TANKER', text: 'Water Tanker'},
    {value: 'IRRIGATION_TRUCK', text: 'Irrigation Truck'},
    {value: 'SPRAYER', text: 'Sprayer'},
    {value: 'DUSTER', text: 'Duster'}
];

export const VehicleFilters = ({onSearch}: VehicleFiltersProps) => {
    const [filters, setFilters] = useState<FilterType>({
        licensePlateNumber: '',
        category: undefined,
        status: undefined
    });

    const handleSearch = () => {
        if (!filters.licensePlateNumber && !filters.category && !filters.status) {
            alert('Please enter at least one search criteria');
            return;
        }
        onSearch(filters);
    };

    return (
        <div className={styles.searchSection}>
            <div className={styles.searchInput}>
                <input
                    type="text"
                    placeholder="Search by license plate no"
                    value={filters.licensePlateNumber || ''}
                    onChange={(e) => setFilters(prev => ({
                        ...prev,
                        licensePlateNumber: e.target.value
                    }))}
                />
                <img src="/public/icons/search-icon.svg" alt="search" className={styles.searchIcon}/>
            </div>

            <select
                className={styles.filterSelect}
                value={filters.category || ''}
                onChange={(e) => setFilters(prev => ({
                    ...prev,
                    category: e.target.value as VehicleCategory
                }))}
            >
                <option value="" disabled hidden>Category</option>
                {VEHICLE_CATEGORIES.map(category => (
                    <option key={category.value} value={category.value}>
                        {category.text}
                    </option>
                ))}
            </select>

            <select
                className={styles.filterSelect}
                value={filters.status || ''}
                onChange={(e) => setFilters(prev => ({
                    ...prev,
                    status: e.target.value as VehicleStatus
                }))}
            >
                <option value="" disabled hidden>Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="IN_USE">In Use</option>
                <option value="OUT_OF_SERVICE">Out of Service</option>
            </select>

            <button className={styles.searchBtn} onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};