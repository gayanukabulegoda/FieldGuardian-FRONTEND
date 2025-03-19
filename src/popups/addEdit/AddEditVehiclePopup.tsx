import React, {useState, useEffect} from 'react';
import {Vehicle, VehicleDTO, VehicleCategory, VehicleStatus, FuelType} from '../../types/vehicle';
import {Staff} from '../../types/staff';
import {Input} from '../../components/common/Input.tsx';
import {ActionButton} from '../../components/common/ActionButton.tsx';
import {PopupHeader} from '../../components/common/PopupHeader.tsx';
import {VehicleSelect} from '../../components/custom/select/VehicleSelect.tsx';
import {StaffSelect} from '../../components/custom/select/StaffSelect.tsx';
import styles from '../../styles/popupStyles/addEdit/addEditVehiclePopup.module.css';

interface AddEditVehiclePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (vehicleData: VehicleDTO) => void;
    vehicle?: Vehicle;
    staffMembers: Staff[];
}

const VEHICLE_CATEGORIES: { value: VehicleCategory; label: string }[] = [
    {value: 'TRACTOR', label: 'Tractor'},
    {value: 'COMBINE_HARVESTER', label: 'Combine Harvester'},
    {value: 'FORAGE_HARVESTER', label: 'Forage Harvester'},
    {value: 'SUGARCANE_HARVESTER', label: 'Sugarcane Harvester'},
    {value: 'TRUCK', label: 'Truck'},
    {value: 'VAN', label: 'Van'},
    {value: 'LORRY', label: 'Lorry'},
    {value: 'TRAILER', label: 'Trailer'},
    {value: 'SEED_DRILL', label: 'Seed Drill'},
    {value: 'PLANTER', label: 'Planter'},
    {value: 'TRANSPLANTER', label: 'Transplanter'},
    {value: 'WATER_TANKER', label: 'Water Tanker'},
    {value: 'IRRIGATION_TRUCK', label: 'Irrigation Truck'},
    {value: 'SPRAYER', label: 'Sprayer'},
    {value: 'DUSTER', label: 'Duster'}
];

const FUEL_TYPES: { value: FuelType; label: string }[] = [
    {value: 'DIESEL', label: 'Diesel'},
    {value: 'PETROL', label: 'Petrol'},
    {value: 'BIODIESEL', label: 'Biodiesel'},
    {value: 'ETHANOL', label: 'Ethanol'},
    {value: 'LPG', label: 'Liquefied Petroleum Gas (LPG)'},
    {value: 'ELECTRICITY', label: 'Electricity'}
];

const STATUS_OPTIONS = [
    {value: 'AVAILABLE', label: 'Available'},
    {value: 'IN_USE', label: 'In Use'},
    {value: 'OUT_OF_SERVICE', label: 'Out of Service'}
];

export const AddEditVehiclePopup: React.FC<AddEditVehiclePopupProps> = ({
                                                                            isOpen,
                                                                            onClose,
                                                                            onSave,
                                                                            vehicle,
                                                                            staffMembers
                                                                        }) => {
    const [formData, setFormData] = useState<VehicleDTO>({
        licensePlateNumber: '',
        category: 'TRACTOR',
        fuelType: 'DIESEL',
        status: undefined,
        driverId: undefined,
        remark: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof VehicleDTO, string>>>({});
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        if (vehicle) {
            setFormData({
                licensePlateNumber: vehicle.licensePlateNumber,
                category: vehicle.category,
                fuelType: vehicle.fuelType,
                status: vehicle.status,
                driverId: vehicle.driverId,
                remark: vehicle.remark || ''
            });
            setCharCount(vehicle.remark?.length || 0);
        }
    }, [vehicle]);

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof VehicleDTO, string>> = {};

        if (!formData.licensePlateNumber) {
            newErrors.licensePlateNumber = 'License plate number is required';
        }
        if (!formData.category) {
            newErrors.category = 'Category is required';
        }
        if (!formData.fuelType) {
            newErrors.fuelType = 'Fuel type is required';
        }
        if (!formData.remark) {
            newErrors.remark = 'Remark is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        onSave(formData);
    };

    const handleRemarkChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text.length <= 400) {
            setFormData(prev => ({...prev, remark: text}));
            setCharCount(text.length);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.addVehiclePopup} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                <PopupHeader
                    title={vehicle ? 'Update Vehicle' : 'Add Vehicle'}
                    variant="primary"
                    icon="/public/icons/vehicle-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <form onSubmit={handleSubmit} className={styles.vehicleForm}>
                        <div className={styles.formContainer}>
                            <div className={styles.formFields}>
                                <div className={styles.formGroup}>
                                    <Input
                                        type="text"
                                        placeholder="License plate number"
                                        value={formData.licensePlateNumber}
                                        onChange={e => setFormData(prev => ({
                                            ...prev,
                                            licensePlateNumber: e.target.value
                                        }))}
                                        error={errors.licensePlateNumber}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <VehicleSelect
                                        value={formData.category}
                                        onChange={(value) => setFormData(prev => ({
                                            ...prev,
                                            category: value as VehicleCategory
                                        }))}
                                        options={VEHICLE_CATEGORIES}
                                        placeholder="Select Category"
                                        error={errors.category}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <VehicleSelect
                                        value={formData.fuelType}
                                        onChange={(value) => setFormData(prev => ({
                                            ...prev,
                                            fuelType: value as FuelType
                                        }))}
                                        options={FUEL_TYPES}
                                        placeholder="Select Fuel Type"
                                        error={errors.fuelType}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    {vehicle && (
                                        <VehicleSelect
                                            value={formData.status || ''}
                                            onChange={(value) => setFormData(prev => ({
                                                ...prev,
                                                status: value as VehicleStatus
                                            }))}
                                            options={STATUS_OPTIONS}
                                            placeholder="Select Status"
                                            error={errors.status}
                                        />
                                    )}
                                </div>
                                <div className={styles.formGroup}>
                                    <StaffSelect
                                        value={formData.driverId}
                                        onChange={(value) => setFormData(prev => ({
                                            ...prev,
                                            driverId: value
                                        }))}
                                        staff={staffMembers}
                                        error={errors.driverId}
                                    />
                                </div>
                            </div>
                            <div className={styles.remarkField}>
                                <div className={styles.formGroup}>
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
                        </div>
                        <div className={styles.saveBtnContainer}>
                            <ActionButton type="submit">
                                {vehicle ? 'UPDATE' : 'SAVE'}
                            </ActionButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};