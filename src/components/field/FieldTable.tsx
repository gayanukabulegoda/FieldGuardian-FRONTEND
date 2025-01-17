import {Field} from '../../types/field';
import {truncateText} from '../../utils/textUtils';
import styles from '../../styles/sectionStyles/fieldSection.module.css';

interface FieldTableProps {
    fields: Field[];
    onDelete: (id: string) => void;
    onEdit: (field: Field) => void;
    onView: (field: Field) => void;
    isAdministrative?: boolean;
}

export const FieldTable = ({fields, onDelete, onEdit, onView, isAdministrative}: FieldTableProps) => {
    const extractCoordinates = (location: string) => {
        const regex = /Point \[x=(-?\d+\.\d+), y=(-?\d+\.\d+)\]/;
        const match = location.match(regex);
        if (match) {
            return {lat: match[1], lng: match[2]};
        }
        return null;
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <div>Image</div>
                <div>Name</div>
                <div>Location</div>
                <div>Extent size (sq. m)</div>
                <div>Action</div>
            </div>
            <div className={styles.tableBody}>
                {fields.map((field) => {
                    const coordinates = extractCoordinates(field.location);
                    const googleMapsLink = coordinates
                        ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
                        : "#";

                    return (
                        <div key={field.code} className={styles.tableRow}>
                            <div>
                                <img
                                    // src={field.fieldImage1 ? `data:image/jpeg;base64,${field.fieldImage1}` : '/public/images/default_no_pic_image.png'}
                                    src={field.fieldImage1}
                                    alt={field.name}
                                    className={styles.fieldImage}
                                />
                            </div>
                            <div>{truncateText(field.name, 30)}</div>
                            <div>
                                <a href={googleMapsLink} target="_blank" rel="noopener noreferrer"
                                   className={styles.locationLink}>
                                    View Location
                                </a>
                            </div>
                            <div>{field.extentSize}</div>
                            <div className={styles.actionButtons}>
                                {!isAdministrative && (
                                    <>
                                        <button
                                            className={`${styles.actionBtn} ${styles.delete}`}
                                            onClick={() => onDelete(field.code)}
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
                                            onClick={() => onEdit(field)}
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
                                    onClick={() => onView(field)}
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
                    );
                })}
            </div>
        </div>
    );
};