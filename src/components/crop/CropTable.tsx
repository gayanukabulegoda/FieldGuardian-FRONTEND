import {Crop} from '../../types/crop';
import {truncateText} from '../../utils/textUtils';
import styles from '../../styles/sectionStyles/cropSection.module.css';

interface CropTableProps {
    crops: Crop[];
    onDelete: (id: string) => void;
    onEdit: (crop: Crop) => void;
    onView: (crop: Crop) => void;
    isAdministrative?: boolean;
}

export const CropTable = ({crops, onDelete, onEdit, onView, isAdministrative}: CropTableProps) => {
    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <div>Common Name</div>
                <div>Scientific Name</div>
                <div>Category</div>
                <div>Season</div>
                <div>Action</div>
            </div>
            <div className={styles.tableBody}>
                {crops.map((crop) => (
                    <div key={crop.code} className={styles.tableRow}>
                        <div>{truncateText(crop.commonName, 28)}</div>
                        <div>{truncateText(crop.scientificName, 28)}</div>
                        <div>{truncateText(crop.category, 18)}</div>
                        <div>{truncateText(crop.season, 16)}</div>
                        <div className={styles.actionButtons}>
                            {!isAdministrative && (
                                <>
                                    <button
                                        className={`${styles.actionBtn} ${styles.delete}`}
                                        onClick={() => onDelete(crop.code)}
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
                                        onClick={() => onEdit(crop)}
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
                                onClick={() => onView(crop)}
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