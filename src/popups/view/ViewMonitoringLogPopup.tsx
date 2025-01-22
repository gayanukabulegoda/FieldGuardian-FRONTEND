import React from 'react';
import {MonitoringLog} from '../../types/monitoringLog';
import {Field} from '../../types/field';
import {Staff} from '../../types/staff';
import {Crop} from '../../types/crop';
import {ActionButton} from '../../components/common/ActionButton';
import {PopupHeader} from '../../components/common/PopupHeader';
import {truncateText} from '../../utils/textUtils';
import styles from '../../styles/popupStyles/view/viewMonitoringLogPopup.module.css';

interface ViewMonitoringLogPopupProps {
    isOpen: boolean;
    onClose: () => void;
    log: MonitoringLog;
    fields: Field[];
    staff: Staff[];
    crops: Crop[];
}

export const ViewMonitoringLogPopup: React.FC<ViewMonitoringLogPopupProps> = ({
                                                                                  isOpen,
                                                                                  onClose,
                                                                                  log,
                                                                                  fields,
                                                                                  staff,
                                                                                  crops
                                                                              }) => {
    if (!isOpen) return null;

    const getFieldName = (fieldCode: string) => {
        const field = fields.find(f => f.code === fieldCode);
        return field ? field.name : 'N/A';
    };

    const getLogDate = (date: string) => {
        return new Date(date).toLocaleTimeString();
    }

    return (
        <div className={styles.viewMonitoringPopup} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                <PopupHeader
                    title="View Monitoring Log"
                    variant="primary"
                    icon="/public/icons/monitoring-log-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <div className={styles.monitoringDetails}>
                        <div className={styles.detailsContainer}>
                            <div className={styles.detailsSection}>
                                <div className={styles.detailsRow}>
                                    <label>Field:</label>
                                    <span title={getFieldName(log.fieldCode)}>
                                        {truncateText(getFieldName(log.fieldCode), 30)}
                                    </span>
                                </div>
                                <div className={styles.detailsRow}>
                                    <label>Date:</label>
                                    <span title={getLogDate(log.date)}>{getLogDate(log.date)}</span>
                                </div>
                                <div className={`${styles.detailsRow} ${styles.observationRow}`}>
                                    <label>Observation:</label>
                                    <textarea
                                        value={log.details || 'No observation recorded...'}
                                        readOnly
                                    />
                                </div>
                                {log.observedImage && (
                                    <div className={styles.imageSection}>
                                        <div className={styles.previewContainer}>
                                            <img src={log.observedImage} alt="Monitoring"/>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.selectionSection}>
                                <div className={styles.selectionGroup}>
                                    <h2 className={styles.sectionTitle}>Staff Members</h2>
                                    <div className={styles.selectionContainer}>
                                        {staff.length === 0 ? (
                                            <div className={styles.selectionRow}>
                                                <div className={styles.selectionInfo}>
                                                    <span className={styles.selectionName}>
                                                        No staff assigned
                                                    </span>
                                                    <span className={styles.selectionDetail}>
                                                        ----
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            staff.map(member => (
                                                <div key={member.id} className={styles.selectionRow}>
                                                    <div className={styles.selectionInfo}>
                                                        <span className={styles.selectionName}>
                                                            {truncateText(
                                                                `${member.firstName} ${member.lastName}`,
                                                                28
                                                            )}
                                                        </span>
                                                        <span className={styles.selectionDetail}>
                                                            {truncateText(member.contactNo, 12)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                                <div className={styles.selectionGroup}>
                                    <h2 className={styles.sectionTitle}>Crops</h2>
                                    <div className={styles.selectionContainer}>
                                        {crops.length === 0 ? (
                                            <div className={styles.selectionRow}>
                                                <div className={styles.selectionInfo}>
                                                    <span className={styles.selectionName}>
                                                        No crops assigned
                                                    </span>
                                                    <span className={styles.selectionDetail}>
                                                        ----
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            crops.map(crop => (
                                                <div key={crop.code} className={styles.selectionRow}>
                                                    <div className={styles.selectionInfo}>
                                                        <span className={styles.selectionName}>
                                                            {truncateText(crop.commonName, 28)}
                                                        </span>
                                                        <span className={styles.selectionDetail}>
                                                            {truncateText(crop.scientificName, 28)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttonContainer} style={{paddingTop: '1rem'}}>
                            <ActionButton onClick={onClose}>CLOSE</ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};