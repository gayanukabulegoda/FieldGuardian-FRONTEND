import {Vehicle} from '../../types/vehicle.ts';
import {Staff} from '../../types/staff.ts';
import {truncateText, formatText} from '../../utils/textUtils.ts';
import styles from '../../styles/sectionStyles/vehicleSection.module.css';

interface ViewVehiclePopupProps {
    isOpen: boolean;
    onClose: () => void;
    vehicle: Vehicle;
    staffMembers: Staff[];
}

export const ViewVehiclePopup = ({
                                     isOpen,
                                     onClose,
                                     vehicle,
                                     staffMembers
                                 }: ViewVehiclePopupProps) => {
    if (!isOpen) return null;

    const getStaffInfo = (staffId?: string) => {
        if (!staffId) return 'N/A';
        const staff = staffMembers.find(s => s.id === staffId);
        return staff ? `${staff.firstName} ${staff.lastName} - ${staff.contactNo}` : 'N/A';
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.popup} onClick={onClose}>
            <div className={styles.popupContent} onClick={handleContentClick}>
                <div className={styles.popupHeader}>
                    <h2>View Vehicle</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <div className={styles.vehicleDetails}>
                    <div className={styles.detailRow}>
                        <label>License plate no:</label>
                        <span>{truncateText(vehicle.licensePlateNumber, 12)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Category:</label>
                        <span>{vehicle.category}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Fuel type:</label>
                        <span>{vehicle.fuelType}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Staff Member:</label>
                        <span>{truncateText(getStaffInfo(vehicle.driverId), 30)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <label>Status:</label>
                        <span>{formatText(vehicle.status)}</span>
                    </div>
                    <div className={styles.remarkField}>
                        <label>Remark:</label>
                        <textarea
                            value={vehicle.remark || 'No remark recorded...'}
                            readOnly
                        />
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