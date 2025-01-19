import React, {ButtonHTMLAttributes} from 'react';
import styles from '../../styles/common/actionButton.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

export const ActionButton: React.FC<ButtonProps> = ({
                                                        variant = 'primary',
                                                        className,
                                                        children,
                                                        ...props
                                                    }) => {
    const getButtonClass = () => {
        switch (variant) {
            case 'primary':
                return styles.saveBtn;
            case 'secondary':
                return styles.closeButton;
            case 'danger':
                return styles.confirmBtn;
            case 'success':
                return styles.updateBtn;
            default:
                return styles.saveBtn;
        }
    };

    return (
        <button
            className={`${getButtonClass()} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};