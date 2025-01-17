import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {truncateText} from '../../utils/textUtils';
import styles from '../../styles/homePage.module.css';

export const UserProfileSection = () => {
    let user = useSelector((state: RootState) => state.user.currentUser);
    user = {
        name: "John Doe",
        email: "grbulegoda@gmail.com",
        gender: 'MALE',
        role: "MANAGER"
    }

    const profileImage = user?.gender === 'FEMALE'
        ? '/images/default_female_user_profile_pic.jpg'
        : '/images/default_male_user_profile_pic.jpg';

    return (
        <>
            <div className={styles.profileImage}>
                <img src={profileImage} alt="Profile"/>
            </div>
            <div className={styles.profileInfo}>
                <h5 className={styles.profileName}>{truncateText(user?.name || '', 18)}</h5>
                <p className={styles.profileEmail}>{truncateText(user?.email || '', 24)}</p>
            </div>
        </>
    );
};