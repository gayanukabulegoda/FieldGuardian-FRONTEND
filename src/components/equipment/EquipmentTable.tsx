import {Equipment} from '../../types/equipment';
import {truncateText, formatText} from '../../utils/textUtils';
import styles from '../../styles/sectionStyles/equipmentSection.module.css';

interface EquipmentTableProps {
    equipment: Equipment[];
    onDelete: (id: string) => void;
    onEdit: (equipment: Equipment) => void;
    onView: (equipment: Equipment) => void;
    isScientist?: boolean;
}

export const EquipmentTable = ({
                                   equipment,
                                   onDelete,
                                   onEdit,
                                   onView,
                                   isScientist
                               }: EquipmentTableProps) => {
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'AVAILABLE':
                return styles.statusAvailable;
            case 'UNDER_MAINTENANCE':
                return styles.statusMaintenance;
            case 'IN_USE':
                return styles.statusInuse;
            default:
                return '';
        }
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <div>Name</div>
                <div>Type</div>
                <div>Status</div>
                <div>Field</div>
                <div>Action</div>
            </div>
            <div className={styles.tableBody}>
                {equipment.map((item) => (
                    <div key={item.id} className={styles.tableRow}>
                        <div>{truncateText(item.name, 30)}</div>
                        <div>{truncateText(item.type, 23)}</div>
                        <div>
                            <span className={`${styles.statusBadge} ${getStatusClass(item.status)}`}>
                                {formatText(item.status)}
                            </span>
                        </div>
                        <div>{item.assignedFieldCode || 'N/A'}</div>
                        <div className={styles.actionButtons}>
                            {!isScientist && (
                                <>
                                    <button
                                        className={`${styles.actionBtn} ${styles.delete}`}
                                        onClick={() => onDelete(item.id)}
                                        title="Delete"
                                    >
                                        <img
                                            src="/public/icons/delete-icon-silver.svg"
                                            alt="delete-icon"
                                            className={styles.deleteIcon}
                                        />
                                    </button>
                                    <button
                                        className={`${styles.actionBtn} ${styles.edit}`}
                                        onClick={() => onEdit(item)}
                                        title="Edit"
                                    >
                                        <img
                                            src="/public/icons/edit-icon-silver.svg"
                                            alt="edit-icon"
                                            className={styles.editIcon}
                                        />
                                    </button>
                                </>
                            )}
                            <button
                                className={`${styles.actionBtn} ${styles.view}`}
                                onClick={() => onView(item)}
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