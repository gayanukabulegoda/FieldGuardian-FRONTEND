import React from 'react';
import styles from '../../styles/common/closeButton.module.css';

interface CloseButtonProps {
    onClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    return (
        <button className={styles.closeBtn} onClick={onClick}>
            <img
                src="/public/icons/close-icon-black.svg"
                alt="close-icon"
                className={styles.closeIcon}
            />
        </button>
    );
};