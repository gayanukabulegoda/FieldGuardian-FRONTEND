import React, {useRef} from 'react';
import styles from '../../styles/common/imageUpload.module.css';

interface ImageUploadProps {
    id: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    preview: string;
    error?: string;
    maxSize?: number; // in MB
    variant?: 'primary' | 'crop' | 'field' | 'log';
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
                                                            id,
                                                            onChange,
                                                            preview,
                                                            error,
                                                            maxSize = 10,
                                                            variant = 'primary'
                                                        }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getUploadContainerClass = () => {
        switch (variant) {
            case 'primary':
                return styles.imageUploadContainer;
            case 'log':
                return styles.imageUploadContainerLog;
            default:
                return styles.imageUploadContainer;
        }
    }

    const getUploadAreaClass = () => {
        switch (variant) {
            case 'primary':
                return styles.uploadArea;
            case 'crop':
                return `${styles.uploadArea} ${styles.uploadAreaCrop}`;
            case 'field':
                return `${styles.uploadArea} ${styles.uploadAreaField}`;
            default:
                return styles.uploadArea;
        }
    }

    const getUploadContentClass = () => {
        switch (variant) {
            case 'primary':
                return styles.uploadContent;
            case 'field':
                return `${styles.uploadContent} ${styles.uploadContentField}`;
            default:
                return styles.uploadContent;
        }
    }

    const handlePreviewClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <div className={`${getUploadContainerClass()}`}>
            <input
                type="file"
                id={id}
                accept=".png,.jpg,.jpeg"
                className={styles.fileInput}
                onChange={onChange}
                ref={fileInputRef}
            />
            <div className={`${getUploadAreaClass()} ${error ? styles.error : ''}`} onClick={handlePreviewClick}>
                <div className={`${getUploadContentClass()}`}>
                    <img
                        src="/icons/add-image-icon.svg"
                        alt="add-image"
                        className={styles.uploadIcon}
                    />
                    <p className={styles.uploadText}>Select your file</p>
                    <p className={styles.uploadSubtext}>png, jpg, jpeg accepted</p>
                    <p className={styles.uploadSize}>{`(Maximum file size : ${maxSize}MB)`}</p>
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