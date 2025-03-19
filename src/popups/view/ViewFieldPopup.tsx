import React from 'react';
import {Field, FieldStaff, FieldEquipment} from '../../types/field.ts';
import {ActionButton} from "../../components/common/ActionButton.tsx";
import {PopupHeader} from '../../components/common/PopupHeader.tsx';
import {SelectionList} from '../../components/custom/SelectionList.tsx';
import {validateLocation} from "../../utils/validation.ts";
import styles from '../../styles/popupStyles/view/viewFieldPopup.module.css';

interface ViewFieldPopupProps {
    isOpen: boolean;
    onClose: () => void;
    field: Field;
    staffMembers?: FieldStaff[];
    equipment?: FieldEquipment[];
}

export const ViewFieldPopup: React.FC<ViewFieldPopupProps> = ({
                                                                  isOpen,
                                                                  onClose,
                                                                  field,
                                                                  staffMembers = [],
                                                                  equipment = []
                                                              }) => {
    if (!isOpen) return null;

    const extractCoordinates = (location: string) => {
        const match = validateLocation(location);
        if (match) {
            return {lat: match[1], lng: match[2]};
        }
        return null;
    };

    const coordinates = extractCoordinates(field.location);
    const googleMapsLink = coordinates
        ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
        : "#";

    return (
        <div className={styles.viewFieldPopup} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                <PopupHeader
                    title="View Field"
                    variant="primary"
                    icon="/public/icons/field-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <div className={styles.fieldDetails}>
                        <div className={styles.detailsContainer}>
                            <div className={styles.detailsSection}>
                                <div className={styles.detailsRow}>
                                    <label>Name:</label>
                                    <span title={field.name}>{field.name}</span>
                                </div>
                                <div className={styles.detailsRow}>
                                    <label>Extent size (sq. m):</label>
                                    <span title={field.extentSize.toString()}>{field.extentSize}</span>
                                </div>
                                <div className={styles.detailsRow}>
                                    <label>Location:</label>
                                    <a
                                        href={googleMapsLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.locationLink}
                                    >
                                        Click to open in map ↗
                                    </a>
                                </div>
                                <div className={styles.imageSection}>
                                    {field.fieldImage1 && (
                                        <div className={styles.previewContainer}>
                                            <img
                                                // src={`data:image/jpeg;base64,${field.fieldImage1}`}
                                                src={field.fieldImage1}
                                                alt="field"
                                            />
                                        </div>
                                    )}
                                    {field.fieldImage2 && (
                                        <div className={styles.previewContainer}>
                                            <img
                                                // src={`data:image/jpeg;base64,${field.fieldImage2}`}
                                                src={field.fieldImage2}
                                                alt="field"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.selectionSection}>
                                <SelectionList
                                    title="Staff Members"
                                    items={staffMembers.map(staff => ({
                                        id: staff.id,
                                        name: `${staff.firstName} ${staff.lastName}`,
                                        detail: staff.contactNo
                                    }))}
                                    selectedIds={[]}
                                    onSelect={() => {
                                    }}
                                    readOnly
                                />
                                <SelectionList
                                    title="Equipment"
                                    items={equipment.map(eq => ({
                                        id: eq.id,
                                        name: eq.name,
                                        detail: eq.type
                                    }))}
                                    selectedIds={[]}
                                    onSelect={() => {
                                    }}
                                    readOnly
                                />
                            </div>
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