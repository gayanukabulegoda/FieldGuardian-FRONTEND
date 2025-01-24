import React from 'react';
import {truncateText, formatText} from '../../utils/textUtils';
import styles from '../../styles/common/dataTable.module.css';

interface Column {
    key: string;
    header: string;
    width?: number;
    render?: (value: any, row: any) => React.ReactNode;
}

interface Action {
    icon: string;
    activeIcon: string;
    title: string;
    onClick: (row: any) => void;
    show?: (row: any) => boolean;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    actions?: Action[];
    variant?: 'default' | 'field' | 'staff' | 'monitoring' | 'vehicle' | 'equipment';
}

export const DataTable: React.FC<DataTableProps> = ({
                                                        columns,
                                                        data,
                                                        actions = [],
                                                        variant = 'default'
                                                    }) => {
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'AVAILABLE':
                return styles.statusAvailable;
            case 'IN_USE':
                return styles.statusInuse;
            case 'UNDER_MAINTENANCE':
            case 'OUT_OF_SERVICE':
                return styles.statusMaintenance;
            default:
                return '';
        }
    };

    const renderCell = (column: Column, row: any) => {
        const value = row[column.key];

        if (column.render) {
            return column.render(value, row);
        }

        if (typeof value === 'string' && ['status', 'state'].includes(column.key)) {
            return (
                <span className={`${styles.statusBadge} ${getStatusClass(value)}`}>
                    {formatText(value)}
                </span>
            );
        }

        return truncateText(String(value || 'N/A'), 30);
    };

    const getTableClass = () => {
        switch (variant) {
            case 'field':
                return styles.fieldTable;
            case 'staff':
                return styles.staffTable;
            case 'monitoring':
                return styles.monitoringTable;
            case 'vehicle':
                return styles.vehicleTable;
            case 'equipment':
                return styles.equipmentTable;
            default:
                return '';
        }
    };

    return (
        <div className={`${styles.tableContainer} ${getTableClass()}`}>
            <div className={styles.tableHeader}>
                {columns.map((column, index) => (
                    <div
                        key={index}
                        style={column.width ? {flex: column.width} : undefined}
                    >
                        {column.header}
                    </div>
                ))}
                {actions.length > 0 && <div>Action</div>}
            </div>
            <div className={styles.tableBody}>
                {data.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.tableRow}>
                        {columns.map((column, colIndex) => (
                            <div
                                key={colIndex}
                                style={column.width ? {flex: column.width} : undefined}
                            >
                                {renderCell(column, row)}
                            </div>
                        ))}
                        {actions.length > 0 && (
                            <div className={styles.actionButtons}>
                                {actions.map((action, actionIndex) => (
                                    action.show?.(row) !== false && (
                                        <button
                                            key={actionIndex}
                                            className={`${styles.actionBtn} ${styles[action.title.toLowerCase()]}`}
                                            onClick={() => action.onClick(row)}
                                            title={action.title}
                                        >
                                            <img
                                                src={action.icon}
                                                alt={`${action.title}-icon`}
                                                className={styles[`${action.title.toLowerCase()}Icon`]}
                                                onMouseOver={e => e.currentTarget.src = action.activeIcon}
                                                onMouseOut={e => e.currentTarget.src = action.icon}
                                            />
                                        </button>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};