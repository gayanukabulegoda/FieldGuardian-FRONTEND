import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Eye, EyeOff} from 'lucide-react';
import {RootState} from '../store/store';
import {validatePassword} from '../utils/validation';
import userService from '../services/userService';
import {PopupHeader} from '../components/common/PopupHeader';
import {ActionButton} from '../components/common/ActionButton';
import {Input} from '../components/common/Input';
import {ProfileImage} from '../components/custom/ProfileImage.tsx';
import styles from '../styles/popupStyles/updatePasswordPopup.module.css';

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface PasswordForm {
    password: string;
    confirmPassword: string;
}

export const UpdatePasswordPopup: React.FC<PasswordModalProps> = ({isOpen, onClose}) => {
    const {currentUser} = useSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState<PasswordForm>({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof PasswordForm, string>>>({});

    if (!isOpen || !currentUser) return null;

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof PasswordForm, string>> = {};

        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters and contain uppercase, lowercase, numbers, and special characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await userService.updateUser({
                email: currentUser.email,
                password: formData.password
            });
            alert('Password updated successfully');
            onClose();
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Failed to update password');
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
                        <ProfileImage gender={currentUser.gender} size="medium"/>
                        <h2 className={styles.profileName}>{currentUser.name}</h2>
                        <p className={styles.profileEmail}>{currentUser.email}</p>
                    </div>
                    <form className={styles.passwordForm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    password: e.target.value
                                }))}
                                error={errors.password}
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
                            <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    confirmPassword: e.target.value
                                }))}
                                error={errors.confirmPassword}
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
                        <ActionButton type="submit" variant="success">
                            UPDATE PASSWORD
                        </ActionButton>
                    </form>
                </div>
            </div>
        </div>
    );
};