import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setEmail} from '../store/slices/authSlice';
import {AuthLayout} from '../components/auth/AuthLayout';
import {AuthInput} from '../components/auth/AuthInput';
import {AuthButton} from '../components/auth/AuthButton';
import {AuthPrompt} from '../components/auth/AuthPrompt';
import '../styles/authStyles/forgotPasswordPage.css';

export const ForgotPasswordPage = () => {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validatePassword = (password: string) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers &&
            hasSpecialChar
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const {newPassword, confirmPassword} = formData;
        const email = localStorage.getItem('email');

        if (!email) {
            setError('Email not found. Please try again.');
            return;
        }

        if (!validatePassword(newPassword)) {
            setError(
                'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.'
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            dispatch(setEmail(email));
            localStorage.setItem(
                'resetPasswordRequestDTO',
                JSON.stringify({email, password: newPassword})
            );
            navigate('/otpverification');
        } catch {
            setError('Failed to process password reset. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout subtitle="Reset your password to regain access to field insights and resource management.">
            <form className="reset-form" onSubmit={handleSubmit}>
                <AuthInput
                    isPassword
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData(prev => ({...prev, newPassword: e.target.value}))}
                    showPassword={showNewPassword}
                    onTogglePassword={() => setShowNewPassword(!showNewPassword)}
                    required
                />

                <AuthInput
                    isPassword
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({...prev, confirmPassword: e.target.value}))}
                    showPassword={showConfirmPassword}
                    onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    required
                />

                {error && (
                    <div className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </div>
                )}

                <AuthButton type="submit" isLoading={loading}>
                    RESET PASSWORD
                </AuthButton>
            </form>

            <AuthPrompt
                text="Remembered your password?"
                linkText="Sign In Now"
                linkTo="/signin"
            />
        </AuthLayout>
    );
};