import React from 'react';
import {ActionButton} from '../components/common/ActionButton.tsx';
import {PopupHeader} from '../components/common/PopupHeader';
import styles from '../styles/popupStyles/deleteConfirmationPopup.module.css';

interface DeleteConfirmationPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export const DeleteConfirmationPopup: React.FC<DeleteConfirmationPopupProps> = ({
                                                                                    isOpen,
                                                                                    onClose,
                                                                                    onConfirm,
                                                                                    title = 'Delete Confirmation',
                                                                                    message = 'Do you really want to delete these records? This process cannot be undone.'
                                                                                }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.deletePopup} id="deleteConfirmationPopup">
            <PopupHeader
                title={title}
                variant="danger"
                icon="/public/icons/delete-confirmation-popup-icon.svg"
                onClose={onClose}
            />
            <div className={styles.popupContent}>
                <p className={styles.confirmationText}>{message}</p>
                <ActionButton
                    variant="danger"
                    onClick={onConfirm}
                    id="confirmDeleteBtn"
                >
                    CONFIRM
                </ActionButton>
            </div>
        </div>
    );
};