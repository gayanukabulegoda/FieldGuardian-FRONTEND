import {useSelector} from 'react-redux';
import {RootState} from '../store/store.ts';
import {CloseButton} from "../components/common/CloseButton.tsx";
import {ProfileImage} from "../components/profile/ProfileImage.tsx";
import styles from '../styles/popupStyles/myProfilePopup.module.css';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MyProfilePopup = ({isOpen, onClose}: ProfileModalProps) => {
    const {currentUser} = useSelector((state: RootState) => state.user);

    if (!isOpen || !currentUser) return null;

    return (
        <div className={styles.profilePopup}>
            <div className={styles.popupContent}>
                <div className={styles.profileCard}>
                    <ProfileImage gender={currentUser.gender} size="medium"/>
                    <div className={styles.profileInfo}>
                        <h2 className={styles.profileName}>{currentUser?.name}</h2>
                        <p className={styles.profileEmail}>{currentUser?.email}</p>
                    </div>
                    <div className={styles.roleBadge}>
                        <div className={styles.roleBorder}></div>
                        <span className={styles.roleText}>{currentUser?.role}</span>
                        <div className={styles.roleBorder}></div>
                    </div>
                    <CloseButton onClick={onClose} />
                </div>
            </div>
        </div>
    );
};