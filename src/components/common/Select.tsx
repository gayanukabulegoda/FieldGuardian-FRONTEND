import React, {SelectHTMLAttributes} from 'react';
import styles from '../../styles/popupStyles/addEdit/addEditStaffPopup.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: Array<{ value: string; label: string; }>;
    error?: string;
}

export const Select: React.FC<SelectProps> = ({options, error, className, children, ...props}) => {
    return (
        <div className={styles.formGroup}>
            <select
                className={`${styles.select} ${error ? styles.error : ''} ${className || ''}`}
                {...props}
            >
                {children}
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <img
                src="/public/icons/drop-down-icon.svg"
                alt="dropdown"
                className={styles.inputIcon}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};