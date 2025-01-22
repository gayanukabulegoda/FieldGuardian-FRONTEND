import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import {Navigation} from '../components/navigation/Navigation';
import {Header} from '../components/layout/Header';
import {MyProfilePopup} from '../popups/MyProfilePopup';
import {UpdatePasswordPopup} from '../popups/UpdatePasswordPopup';
import {validateToken} from '../store/slices/authSlice';
import {setCurrentUser} from '../store/slices/userSlice';
import userService from '../services/userService';
import {AppDispatch} from "../store/store.ts";
import {Portal} from "../components/portal/Portal.ts";
import styles from '../styles/homePage.module.css';

export const HomePage = () => {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // If we're at the root path, redirect to dashboard
        if (location.pathname === '/') {
            navigate('/dashboard');
        }
    }, [location.pathname, navigate]);

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
                    navigate('/signin');
                }
            } else {
                // navigate('/signin');
            }
        };

        initializeUser();
    }, [dispatch, navigate]);

    return (
        <div className={styles.homeBody}>
            <div
                className={`${styles.appContainer} ${showProfileModal || showPasswordModal ? styles.blurBackground : ''}`}>
                <Navigation onSettingsClick={() => setShowPasswordModal(true)}/>
                <main className={styles.mainContent}>
                    <Header onProfileClick={() => {
                        setShowProfileModal(true)
                    }}/>
                    <div className={styles.contentFrame}>
                        <Outlet/>
                    </div>
                </main>
            </div>

            <Portal>
                {showProfileModal && (
                    <div className={styles.popupContainer}>
                        <MyProfilePopup
                            isOpen={showProfileModal}
                            onClose={() => setShowProfileModal(false)}
                        />
                    </div>
                )}
            </Portal>

            <Portal>
                {showPasswordModal && (
                    <div className={styles.popupContainer}>
                        <UpdatePasswordPopup
                            isOpen={showPasswordModal}
                            onClose={() => setShowPasswordModal(false)}
                        />
                    </div>
                )}
            </Portal>
        </div>
    );
};