import React from 'react';
import {Link} from 'react-router-dom';

interface AuthLinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
}

export const AuthLink: React.FC<AuthLinkProps> = ({
                                                      to,
                                                      children,
                                                      className = '',
                                                  }) => {
    const baseClassName = 'auth-link';
    const combinedClassName = `${baseClassName} ${className}`.trim();

    return (
        <Link to={to} className={combinedClassName}>
            {children}
        </Link>
    );
};