import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {requestOtp} from '../../store/slices/authSlice.ts';
import type {AppDispatch, RootState} from '../../store/store.ts';
import authService from '../../services/authService.ts';
import userService from "../../services/userService.ts";
import {AuthLayout} from '../../components/auth/AuthLayout.tsx';
import {OtpInput} from '../../components/auth/OtpInput.tsx';
import {AuthButton} from '../../components/auth/AuthButton.tsx';
import {AuthPrompt} from '../../components/auth/AuthPrompt.tsx';
import '../../styles/authStyles/otpVerificationPage.css';

export const OtpVerificationPage = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resendTimer, setResendTimer] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const email = useSelector((state: RootState) => state.auth.email);

    useEffect(() => {
        const userSignUpRequestDTO = localStorage.getItem('userSignUpRequestDTO');
        const resetPasswordRequestDTO = localStorage.getItem('resetPasswordRequestDTO');

        if (userSignUpRequestDTO) {
            const {email} = JSON.parse(userSignUpRequestDTO);
            dispatch(requestOtp({option: 0, email}));
        } else if (resetPasswordRequestDTO) {
            const {email} = JSON.parse(resetPasswordRequestDTO);
            dispatch(requestOtp({option: 1, email}));
        } else {
            navigate('/signin');
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [resendTimer]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setError('Please enter a complete 6-digit OTP');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const userSignUpRequestDTO = localStorage.getItem('userSignUpRequestDTO');
            const resetPasswordRequestDTO = localStorage.getItem('resetPasswordRequestDTO');

            if (userSignUpRequestDTO) {
                const data = JSON.parse(userSignUpRequestDTO);
                const response = await authService.signUp({...data, otp});
                document.cookie = `token=${response.token}; path=/`;
                localStorage.removeItem('userSignUpRequestDTO');
                navigate('/home');
            } else if (resetPasswordRequestDTO) {
                const data = JSON.parse(resetPasswordRequestDTO);
                await userService.updateUser({...data, otp});
                localStorage.removeItem('resetPasswordRequestDTO');
                navigate('/signin');
            }
        } catch {
            setError('Invalid OTP. Please try again.');
            setOtp('');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0 || !email) return;

        try {
            const userSignUpRequestDTO = localStorage.getItem('userSignUpRequestDTO');
            const option = userSignUpRequestDTO ? 0 : 1;
            await dispatch(requestOtp({option, email})).unwrap();
            setResendTimer(30);
        } catch {
            setError('Failed to resend OTP. Please try again.');
        }
    };

    return (
        <AuthLayout subtitle="Enter the OTP to verify your access and secure your field management data.">
            <form className="otp-form" onSubmit={handleSubmit}>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    length={6}
                />

                <div className="text-center mt-4">
                    <button
                        type="button"
                        className="resend-link"
                        onClick={handleResend}
                        disabled={resendTimer > 0}
                    >
                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend'}
                    </button>
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </div>
                )}

                <AuthButton type="submit" isLoading={loading}>
                    VERIFY
                </AuthButton>
            </form>

            <AuthPrompt
                text="Already verified?"
                linkText="Sign In Now"
                linkTo="/signin"
            />
        </AuthLayout>
    );
};