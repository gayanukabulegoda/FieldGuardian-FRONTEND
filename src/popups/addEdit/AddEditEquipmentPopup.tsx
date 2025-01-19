import {useState, useEffect} from 'react';
import {Equipment, EquipmentDTO, EquipmentType, EquipmentStatus} from '../../types/equipment.ts';
import {Staff} from '../../types/staff.ts';
import styles from '../../styles/sectionStyles/equipmentSection.module.css';

interface AddEditEquipmentPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (equipmentData: EquipmentDTO) => void;
    equipment?: Equipment;
    staffMembers: Staff[];
}

const EQUIPMENT_TYPES: EquipmentType[] = [
    'Tractor', 'Plow', 'Harrow', 'Cultivator', 'Rotavator',
    'Seed Drill', 'Planter', 'Transplanter', 'Sprinkler System',
    'Drip Irrigation System', 'Water Pump', 'Sprayer', 'Duster',
    'Combine Harvester', 'Reaper', 'Thresher', 'Grain Dryer',
    'Rice Mill', 'Winnower', 'Trailer', 'Farm Truck', 'Power Tiller',
    'Weeder', 'Mulcher'
];

export const AddEditEquipmentPopup = ({
                                          isOpen,
                                          onClose,
                                          onSave,
                                          equipment,
                                          staffMembers
                                      }: AddEditEquipmentPopupProps) => {
    const [formData, setFormData] = useState<EquipmentDTO>({
        name: '',
        type: 'Tractor',
        status: undefined,
        assignedStaffId: undefined
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.popup} onClick={onClose}>
            <div className={styles.popupContent} onClick={handleContentClick}>
                <div className={styles.popupHeader}>
                    <h2>{equipment ? 'Update Equipment' : 'Add Equipment'}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <select
                                value={formData.type}
                                onChange={e => setFormData(prev => ({...prev, type: e.target.value as EquipmentType}))}
                                required
                            >
                                <option value="" disabled>Select Type</option>
                                {EQUIPMENT_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        {equipment && (
                            <div className={styles.formGroup}>
                                <select
                                    value={formData.status}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        status: e.target.value as EquipmentStatus
                                    }))}
                                    required
                                >
                                    <option value="" disabled>Select Status</option>
                                    <option value="AVAILABLE">Available</option>
                                    <option value="IN_USE">In Use</option>
                                    <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                                </select>
                            </div>
                        )}
                        <div className={styles.formGroup}>
                            <select
                                value={formData.assignedStaffId || ''}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    assignedStaffId: e.target.value || undefined
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
                    </div>
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.submitBtn}>
                            {equipment ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};