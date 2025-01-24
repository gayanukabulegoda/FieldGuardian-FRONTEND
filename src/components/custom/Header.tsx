import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import {formatDate} from '../../utils/dateUtils.ts';
import styles from '../../styles/homePage.module.css';

interface HeaderProps {
    onProfileClick: () => void;
}

export const Header = ({onProfileClick}: HeaderProps) => {
    const user = useSelector((state: RootState) => state.user.currentUser);
    return (
        <header className={styles.header}>
            <div className={styles.headerWelcome}>
                <h1>Hello, <span className={styles.userName}>{user?.name?.split(' ')[0]}</span></h1>
                <p className={styles.currentDate}>{formatDate(new Date())}</p>
            </div>
            <div
                className={styles.headerProfile}
                onClick={onProfileClick}
                role="button"
                tabIndex={0}
            >
                <img
                    src={user?.gender === 'FEMALE'
                        ? '/images/default_female_user_profile_pic.jpg'
                        : '/images/default_male_user_profile_pic.jpg'}
                    alt="profile"
                />
            </div>
        </header>
    );
};