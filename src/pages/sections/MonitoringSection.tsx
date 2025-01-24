import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
    fetchAllMonitoringLogs,
    filterMonitoringLogs,
} from '../../store/slices/monitoringLogSlice';
import {AddEditMonitoringLogPopup} from '../../popups/addEdit/AddEditMonitoringLogPopup.tsx';
import {ViewMonitoringLogPopup} from '../../popups/view/ViewMonitoringLogPopup.tsx';
import {MonitoringLog} from '../../types/monitoringLog';
import {Portal} from "../../components/portal/Portal.ts";
import {DataFilter, FilterField} from "../../components/common/DataFilter.tsx";
import {DataTable} from "../../components/common/DataTable.tsx";
import styles from '../../styles/sectionStyles/monitoringLogSection.module.css';

export const MonitoringSection = () => {
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

    const columns = [
        {
            key: 'observedImage',
            header: 'Image',
            width: 1,
            render: (value: string) => (
                <img
                    src={value}
                    alt="Field"
                    className={styles.fieldImage}
                />
            )
        },
        {
            key: 'date',
            header: 'Date',
            width: 1.5,
            render: (value: string) => new Date(value).toLocaleDateString()
        },
        {key: 'fieldCode', header: 'Field', width: 2},
        {key: 'staffCount', header: 'Staff Count', width: 1.5}
    ];

    const filterFields: FilterField[] = [
        {type: 'text', key: 'field', placeholder: 'Search by field'},
        {type: 'date', key: 'date'}
    ];

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

    const actions = [
        {
            icon: '/icons/edit-icon-silver.svg',
            activeIcon: '/icons/edit-icon-blue.svg',
            title: 'Edit',
            onClick: handleEdit,
            show: () => !userRole?.includes('ADMINISTRATIVE')
        },
        {
            icon: '/icons/view-icon-silver.svg',
            activeIcon: '/icons/view-icon-green.svg',
            title: 'View',
            onClick: handleView
        }
    ];

    const isAnyPopupOpen = showAddEdit || showView;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`${styles.monitoringContainer} ${isAnyPopupOpen ? styles.blurBackground : ''}`}>
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

            <DataFilter
                fields={filterFields}
                onSearch={handleSearch}
                variant="monitoring"
            />

            <DataTable
                columns={columns}
                data={logs}
                actions={actions}
                variant="monitoring"
            />

            <Portal>
                {showAddEdit && (
                    <AddEditMonitoringLogPopup
                        isOpen={showAddEdit}
                        onClose={() => setShowAddEdit(false)}
                        log={selectedLog || undefined}
                        fields={fields}
                        staff={staff}
                        crops={crops}
                    />
                )}
            </Portal>

            <Portal>
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
            </Portal>
        </div>
    );
};