import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {fetchAllUsers} from '../../store/slices/userSlice';
import {truncateText} from '../../utils/textUtils';
import {CloseButton} from "../../components/common/CloseButton.tsx";
import styles from '../../styles/popupStyles/systemUsersPopup.module.css';

interface SystemUsersPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onDeleteUser: (email: string) => void;
}

export const SystemUsersPopup: React.FC<SystemUsersPopupProps> = ({
                                                                      isOpen,
                                                                      onClose,
                                                                      onDeleteUser
                                                                  }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {users, loading} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (isOpen) {
            // dispatch(fetchAllUsers());
        }
    }, [dispatch, isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.systemUsersPopup}>
            <div className={styles.popupContainer}>
                <div className={styles.popupHeader}>
                    <h2 className={styles.popupTitle}>System Users</h2>
                    <CloseButton onClick={onClose} />
                </div>

                <div className={styles.tableContainer}>
                    <div className={styles.usersTable}>
                        <div className={styles.tableHeader}>
                            <div>Name</div>
                            <div>Role</div>
                            <div>Email</div>
                            <div>Action</div>
                        </div>

                        <div className={styles.tableBody}>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                users.map(user => (
                                    <div key={user.email} className={styles.tableRow}>
                                        <div>{truncateText(user.name, 30)}</div>
                                        <div>{user.role}</div>
                                        <div>{truncateText(user.email, 30)}</div>
                                        <div>
                                            <button
                                                className={styles.deleteBtn}
                                                onClick={() => onDeleteUser(user.email)}
                                                title="Delete"
                                            >
                                                <img
                                                    src="/public/icons/delete-icon-silver.svg"
                                                    alt="delete-icon"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};