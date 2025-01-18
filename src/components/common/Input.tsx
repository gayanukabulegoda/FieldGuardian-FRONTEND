import React, {InputHTMLAttributes} from 'react';
import styles from '../../styles/popupStyles/addEdit/addEditStaffPopup.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({icon, error, className, ...props}) => {
    return (
        <div className={styles.formGroup}>
            <input
                className={`${styles.input} ${error ? styles.error : ''} ${className || ''}`}
                {...props}
            />
            {icon && (
                <img
                    src={icon}
                    alt="input-icon"
                    className={styles.inputIcon}
                />
            )}
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};