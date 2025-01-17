import {useState, useEffect} from 'react';
import {Vehicle, VehicleDTO, VehicleCategory, VehicleStatus, FuelType} from '../../types/vehicle';
import {Staff} from '../../types/staff';
import styles from '../../styles/sectionStyles/vehicleSection.module.css';

interface AddEditVehiclePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (vehicleData: VehicleDTO) => void;
    vehicle?: Vehicle;
    staffMembers: Staff[];
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

const FUEL_TYPES: { value: FuelType; text: string }[] = [
    {value: 'DIESEL', text: 'Diesel'},
    {value: 'PETROL', text: 'Petrol'},
    {value: 'BIODIESEL', text: 'Biodiesel'},
    {value: 'ETHANOL', text: 'Ethanol'},
    {value: 'LPG', text: 'Liquefied Petroleum Gas (LPG)'},
    {value: 'ELECTRICITY', text: 'Electricity'}
];

export const AddEditVehiclePopup = ({
                                        isOpen,
                                        onClose,
                                        onSave,
                                        vehicle,
                                        staffMembers
                                    }: AddEditVehiclePopupProps) => {
    const [formData, setFormData] = useState<VehicleDTO>({
        licensePlateNumber: '',
        category: 'TRACTOR',
        fuelType: 'DIESEL',
        status: undefined,
        driverId: undefined,
        remark: ''
    });

    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        if (vehicle) {
            setFormData({
                licensePlateNumber: vehicle.licensePlateNumber,
                category: vehicle.category,
                status: vehicle.status,
                fuelType: vehicle.fuelType,
                driverId: vehicle.driverId,
                remark: vehicle.remark || ''
            });
            setCharCount(vehicle.remark?.length || 0);
        }
    }, [vehicle]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleRemarkChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text.length <= 400) {
            setFormData(prev => ({...prev, remark: text}));
            setCharCount(text.length);
        }
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.popup} onClick={onClose}>
            <div className={styles.popupContent} onClick={handleContentClick}>
                <div className={styles.popupHeader}>
                    <h2>{vehicle ? 'Update Vehicle' : 'Add Vehicle'}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                placeholder="License plate number"
                                value={formData.licensePlateNumber}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    licensePlateNumber: e.target.value
                                }))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <select
                                value={formData.category}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    category: e.target.value as VehicleCategory
                                }))}
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                {VEHICLE_CATEGORIES.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <select
                                value={formData.fuelType}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    fuelType: e.target.value as FuelType
                                }))}
                                required
                            >
                                <option value="" disabled>Select Fuel Type</option>
                                {FUEL_TYPES.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {vehicle && (
                            <div className={styles.formGroup}>
                                <select
                                    value={formData.status}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        status: e.target.value as VehicleStatus
                                    }))}
                                    required
                                >
                                    <option value="" disabled>Select Status</option>
                                    <option value="AVAILABLE">Available</option>
                                    <option value="IN_USE">In Use</option>
                                    <option value="OUT_OF_SERVICE">Out of Service</option>
                                </select>
                            </div>
                        )}
                        <div className={styles.formGroup}>
                            <select
                                value={formData.driverId || ''}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    driverId: e.target.value || undefined
                                }))}
                            >
                                <option value="">Select Staff (Optional)</option>
                                {staffMembers.map(staff => (
                                    <option key={staff.id} value={staff.id}>
                                        {staff.firstName} {staff.lastName} - {staff.contactNo}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.remarkField}>
                            <textarea
                                placeholder="Add your remark..."
                                value={formData.remark}
                                onChange={handleRemarkChange}
                                maxLength={400}
                            />
                            <div className={styles.charCount}>
                                <span>{charCount}</span>/400
                            </div>
                        </div>
                    </div>
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.submitBtn}>
                            {vehicle ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};