import {MonitoringLog} from '../../types/monitoringLog';
import {truncateText} from '../../utils/textUtils';
import styles from '../../styles/sectionStyles/monitoringLogSection.module.css';

interface MonitoringLogTableProps {
    logs: MonitoringLog[];
    onEdit: (log: MonitoringLog) => void;
    onView: (log: MonitoringLog) => void;
    isAdministrative?: boolean;
}

export const MonitoringLogTable = ({
                                       logs,
                                       onEdit,
                                       onView,
                                       isAdministrative
                                   }: MonitoringLogTableProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <div className={styles.thImage}>
                    <img src="/public/icons/image-icon.svg" alt="image"/>
                </div>
                <div className={styles.thDate}>Date</div>
                <div className={styles.thField}>Field</div>
                <div className={styles.thStaff}>Staff Count</div>
                <div className={styles.thAction}>Action</div>
            </div>
            <div className={styles.tableBody}>
                {logs.map((log) => (
                    <div key={log.code} className={styles.tableRow}>
                        <div>
                            <img
                                // src={`data:image/jpeg;base64,${log.observedImage}`}
                                src={log.observedImage}
                                alt="Field"
                                className={styles.fieldImage}
                            />
                        </div>
                        <div>{formatDate(log.date)}</div>
                        <div>{truncateText(log.fieldCode, 30)}</div>
                        <div>{log.staffCount}</div>
                        <div className={styles.actionButtons}>
                            {!isAdministrative && (
                                <button
                                    className={`${styles.actionBtn} ${styles.edit}`}
                                    onClick={() => onEdit(log)}
                                    title="Edit"
                                >
                                    <img
                                        src="/public/icons/edit-icon-silver.svg"
                                        alt="edit-icon"
                                        className={styles.editIcon}
                                    />
                                </button>
                            )}
                            <button
                                className={`${styles.actionBtn} ${styles.view}`}
                                onClick={() => onView(log)}
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