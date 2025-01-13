import React from 'react';
import {AuthLink} from './AuthLink';

interface AuthPromptProps {
    text: string;
    linkText: string;
    linkTo: string;
}

export const AuthPrompt: React.FC<AuthPromptProps> = ({
                                                          text,
                                                          linkText,
                                                          linkTo,
                                                      }) => {
    return (
        <div className="signup-prompt">
            <span>{text}</span>
            <AuthLink to={linkTo}>{linkText}</AuthLink>
        </div>
    );
};