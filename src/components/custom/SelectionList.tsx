import React from 'react';
import styles from '../../styles/popupStyles/addEdit/addEditFieldPopup.module.css';

interface SelectionItem {
    id: string;
    name: string;
    detail: string;
}

interface SelectionListProps {
    title: string;
    items: SelectionItem[];
    selectedIds: string[];
    onSelect: (id: string) => void;
    readOnly?: boolean;
}

export const SelectionList: React.FC<SelectionListProps> = ({
                                                                title,
                                                                items,
                                                                selectedIds,
                                                                onSelect,
                                                                readOnly = false
                                                            }) => {
    return (
        <div className={styles.selectionSection}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={styles.selectionContainer}>
                {items.length === 0 ? (
                    <div className={styles.selectionRow}>
                        <div className={styles.selectionInfo}>
                            <span className={styles.selectionName}>No items available</span>
                            <span className={styles.selectionDetail}>----</span>
                        </div>
                    </div>
                ) : (
                    items.map(item => (
                        <div
                            key={item.id}
                            className={`${styles.selectionRow} ${selectedIds.includes(item.id) ? styles.selected : ''}`}
                            onClick={() => !readOnly && onSelect(item.id)}
                        >
                            <div className={styles.selectionInfo}>
                                <span className={styles.selectionName}>{item.name}</span>
                                <span className={styles.selectionDetail}>{item.detail}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};