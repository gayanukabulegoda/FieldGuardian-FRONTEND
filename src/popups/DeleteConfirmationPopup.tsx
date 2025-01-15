import styles from '../styles/sectionStyles/staffSection.module.css';

interface DeleteConfirmationPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteConfirmationPopup = ({
                                            isOpen,
                                            onClose,
                                            onConfirm
                                        }: DeleteConfirmationPopupProps) => {
    if (!isOpen) return null;

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.popup} onClick={onClose}>
            <div className={styles.popupContent} onClick={handleContentClick}>
                <div className={styles.popupHeader}>
                    <h2>Delete Confirmation</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <div className={styles.confirmationContent}>
                    <p>Do you really want to delete this staff member?</p>
                    <p>This process cannot be undone.</p>
                </div>
                <div className={styles.popupActions}>
                    <button onClick={onConfirm} className={styles.deleteBtn}>
                        Confirm Delete
                    </button>
                    <button onClick={onClose} className={styles.cancelBtn}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};