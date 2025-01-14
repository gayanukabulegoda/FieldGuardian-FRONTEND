import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Outlet} from 'react-router-dom';
import {Navigation} from '../components/navigation/Navigation';
import {Header} from '../components/layout/Header';
import {MyProfilePopup} from '../popups/MyProfilePopup';
import {UpdatePasswordPopup} from '../popups/UpdatePasswordPopup';
import {validateToken} from '../store/slices/authSlice';
import {setCurrentUser} from '../store/slices/userSlice';
import userService from '../services/userService';
import styles from '../styles/pageStyles/homePage.module.css';

export const HomePage = () => {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeUser = async () => {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];

            if (token) {
                try {
                    await dispatch(validateToken(token)).unwrap();
                    const email = localStorage.getItem('email');
                    if (email) {
                        const user = await userService.getUser(email);
                        dispatch(setCurrentUser(user));
                    }
                } catch (err) {
                    console.error('Error initializing user:', err);
                }
            }
        };

        initializeUser();
    }, [dispatch]);

    // Close modals when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.profile-card') && !target.closest('.header-profile')) {
                setShowProfileModal(false);
                setShowPasswordModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.homeBody}>
            <div className={styles.appContainer}>
                <Navigation/>
                <main className={styles.mainContent}>
                    <Header onProfileClick={() => setShowProfileModal(true)}/>
                    <div className={styles.contentFrame}>
                        <Outlet/>
                    </div>
                </main>

                {showProfileModal && (
                    <MyProfilePopup
                        isOpen={showProfileModal}
                        onClose={() => setShowProfileModal(false)}
                    />
                )}
                {showPasswordModal && (
                    <UpdatePasswordPopup
                        isOpen={showPasswordModal}
                        onClose={() => setShowPasswordModal(false)}
                    />
                )}
            </div>
        </div>
    );
};