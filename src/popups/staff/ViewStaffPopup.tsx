import {Staff} from '../../types/staff';
import {formatDate, formatDesignationText} from '../../utils/textUtils';
import styles from '../../styles/sectionStyles/staffSection.module.css';

interface ViewStaffPopupProps {
    isOpen: boolean;
    onClose: () => void;
    staff: Staff;
}

export const ViewStaffPopup = ({isOpen, onClose, staff}: ViewStaffPopupProps) => {
    if (!isOpen) return null;

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.popup} onClick={onClose}>
            <div className={styles.popupContent} onClick={handleContentClick}>
                <div className={styles.popupHeader}>
                    <h2>View Staff</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <div className={styles.staffDetails}>
                    <div className={styles.detailRow}>
                        <div className={styles.detailGroup}>
                            <label>First Name:</label>
                            <span>{staff.firstName}</span>
                        </div>
                        <div className={styles.detailGroup}>
                            <label>Last Name:</label>
                            <span>{staff.lastName}</span>
                        </div>
                    </div>
                    <div className={styles.detailRow}>
                        <div className={styles.detailGroup}>
                            <label>Date of Birth:</label>
                            <span>{formatDate(staff.dateOfBirth)}</span>
                        </div>
                        <div className={styles.detailGroup}>
                            <label>Joined Date:</label>
                            <span>{formatDate(staff.joinedDate)}</span>
                        </div>
                    </div>
                    <div className={styles.detailRow}>
                        <div className={styles.detailGroup}>
                            <label>Address:</label>
                            <span>{staff.address}</span>
                        </div>
                        <div className={styles.detailGroup}>
                            <label>Postal Code:</label>
                            <span>{staff.postalCode}</span>
                        </div>
                    </div>
                    <div className={styles.detailRow}>
                        <div className={styles.detailGroup}>
                            <label>Contact Number:</label>
                            <span>{staff.contactNo}</span>
                        </div>
                        <div className={styles.detailGroup}>
                            <label>Email:</label>
                            <span>{staff.email}</span>
                        </div>
                    </div>
                    <div className={styles.detailRow}>
                        <div className={styles.detailGroup}>
                            <label>Gender:</label>
                            <span>{formatDesignationText(staff.gender)}</span>
                        </div>
                        <div className={styles.detailGroup}>
                            <label>Designation:</label>
                            <span>{formatDesignationText(staff.designation)}</span>
                        </div>
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