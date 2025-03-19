import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/store';
import {addEquipment, updateEquipment} from '../../store/slices/equipmentSlice';
import {Equipment, EquipmentDTO, EquipmentStatus, EquipmentType} from '../../types/equipment';
import {Staff} from '../../types/staff';
import {Input} from '../../components/common/Input';
import {Select} from '../../components/common/Select';
import {ActionButton} from '../../components/common/ActionButton';
import {PopupHeader} from '../../components/common/PopupHeader';
import {EquipmentSelect} from '../../components/custom/select/EquipmentSelect.tsx';
import styles from '../../styles/popupStyles/addEdit/addEditEquipmentPopup.module.css';
import {StaffSelect} from "../../components/custom/select/StaffSelect.tsx";

interface AddEditEquipmentPopupProps {
    isOpen: boolean;
    onClose: () => void;
    equipment?: Equipment;
    staffMembers: Staff[];
}

const STATUS_OPTIONS = [
    {value: 'AVAILABLE', label: 'Available'},
    {value: 'IN_USE', label: 'In Use'},
    {value: 'UNDER_MAINTENANCE', label: 'Under Maintenance'}
];

export const AddEditEquipmentPopup: React.FC<AddEditEquipmentPopupProps> = ({
                                                                                isOpen,
                                                                                onClose,
                                                                                equipment,
                                                                                staffMembers
                                                                            }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<EquipmentDTO>({
        name: '',
        type: 'Tractor',
        status: undefined,
        assignedStaffId: undefined
    });
    const [errors, setErrors] = useState<Partial<Record<keyof EquipmentDTO, string>>>({});

    useEffect(() => {
        if (equipment) {
            setFormData({
                name: equipment.name,
                type: equipment.type,
                status: equipment.status,
                assignedStaffId: equipment.assignedStaffId
            });
        }
    }, [equipment]);

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof EquipmentDTO, string>> = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.type) newErrors.type = 'Type is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTypeChange = (value: EquipmentType) => {
        setFormData(prev => ({...prev, type: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (equipment) {
                await dispatch(updateEquipment({id: equipment.id, equipmentDTO: formData})).unwrap();
            } else {
                await dispatch(addEquipment(formData)).unwrap();
            }
            onClose();
        } catch (error) {
            console.error('Error saving equipment:', error);
            alert('Failed to save equipment');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.addEquipmentPopup} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                <PopupHeader
                    title={equipment ? 'Update Equipment' : 'Add Equipment'}
                    variant="primary"
                    icon="/public/icons/equipment-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <form onSubmit={handleSubmit} className={styles.equipmentForm}>
                        <div className="form-group">
                            <Input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                                error={errors.name}
                            />
                        </div>
                        <div className="form-group">
                            <EquipmentSelect
                                value={formData.type}
                                onChange={handleTypeChange}
                                error={errors.type}
                            />
                        </div>
                        <div className="form-group">
                            {equipment && (
                                <Select
                                    value={formData.status}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        status: e.target.value as EquipmentStatus
                                    }))}
                                    options={STATUS_OPTIONS}
                                    error={errors.status}
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <StaffSelect
                                value={formData.assignedStaffId}
                                onChange={(value) => setFormData(prev => ({...prev, assignedStaffId: value}))}
                                staff={staffMembers}
                                error={errors.assignedStaffId}
                            />
                        </div>
                        <div className={styles.saveBtnContainer}>
                            <ActionButton type="submit" variant="success">
                                {equipment ? 'UPDATE' : 'SAVE'}
                            </ActionButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};