import React, {forwardRef} from 'react';
import {Eye, EyeOff} from 'lucide-react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isPassword?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({isPassword, showPassword, onTogglePassword, className = '', ...props}, ref) => {
        const baseClassName = 'auth-form-control mb-3';
        const combinedClassName = `${baseClassName} ${className}`.trim();

        return (
            <div className={isPassword ? 'password-group' : ''}>
                <input
                    ref={ref}
                    type={isPassword ? (showPassword ? 'text' : 'password') : props.type}
                    className={combinedClassName}
                    {...props}
                />
                {isPassword && (
                    <span
                        className="auth-password-toggle"
                        onClick={onTogglePassword}
                        role="button"
                        tabIndex={0}
                    >
            {showPassword ? (
                <EyeOff size={20} style={{color: 'var(--primary-green)'}}/>
            ) : (
                <Eye size={20} style={{color: 'var(--primary-green)'}}/>
            )}
          </span>
                )}
            </div>
        );
    }
);