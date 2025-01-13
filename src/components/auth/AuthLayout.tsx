import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({children, subtitle}) => {
    return (
        <div className="body">
            <div className="background-curves">
                <div className="curve-top"></div>
                <div className="curve-bottom"></div>
            </div>

            <div className="container-fluid main-container">
                <div className="auth-container">
                    <div className="row g-0">
                        {/* Left Side - Form */}
                        <div className="col-md-6 form-side">
                            <div className="form-content">
                                <div className="logo-container">
                                    <img
                                        src="/public/images/fieldguardian-logo-green.png"
                                        alt="FieldGuardian"
                                        className="logo"
                                    />
                                </div>
                                <p className="auth-subtitle">{subtitle}</p>
                                {children}
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
                                    Welcome to FieldGuardian – your complete solution for crop and
                                    resource management
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};