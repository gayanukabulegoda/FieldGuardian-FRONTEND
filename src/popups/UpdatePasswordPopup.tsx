import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Eye, EyeOff} from 'lucide-react';
import {RootState} from '../store/store.ts';
import {validatePassword} from '../utils/validation.ts';
import userService from '../services/userService.ts';
import {PopupHeader} from "../components/common/PopupHeader.tsx";
import {ActionButton} from "../components/common/ActionButton.tsx";
import styles from '../styles/popupStyles/updatePasswordPopup.module.css';

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const UpdatePasswordPopup = ({isOpen, onClose}: PasswordModalProps) => {
    const {currentUser} = useSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePassword(formData.password)) {
            alert('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await userService.updateUser({
                email: currentUser?.email || '',
                password: formData.password
            });
            alert('Password updated successfully');
            onClose();
        } catch {
            alert('Failed to update password. Please try again.');
        }
    };

    return (
        <div className={styles.updatePasswordPopup}>
            <PopupHeader
                title="Update Password"
                variant="primary"
                icon="/public/icons/settings-icon-green.svg"
                onClose={onClose}
            />
            <div className={styles.popupContent}>
                <div className={styles.profileCard}>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileImage}>
                            <img
                                src={currentUser?.gender === 'FEMALE'
                                    ? '/images/default_female_user_profile_pic.jpg'
                                    : '/images/default_male_user_profile_pic.jpg'}
                                alt="Profile"
                                className={styles.roundedCircle}
                            />
                        </div>
                        <h2 className={styles.profileName}>{currentUser?.name}</h2>
                        <p className={styles.profileEmail}>{currentUser?.email}</p>
                    </div>
                    <form className={styles.passwordForm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={styles.formControl}
                                placeholder="New Password"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword
                                    ? <EyeOff size={20} style={{color: 'var(--primary-green)'}}/>
                                    : <Eye size={20} style={{color: 'var(--primary-green)'}}/>
                                }
                            </button>
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className={styles.formControl}
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData(prev => ({...prev, confirmPassword: e.target.value}))}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword
                                    ? <EyeOff size={20} style={{color: 'var(--primary-green)'}}/>
                                    : <Eye size={20} style={{color: 'var(--primary-green)'}}/>
                                }
                            </button>
                        </div>
                        <ActionButton type="submit" variant='success'>UPDATE PASSWORD</ActionButton>
                    </form>
                </div>
            </div>
        </div>
    );
};