import {useSelector} from 'react-redux';
import {X} from 'lucide-react';
import {RootState} from '../store/store.ts';
import styles from '../styles/popupStyles/myProfilePopup.module.css';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MyProfilePopup = ({isOpen, onClose}: ProfileModalProps) => {
    const {currentUser} = useSelector((state: RootState) => state.user);

    if (!isOpen) return null;

    return (
        <div className={styles.profilePopup}>
            <div className={styles.popupContent}>
                <div className={styles.profileCard}>
                    <div className={styles.profileImage}>
                        <img
                            src={currentUser?.gender === 'FEMALE'
                                ? '/images/default_female_user_profile_pic.jpg'
                                : '/images/default_male_user_profile_pic.jpg'}
                            alt="Profile"
                            className={styles.roundedCircle}
                        />
                    </div>
                    <div className={styles.profileInfo}>
                        <h2 className={styles.profileName}>{currentUser?.name}</h2>
                        <p className={styles.profileEmail}>{currentUser?.email}</p>
                    </div>
                    <div className={styles.roleBadge}>
                        <div className={styles.roleBorder}></div>
                        <span className={styles.roleText}>{currentUser?.role}</span>
                        <div className={styles.roleBorder}></div>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={24}/>
                    </button>
                </div>
            </div>
        </div>
    );
};