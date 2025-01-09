import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../store/slices/authSlice';
import type {AppDispatch, RootState} from '../store/store';
import {authService} from '../services/authService';
import '../styles/authStyles/signInPage.css';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {loading, error} = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        if (token) {
            authService.validateUser(token)
                .then((isValid) => {
                    if (isValid) {
                        navigate('/home');
                    }
                })
                .catch(console.error);
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(signIn({email, password})).unwrap();
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
            localStorage.setItem('email', JSON.stringify(email));
            navigate('/forgot-password');
        }
    };

    return (
        <div className="body">
            <div className="background-curves">
                <div className="curve-top"></div>
                <div className="curve-bottom"></div>
            </div>

            <div className="container-fluid main-container">
                <div className="auth-container">
                    <div className="row g-0">
                        {/* Left Side - Sign In Form */}
                        <div className="col-md-6 form-side">
                            <div className="form-content">
                                <div className="logo-container">
                                    <img
                                        src="/public/images/fieldguardian-logo-green.png"
                                        alt="FieldGuardian"
                                        className="logo"
                                    />
                                </div>
                                <p className="signin-subtitle">
                                    Sign in to stay updated on field insights and manage resources
                                    with ease.
                                </p>

                                <form className="login-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="signin-form-control mb-2"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>

                                    <div className="form-group password-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="signin-form-control"
                                            placeholder="Password"
                                            required
                                        />
                                        <span className="password-toggle">
                                             <img
                                                 src="/public/icons/password-eye-close.svg"
                                                 alt="Toggle password"
                                             />
                                        </span>
                                    </div>

                                    <div className="text-end">
                                        <a
                                            onClick={handleForgotPassword}
                                            className="forgot-password"
                                            id="forgot-password-link"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-signin"
                                    >
                                        {loading ? 'Signing in...' : 'SIGN IN'}
                                    </button>
                                </form>

                                <div className="signup-prompt">
                                    <span>Don't have an account? </span>
                                    <a href="/signup" className="signup-link">
                                        Sign Up Now
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Welcome Banner */}
                        <div className="col-md-6 banner-side">
                            <div className="banner-content">
                                <img
                                    src="/public/images/fieldguardian-logo-white.png"
                                    alt="FieldGuardian"
                                    className="logo-white"
                                />
                                <h1>
                                    Welcome to FieldGuardian – your complete solution for crop and resource management
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;