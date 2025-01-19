import {Vehicle} from '../../types/vehicle';
import {truncateText, formatText} from '../../utils/textUtils';
import styles from '../../styles/sectionStyles/vehicleSection.module.css';

interface VehicleTableProps {
    vehicles: Vehicle[];
    onDelete: (id: string) => void;
    onEdit: (vehicle: Vehicle) => void;
    onView: (vehicle: Vehicle) => void;
    isScientist?: boolean;
}

export const VehicleTable = ({
                                 vehicles,
                                 onDelete,
                                 onEdit,
                                 onView,
                                 isScientist
                             }: VehicleTableProps) => {
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'AVAILABLE':
                return styles.statusAvailable;
            case 'IN_USE':
                return styles.statusInuse;
            case 'OUT_OF_SERVICE':
                return styles.statusOutofservice;
            default:
                return '';
        }
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <div>License Plate No</div>
                <div>Category</div>
                <div>Status</div>
                <div>Fuel Type</div>
                <div>Action</div>
            </div>
            <div className={styles.tableBody}>
                {vehicles.map((vehicle) => (
                    <div key={vehicle.code} className={styles.tableRow}>
                        <div>{truncateText(vehicle.licensePlateNumber, 12)}</div>
                        <div>{truncateText(formatText(vehicle.category), 18)}</div>
                        <div>
                            <span className={`${styles.statusBadge} ${getStatusClass(vehicle.status)}`}>
                                {formatText(vehicle.status)}
                            </span>
                        </div>
                        <div>{truncateText(formatText(vehicle.fuelType), 20)}</div>
                        <div className={styles.actionButtons}>
                            {!isScientist && (
                                <>
                                    <button
                                        className={`${styles.actionBtn} ${styles.delete}`}
                                        onClick={() => onDelete(vehicle.code)}
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
                                        onClick={() => onEdit(vehicle)}
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
                                onClick={() => onView(vehicle)}
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