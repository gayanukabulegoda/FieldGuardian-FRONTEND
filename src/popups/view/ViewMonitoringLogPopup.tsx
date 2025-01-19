import {MonitoringLog} from '../../types/monitoringLog.ts';
import styles from '../../styles/sectionStyles/monitoringLogSection.module.css';
import {Field} from "../../types/field.ts";
import {Staff} from "../../types/staff.ts";
import {Crop} from "../../types/crop.ts";

interface ViewMonitoringLogPopupProps {
    isOpen: boolean;
    onClose: () => void;
    log: MonitoringLog;
    fields: Field[];
    staff: Staff[];
    crops: Crop[];
}

export const ViewMonitoringLogPopup = ({
                                           isOpen,
                                           onClose,
                                           log,
                                           fields,
                                           staff,
                                           crops
                                       }: ViewMonitoringLogPopupProps) => {
    if (!isOpen) return null;

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.popup} onClick={onClose}>
            <div className={styles.popupContent} onClick={handleContentClick}>
                <div className={styles.popupHeader}>
                    <h2>View Monitoring Log</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <div className={styles.popupBody}>
                    <p><strong>Log ID:</strong> {log.code}</p>
                    <p><strong>Field:</strong> {fields.find(field => field.code === log.fieldCode)?.name}</p>
                    <p><strong>Staff:</strong> {staff.find(member => member.id === log.details)?.address}</p>
                    <p><strong>Crop:</strong> {crops.find(crop => crop.code === log.code)?.commonName}</p>
                    <p><strong>Date:</strong> {log.date}</p>
                    <p><strong>Details:</strong> {log.details}</p>
                </div>
            </div>
        </div>
    );
};