import {Staff} from '../../types/staff';
import {truncateText} from '../../utils/textUtils';
import {formatText} from '../../utils/textUtils';
import styles from '../../styles/sectionStyles/staffSection.module.css';

interface StaffTableProps {
    staff: Staff[];
    onDelete: (id: string) => void;
    onEdit: (staff: Staff) => void;
    onView: (staff: Staff) => void;
    isScientist?: boolean;
}

export const StaffTable = ({staff, onDelete, onEdit, onView, isScientist}: StaffTableProps) => {
    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <div>Name</div>
                <div>Designation</div>
                <div>Contact No</div>
                <div>Email</div>
                <div>Action</div>
            </div>
            <div className={styles.tableBody}>
                {staff.map((member) => (
                    <div key={member.id} className={styles.tableRow}>
                        <div>{truncateText(`${member.firstName} ${member.lastName}`, 28)}</div>
                        <div>{formatText(truncateText(member.designation, 24))}</div>
                        <div>{truncateText(member.contactNo, 12)}</div>
                        <div>{truncateText(member.email, 28)}</div>
                        <div className={styles.actionButtons}>
                            {!isScientist && (
                                <>
                                    <button
                                        className={`${styles.actionBtn} ${styles.delete}`}
                                        onClick={() => onDelete(member.id)}
                                        title="Delete"
                                    >
                                        <img src="/public/icons/delete-icon-silver.svg"
                                             alt="delete-icon"
                                             className={styles.deleteIcon}
                                        />
                                    </button>
                                    <button
                                        className={`${styles.actionBtn} ${styles.edit}`}
                                        onClick={() => onEdit(member)}
                                        title="Edit"
                                    >
                                        <img src="/public/icons/edit-icon-silver.svg"
                                             alt="edit-icon"
                                             className={styles.editIcon}
                                        />
                                    </button>
                                </>
                            )}
                            <button
                                className={`${styles.actionBtn} ${styles.view}`}
                                onClick={() => onView(member)}
                                title="View"
                            >
                                <img
                                    src="/public/icons/view-icon-silver.svg"
                                    alt="view-icon"
                                    className={styles.viewIcon}
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};