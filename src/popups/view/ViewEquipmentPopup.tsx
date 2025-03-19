import React from 'react';
import {Equipment} from '../../types/equipment';
import {Staff} from '../../types/staff';
import {Field} from '../../types/field';
import {ActionButton} from '../../components/common/ActionButton';
import {PopupHeader} from '../../components/common/PopupHeader';
import {truncateText, formatText} from '../../utils/textUtils';
import styles from '../../styles/popupStyles/view/viewEquipmentPopup.module.css';

interface ViewEquipmentPopupProps {
    isOpen: boolean;
    onClose: () => void;
    equipment: Equipment;
    staffMembers: Staff[];
    fields: Field[];
}

export const ViewEquipmentPopup: React.FC<ViewEquipmentPopupProps> = ({
                                                                          isOpen,
                                                                          onClose,
                                                                          equipment,
                                                                          staffMembers,
                                                                          fields
                                                                      }) => {
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

    return (
        <div className={styles.viewEquipmentPopup} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                <PopupHeader
                    title="View Equipment"
                    variant="primary"
                    icon="/public/icons/equipment-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <div className={styles.equipmentDetails}>
                        <div className={styles.detailsRow}>
                            <label>Name:</label>
                            <span title={equipment.name}>
                                {truncateText(equipment.name, 30)}
                            </span>
                        </div>
                        <div className={styles.detailsRow}>
                            <label>Type:</label>
                            <span title={equipment.type}>
                                {truncateText(equipment.type, 30)}
                            </span>
                        </div>
                        <div className={styles.detailsRow}>
                            <label>Status:</label>
                            <span title={formatText(equipment.status)}>
                                {formatText(equipment.status)}
                            </span>
                        </div>
                        <div className={styles.detailsRow}>
                            <label>Staff:</label>
                            <span title={getStaffInfo(equipment.assignedStaffId)}>
                                {truncateText(getStaffInfo(equipment.assignedStaffId), 30)}
                            </span>
                        </div>
                        <div className={styles.detailsRow}>
                            <label>Field:</label>
                            <span title={getFieldName(equipment.assignedFieldCode)}>
                                {truncateText(getFieldName(equipment.assignedFieldCode), 30)}
                            </span>
                        </div>
                        <div className={styles.buttonContainer}>
                            <ActionButton onClick={onClose} variant="success">CLOSE</ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};