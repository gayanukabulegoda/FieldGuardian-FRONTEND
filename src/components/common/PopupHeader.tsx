import React from 'react';
import {CloseButton} from "./CloseButton.tsx";
import styles from '../../styles/common/popupHeader.module.css';

interface PopupHeaderProps {
    title: string;
    variant: string;
    icon: string;
    onClose: () => void;
}

export const PopupHeader: React.FC<PopupHeaderProps> = ({title, variant='primary', icon, onClose}) => {
    const getTitleClass = () => {
        switch (variant) {
            case 'primary':
                return styles.headerTitle;
            case 'danger':
                return styles.dangerHeaderTitle;
            default:
                return styles.headerTitle;
        }
    };

    return (
        <div className={styles.popupHeader}>
            <div className={styles.headerContent}>
                <div className={styles.headerIcon}>
                    <img src={icon} alt="popup-icon"/>
                </div>
                <h2 className={`${getTitleClass()}`}>{title}</h2>
            </div>
            <CloseButton onClick={onClose} />
        </div>
    );
};