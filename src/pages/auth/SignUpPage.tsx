import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setEmail} from '../../store/slices/authSlice.ts';
import {AuthLayout} from '../../components/auth/AuthLayout.tsx';
import {AuthInput} from '../../components/auth/AuthInput.tsx';
import {AuthButton} from '../../components/auth/AuthButton.tsx';
import {AuthPrompt} from '../../components/auth/AuthPrompt.tsx';
import {validateEmail, validatePassword} from "../../utils/validation.ts";
import '../../styles/authStyles/signUpPage.css';

export const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const {email, password, confirmPassword} = formData;

        // Email validation
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Password validation
        if (!validatePassword(password)) {
            setError(
                'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.'
            );
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            dispatch(setEmail(email));
            localStorage.setItem('userSignUpRequestDTO', JSON.stringify({email, password}));
            navigate('/otpverification');
        } catch (err) {
            setError('Failed to process signup. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout subtitle="Sign up to streamline crop management and enhance field productivity.">
            <form className="signup-form" onSubmit={handleSubmit}>
                <AuthInput
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    required
                />

                <AuthInput
                    isPassword
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
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
                    SIGN UP
                </AuthButton>
            </form>

            <AuthPrompt
                text="Already have an account?"
                linkText="Sign In Now"
                linkTo="/signin"
            />
        </AuthLayout>
    );
};