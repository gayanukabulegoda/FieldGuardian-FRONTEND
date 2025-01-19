import {useNavigate, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/slices/authSlice';
import {Settings, LogOut} from 'lucide-react';
import {UserProfileSection} from "./UserProfileSection";
import styles from '../../styles/homePage.module.css';

interface NavigationProps {
    onSettingsClick: () => void;
}

interface NavItem {
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    {label: 'Dashboard', path: '/dashboard'},
    {label: 'Staff', path: '/staff'},
    {label: 'Field', path: '/field'},
    {label: 'Crop', path: '/crop'},
    {label: 'Equipment', path: '/equipment'},
    {label: 'Vehicle', path: '/vehicle'},
    {label: 'Monitoring Log', path: '/monitoring'},
];

export const Navigation = ({onSettingsClick}: NavigationProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signin');
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoSection}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoBox}>
                        <img
                            src="/images/fieldguardian-logo-green.png"
                            alt="fieldguardian-logo-green"
                        />
                    </div>
                </div>
            </div>

            <nav className={styles.navMenu}>
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className={styles.userProfile}>
                <UserProfileSection/>
                <div className={styles.profileActions}>
                    <button className={styles.actionBtn} onClick={onSettingsClick}>
                        <Settings size={24} style={{color: 'var(--primary-green)'}}/>
                    </button>
                    <button className={styles.actionBtn} onClick={handleLogout}>
                        <LogOut size={24} style={{color: 'var(--primary-green)'}}/>
                    </button>
                </div>
            </div>
        </aside>
    );
};