import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
    fetchAllMonitoringLogs,
    filterMonitoringLogs,
    addMonitoringLog,
    updateMonitoringLog
} from '../../store/slices/monitoringLogSlice';
import {MonitoringLogTable} from '../../components/monitoringLog/MonitoringLogTable';
import {MonitoringLogFilters} from '../../components/monitoringLog/MonitoringLogFilters';
import {AddEditMonitoringLogPopup} from '../../popups/addEdit/AddEditMonitoringLogPopup.tsx';
import {ViewMonitoringLogPopup} from '../../popups/view/ViewMonitoringLogPopup.tsx';
import {MonitoringLog, MonitoringLogDTO} from '../../types/monitoringLog';
import styles from '../../styles/sectionStyles/monitoringLogSection.module.css';

export const MonitoringPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {logs, loading} = useSelector((state: RootState) => state.monitoringLog);
    const {fields} = useSelector((state: RootState) => state.field);
    const {staff} = useSelector((state: RootState) => state.staff);
    const {crops} = useSelector((state: RootState) => state.crop);
    const userRole = useSelector((state: RootState) => state.user.currentUser?.role);

    const [selectedLog, setSelectedLog] = useState<MonitoringLog | null>(null);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [showView, setShowView] = useState(false);

    useEffect(() => {
        // dispatch(fetchAllMonitoringLogs());
    }, [dispatch]);

    const handleSearch = (filters: any) => {
        dispatch(filterMonitoringLogs(filters));
    };

    const handleAdd = () => {
        setSelectedLog(null);
        setShowAddEdit(true);
    };

    const handleEdit = (log: MonitoringLog) => {
        setSelectedLog(log);
        setShowAddEdit(true);
    };

    const handleView = (log: MonitoringLog) => {
        setSelectedLog(log);
        setShowView(true);
    };

    const handleSave = async (monitoringLogData: MonitoringLogDTO) => {
        if (selectedLog) {
            await dispatch(updateMonitoringLog({
                id: selectedLog.code,
                monitoringLogDTO: monitoringLogData
            }));
        } else {
            await dispatch(addMonitoringLog(monitoringLogData));
        }
        setShowAddEdit(false);
        dispatch(fetchAllMonitoringLogs());
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.monitoringContainer}>
            <div className={styles.monitoringHeader}>
                <h1 className={styles.pageTitle}>Monitoring Logs</h1>
                {userRole !== 'ADMINISTRATIVE' && (
                    <div className={styles.headerButtons}>
                        <button className={styles.btnPopupAction} onClick={handleAdd}>
                            Add
                        </button>
                    </div>
                )}
            </div>

            <MonitoringLogFilters onSearch={handleSearch}/>

            <MonitoringLogTable
                logs={logs}
                onEdit={handleEdit}
                onView={handleView}
                isAdministrative={userRole === 'ADMINISTRATIVE'}
            />

            {showAddEdit && (
                <AddEditMonitoringLogPopup
                    isOpen={showAddEdit}
                    onClose={() => setShowAddEdit(false)}
                    onSave={handleSave}
                    log={selectedLog || undefined}
                    fields={fields}
                    staff={staff}
                    crops={crops}
                />
            )}

            {showView && selectedLog && (
                <ViewMonitoringLogPopup
                    isOpen={showView}
                    onClose={() => setShowView(false)}
                    log={selectedLog}
                    fields={fields}
                    staff={staff}
                    crops={crops}
                />
            )}
        </div>
    );
};