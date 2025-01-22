import React from 'react';
import {Vehicle} from '../../types/vehicle';
import {Staff} from '../../types/staff';
import {ActionButton} from '../../components/common/ActionButton.tsx';
import {PopupHeader} from '../../components/common/PopupHeader.tsx';
import {truncateText, formatText} from '../../utils/textUtils';
import styles from '../../styles/popupStyles/view/viewVehiclePopup.module.css';

interface ViewVehiclePopupProps {
    isOpen: boolean;
    onClose: () => void;
    vehicle: Vehicle;
    staffMembers: Staff[];
}

export const ViewVehiclePopup: React.FC<ViewVehiclePopupProps> = ({
                                                                      isOpen,
                                                                      onClose,
                                                                      vehicle,
                                                                      staffMembers
                                                                  }) => {
    if (!isOpen) return null;

    const getStaffInfo = (staffId?: string) => {
        if (!staffId) return 'N/A';
        const staff = staffMembers.find(s => s.id === staffId);
        return staff ? `${staff.firstName} ${staff.lastName} - ${staff.contactNo}` : 'N/A';
    };

    return (
        <div className={styles.viewVehiclePopup} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                <PopupHeader
                    title="View Vehicle"
                    variant="primary"
                    icon="/public/icons/vehicle-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <div className={styles.vehicleDetails}>
                        <div className={styles.detailsContainer}>
                            <div className={styles.detailsSection}>
                                <div className={styles.detailsRow}>
                                    <label>License plate no:</label>
                                    <span title={vehicle.licensePlateNumber}>
                                        {truncateText(vehicle.licensePlateNumber, 12)}
                                    </span>
                                </div>
                                <div className={styles.detailsRow}>
                                    <label>Category:</label>
                                    <span title={formatText(vehicle.category)}>
                                        {truncateText(formatText(vehicle.category), 18)}
                                    </span>
                                </div>
                                <div className={styles.detailsRow}>
                                    <label>Fuel type:</label>
                                    <span title={formatText(vehicle.fuelType)}>
                                        {truncateText(formatText(vehicle.fuelType), 20)}
                                    </span>
                                </div>
                                <div className={styles.detailsRow}>
                                    <label>Status:</label>
                                    <span title={formatText(vehicle.status)}>
                                        {formatText(vehicle.status)}
                                    </span>
                                </div>
                                <div className={styles.detailsRow}>
                                    <label>Staff Member:</label>
                                    <span title={getStaffInfo(vehicle.driverId)}>
                                        {truncateText(getStaffInfo(vehicle.driverId), 30)}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.remarkField}>
                                <div className={`${styles.detailsRow} ${styles.remarkRow}`}>
                                    <label>Remark:</label>
                                    <textarea
                                        value={vehicle.remark || 'No remark recorded...'}
                                        readOnly
                                    />
                                </div>
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