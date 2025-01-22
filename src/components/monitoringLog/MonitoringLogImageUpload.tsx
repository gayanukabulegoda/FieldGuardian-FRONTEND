import React from 'react';
import styles from '../../styles/popupStyles/addEdit/addEditMonitoringLogPopup.module.css';

interface MonitoringImageUploadProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    preview: string;
    error?: string;
}

export const MonitoringImageUpload: React.FC<MonitoringImageUploadProps> = ({
                                                                                onChange,
                                                                                preview,
                                                                                error
                                                                            }) => {
    return (
        <div className={styles.imageUploadContainer}>
            <input
                type="file"
                id="monitoringImage"
                accept=".png,.jpg,.jpeg"
                className={styles.fileInput}
                onChange={onChange}
            />
            <div className={`${styles.uploadArea} ${error ? styles.error : ''}`}>
                <div className={styles.uploadContent}>
                    <img
                        src="/public/icons/add-image-icon.svg"
                        alt="add-image"
                        className={styles.uploadIcon}
                    />
                    <p className={styles.uploadText}>Select your file</p>
                    <p className={styles.uploadSubtext}>png, jpg, jpeg accepted</p>
                    <p className={styles.uploadSize}>(Maximum file size : 10MB)</p>
                </div>
                {preview && (
                    <div className={styles.previewContainer}>
                        <img src={preview} alt="preview"/>
                    </div>
                )}
            </div>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};