import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signIn, validateToken} from '../store/slices/authSlice';
import type {AppDispatch, RootState} from '../store/store';
import {AuthLayout} from '../components/auth/AuthLayout';
import {AuthInput} from '../components/auth/AuthInput';
import {AuthButton} from '../components/auth/AuthButton';
import {AuthPrompt} from '../components/auth/AuthPrompt';
import '../styles/authStyles/signInPage.css'

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {loading, error, isAuthenticated} = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        if (token) {
            dispatch(validateToken(token));
        }
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(signIn({username: email, email, password})).unwrap();
            navigate('/home');
        } catch (err) {
            console.error('Failed to sign in:', err);
        }
    };

    const handleForgotPassword = (e: React.MouseEvent) => {
        if (!email) {
            e.preventDefault();
            alert('Please enter your email address before proceeding to forgot password.');
        } else {
            localStorage.setItem('email', email);
            navigate('/forgotpassword');
        }
    };

    return (
        <AuthLayout subtitle="Sign in to stay updated on field insights and manage resources with ease.">
            <form className="login-form" onSubmit={handleSubmit}>
                <AuthInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <AuthInput
                    isPassword
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    required
                />

                <div className="text-end">
                    <a
                        onClick={handleForgotPassword}
                        className="forgot-password"
                        role="button"
                    >
                        Forgot password?
                    </a>
                </div>

                <AuthButton type="submit" isLoading={loading}>
                    SIGN IN
                </AuthButton>

                {error && (
                    <div className="text-red-500 text-center text-sm mt-2">
                        {error}
                    </div>
                )}
            </form>

            <AuthPrompt
                text="Don't have an account?"
                linkText="Sign Up Now"
                linkTo="/signup"
            />
        </AuthLayout>
    );
};

export default SignInPage;