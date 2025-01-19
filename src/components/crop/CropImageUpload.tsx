import React from 'react';
import styles from '../../styles/popupStyles/addEdit/addEditCropPopup.module.css';

interface CropImageUploadProps {
    id: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    preview: string;
}

export const CropImageUpload: React.FC<CropImageUploadProps> = ({id, onChange, preview}) => {
    return (
        <div className={styles.imageUploadContainer}>
            <input
                type="file"
                id={id}
                accept=".png,.jpg,.jpeg"
                className={styles.fileInput}
                onChange={onChange}
            />
            <div className={styles.uploadArea}>
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
        </div>
    );
};