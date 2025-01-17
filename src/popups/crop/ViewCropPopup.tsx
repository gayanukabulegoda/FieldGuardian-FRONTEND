import {Crop} from '../../types/crop';
import {Field} from '../../types/field';
import {truncateText} from '../../utils/textUtils';
import styles from '../../styles/sectionStyles/cropSection.module.css';

interface ViewCropPopupProps {
    isOpen: boolean;
    onClose: () => void;
    crop: Crop;
    fields: Field[];
}

export const ViewCropPopup = ({
                                  isOpen,
                                  onClose,
                                  crop,
                                  fields
                              }: ViewCropPopupProps) => {
    if (!isOpen) return null;

    const getFieldName = (fieldCode: string) => {
        const field = fields.find(f => f.code === fieldCode);
        return field ? field.name : 'Unknown Field';
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.popup} onClick={onClose}>
            <div className={styles.popupContent} onClick={handleContentClick}>
                <div className={styles.popupHeader}>
                    <h2>View Crop</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <div className={styles.cropDetails}>
                    <div className={styles.detailRow}>
                        <label>Common Name:</label>
                        <span>{truncateText(crop.commonName, 30)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Scientific Name:</label>
                        <span>{truncateText(crop.scientificName, 30)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Category:</label>
                        <span>{crop.category}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Season:</label>
                        <span>{crop.season}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Field:</label>
                        <span>{truncateText(getFieldName(crop.fieldCode), 30)}</span>
                    </div>
                    {crop.cropImage && (
                        <div className={styles.imageSection}>
                            <img
                                src={`data:image/jpeg;base64,${crop.cropImage}`}
                                alt="Crop"
                                className={styles.cropImage}
                            />
                        </div>
                    )}
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