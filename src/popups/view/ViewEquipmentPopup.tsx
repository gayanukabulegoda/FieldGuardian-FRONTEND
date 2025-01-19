import {Equipment} from '../../types/equipment.ts';
import {Staff} from '../../types/staff.ts';
import {Field} from '../../types/field.ts';
import {truncateText, formatText} from '../../utils/textUtils.ts';
import styles from '../../styles/sectionStyles/equipmentSection.module.css';

interface ViewEquipmentPopupProps {
    isOpen: boolean;
    onClose: () => void;
    equipment: Equipment;
    staffMembers: Staff[];
    fields: Field[];
}

export const ViewEquipmentPopup = ({
                                       isOpen,
                                       onClose,
                                       equipment,
                                       staffMembers,
                                       fields
                                   }: ViewEquipmentPopupProps) => {
    if (!isOpen) return null;

    const getStaffInfo = (staffId?: string) => {
        if (!staffId) return 'N/A';
        const staff = staffMembers.find(s => s.id === staffId);
        return staff ? `${staff.firstName} ${staff.lastName} - ${staff.contactNo}` : 'N/A';
    };

    const getFieldName = (fieldCode?: string) => {
        if (!fieldCode) return 'N/A';
        const field = fields.find(f => f.code === fieldCode);
        return field ? field.name : 'N/A';
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.popup} onClick={onClose}>
            <div className={styles.popupContent} onClick={handleContentClick}>
                <div className={styles.popupHeader}>
                    <h2>View Equipment</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <div className={styles.equipmentDetails}>
                    <div className={styles.detailRow}>
                        <label>Name:</label>
                        <span>{truncateText(equipment.name, 30)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Type:</label>
                        <span>{equipment.type}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Status:</label>
                        <span>{formatText(equipment.status)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Staff:</label>
                        <span>{truncateText(getStaffInfo(equipment.assignedStaffId), 30)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Field:</label>
                        <span>{truncateText(getFieldName(equipment.assignedFieldCode), 30)}</span>
                    </div>
                </div>
                <div className={styles.popupActions}>
                    <button onClick={onClose} className={styles.closeButton}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};