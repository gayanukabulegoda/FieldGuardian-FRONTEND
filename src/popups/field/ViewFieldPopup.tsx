import {Field, FieldStaff, FieldEquipment} from '../../types/field';
import {truncateText} from '../../utils/textUtils';
import styles from '../../styles/popupStyles/fieldPopup.module.css';

interface ViewFieldPopupProps {
    isOpen: boolean;
    onClose: () => void;
    field: Field;
    staffMembers?: FieldStaff[];
    equipment?: FieldEquipment[];
}

export const ViewFieldPopup = ({
                                   isOpen,
                                   onClose,
                                   field,
                                   staffMembers = [],
                                   equipment = []
                               }: ViewFieldPopupProps) => {
    if (!isOpen) return null;

    const extractCoordinates = (location: string) => {
        const regex = /Point \[x=(-?\d+\.\d+), y=(-?\d+\.\d+)\]/;
        const match = location.match(regex);
        if (match) {
            return {lat: match[1], lng: match[2]};
        }
        return null;
    };

    const coordinates = extractCoordinates(field.location);
    const googleMapsLink = coordinates
        ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
        : "#";

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.popup} onClick={onClose}>
            <div className={styles.popupContent} onClick={handleContentClick}>
                <div className={styles.popupHeader}>
                    <h2>View Field</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <div className={styles.fieldDetails}>
                    <div className={styles.detailRow}>
                        <label>Name:</label>
                        <span>{field.name}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Extent Size:</label>
                        <span>{field.extentSize} sq. m</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Location:</label>
                        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer"
                           className={styles.locationLink}>
                            View in Google Maps
                        </a>
                    </div>
                    <div className={styles.imageSection}>
                        {field.fieldImage1 && (
                            <img
                                src={`data:image/jpeg;base64,${field.fieldImage1}`}
                                alt="Field 1"
                                className={styles.fieldImage}
                            />
                        )}
                        {field.fieldImage2 && (
                            <img
                                src={`data:image/jpeg;base64,${field.fieldImage2}`}
                                alt="Field 2"
                                className={styles.fieldImage}
                            />
                        )}
                    </div>
                    <div className={styles.relatedSection}>
                        <h3>Staff Members</h3>
                        <div className={styles.relatedList}>
                            {staffMembers.length > 0 ? (
                                staffMembers.map(staff => (
                                    <div key={staff.id} className={styles.relatedItem}>
                                        <span>{truncateText(`${staff.firstName} ${staff.lastName}`, 30)}</span>
                                        <span>{staff.contactNo}</span>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noData}>No staff members assigned</div>
                            )}
                        </div>
                    </div>
                    <div className={styles.relatedSection}>
                        <h3>Equipment</h3>
                        <div className={styles.relatedList}>
                            {equipment.length > 0 ? (
                                equipment.map(item => (
                                    <div key={item.id} className={styles.relatedItem}>
                                        <span>{truncateText(item.name, 30)}</span>
                                        <span>{item.type}</span>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noData}>No equipment assigned</div>
                            )}
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