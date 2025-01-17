import {useState, useEffect} from 'react';
import {Crop, CropDTO, CropCategory, Season} from '../../types/crop';
import {Field} from '../../types/field';
import styles from '../../styles/sectionStyles/cropSection.module.css';

interface AddEditCropPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (cropData: CropDTO) => void;
    crop?: Crop;
    fields: Field[];
}

export const AddEditCropPopup = ({
                                     isOpen,
                                     onClose,
                                     onSave,
                                     crop,
                                     fields
                                 }: AddEditCropPopupProps) => {
    const [formData, setFormData] = useState<CropDTO>({
        commonName: '',
        scientificName: '',
        category: 'VEGETABLE',
        season: 'SPRING',
        fieldCode: '',
    });
    const [previewImage, setPreviewImage] = useState<string>('');

    useEffect(() => {
        if (crop) {
            setFormData({
                commonName: crop.commonName,
                scientificName: crop.scientificName,
                category: crop.category,
                season: crop.season,
                fieldCode: crop.fieldCode,
            });
            if (crop.cropImage) {
                setPreviewImage(`data:image/jpeg;base64,${crop.cropImage}`);
            }
        }
    }, [crop]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                setFormData(prev => ({...prev, cropImage: file}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.popup} onClick={onClose}>
            <div className={styles.popupContent} onClick={handleContentClick}>
                <div className={styles.popupHeader}>
                    <h2>{crop ? 'Update Crop' : 'Add Crop'}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                placeholder="Common Name"
                                value={formData.commonName}
                                onChange={e => setFormData(prev => ({...prev, commonName: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                placeholder="Scientific Name"
                                value={formData.scientificName}
                                onChange={e => setFormData(prev => ({...prev, scientificName: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <select
                                value={formData.category}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    category: e.target.value as CropCategory
                                }))}
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="VEGETABLE">Vegetable</option>
                                <option value="FRUIT">Fruit</option>
                                <option value="GRAIN">Grain</option>
                                <option value="HERB">Herb</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <select
                                value={formData.season}
                                onChange={e => setFormData(prev => ({...prev, season: e.target.value as Season}))}
                                required
                            >
                                <option value="" disabled>Select Season</option>
                                <option value="SPRING">Spring</option>
                                <option value="SUMMER">Summer</option>
                                <option value="AUTUMN">Autumn</option>
                                <option value="WINTER">Winter</option>
                                <option value="ALL">All Seasons</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <select
                                value={formData.fieldCode}
                                onChange={e => setFormData(prev => ({...prev, fieldCode: e.target.value}))}
                                required
                            >
                                <option value="" disabled>Select Field</option>
                                {fields.map(field => (
                                    <option key={field.code} value={field.code}>
                                        {field.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.imageUploadContainer}>
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg"
                                onChange={handleImageChange}
                            />
                            {previewImage && (
                                <img src={previewImage} alt="Preview" className={styles.imagePreview}/>
                            )}
                        </div>
                    </div>
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.submitBtn}>
                            {crop ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};