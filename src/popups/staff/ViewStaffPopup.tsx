import React from 'react';
import {Staff} from '../../types/staff';
import {formatDate, formatText} from '../../utils/textUtils';
import {ActionButton} from '../../components/common/ActionButton.tsx';
import {PopupHeader} from '../../components/common/PopupHeader';
import styles from '../../styles/popupStyles/view/viewStaffPopup.module.css';

interface ViewStaffPopupProps {
    isOpen: boolean;
    onClose: () => void;
    staff: Staff;
}

export const ViewStaffPopup: React.FC<ViewStaffPopupProps> = ({isOpen, onClose, staff}) => {
    if (!isOpen) return null;

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const DetailRow = ({label, value}: { label: string; value: string }) => (
        <div className={styles.detailGroup}>
            <label>{label}:</label>
            <span data-full-text={value}>{value}</span>
        </div>
    );

    return (
        <div className={styles.viewStaffPopup} onClick={onClose}>
            <div onClick={handleContentClick}>
                <PopupHeader
                    title="View Staff"
                    variant="primary"
                    icon="/public/icons/staff-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <div className={styles.staffDetails}>
                        <div className={styles.detailsRow}>
                            <DetailRow label="First Name" value={staff.firstName}/>
                            <DetailRow label="Last Name" value={staff.lastName}/>
                        </div>
                        <div className={styles.detailsRow}>
                            <DetailRow label="Date of Birth" value={formatDate(staff.dateOfBirth)}/>
                            <DetailRow label="Joined Date" value={formatDate(staff.joinedDate)}/>
                        </div>
                        <div className={styles.detailsRow}>
                            <DetailRow label="Address" value={staff.address}/>
                            <DetailRow label="Postal Code" value={staff.postalCode}/>
                        </div>
                        <div className={styles.detailsRow}>
                            <DetailRow label="Contact No" value={staff.contactNo}/>
                            <DetailRow label="Email" value={staff.email}/>
                        </div>
                        <div className={styles.detailsRow}>
                            <DetailRow label="Gender" value={formatText(staff.gender)}/>
                            <DetailRow label="Designation" value={formatText(staff.designation)}/>
                        </div>
                        <div className={styles.buttonContainer}>
                            <ActionButton onClick={onClose}>Close</ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};