import React from 'react';
import {Crop} from '../../types/crop.ts';
import {Field} from '../../types/field.ts';
import {ActionButton} from '../../components/common/ActionButton.tsx';
import {PopupHeader} from '../../components/common/PopupHeader.tsx';
import {truncateText} from '../../utils/textUtils.ts';
import styles from '../../styles/popupStyles/view/viewCropPopup.module.css';

interface ViewCropPopupProps {
    isOpen: boolean;
    onClose: () => void;
    crop: Crop;
    fields: Field[];
}

export const ViewCropPopup: React.FC<ViewCropPopupProps> = ({
                                                                isOpen,
                                                                onClose,
                                                                crop,
                                                                fields
                                                            }) => {
    if (!isOpen) return null;

    const getFieldName = (fieldCode: string) => {
        const field = fields.find(f => f.code === fieldCode);
        return field ? field.name : 'Unknown Field';
    };

    return (
        <div className={styles.viewCropPopup} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                <PopupHeader
                    title="View Crop"
                    variant="primary"
                    icon="/public/icons/crop-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <div className={styles.cropDetails}>
                        <div className={styles.detailsContainer}>
                            <div className={styles.detailsSection}>
                                <div className={styles.detailsRow}>
                                    <label>Common name:</label>
                                    <span title={crop.commonName}>
                                        {truncateText(crop.commonName, 30)}
                                    </span>
                                </div>
                                <div className={styles.detailsRow}>
                                    <label>Scientific name:</label>
                                    <span title={crop.scientificName}>
                                        {truncateText(crop.scientificName, 30)}
                                    </span>
                                </div>
                                <div className={styles.detailsRow}>
                                    <label>Category:</label>
                                    <span title={crop.category}>{crop.category}</span>
                                </div>
                                <div className={styles.detailsRow}>
                                    <label>Season:</label>
                                    <span title={crop.season}>{crop.season}</span>
                                </div>
                                <div className={styles.detailsRow}>
                                    <label>Assigned Field:</label>
                                    <span title={getFieldName(crop.fieldCode)}>
                                        {truncateText(getFieldName(crop.fieldCode), 30)}
                                    </span>
                                </div>
                            </div>
                            {crop.cropImage && (
                                <div className={styles.imageSection}>
                                    <div className={styles.previewContainer}>
                                        <img
                                            // src={`data:image/jpeg;base64,${crop.cropImage}`}
                                            src={crop.cropImage}
                                            alt={crop.commonName}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.buttonContainer}>
                            <ActionButton onClick={onClose}>CLOSE</ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};