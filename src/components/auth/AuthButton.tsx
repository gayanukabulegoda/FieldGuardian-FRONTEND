import React from 'react';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
                                                          children,
                                                          isLoading,
                                                          className = '',
                                                          ...props
                                                      }) => {
    const baseClassName = 'btn-auth';
    const combinedClassName = `${baseClassName} ${className}`.trim();

    return (
        <button
            className={combinedClassName}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
};