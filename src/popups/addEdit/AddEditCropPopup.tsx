import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/store.ts';
import {addCrop, updateCrop} from '../../store/slices/cropSlice.ts';
import {Crop, CropDTO, CropCategory, Season} from '../../types/crop.ts';
import {Field} from '../../types/field.ts';
import {Input} from '../../components/common/Input.tsx';
import {Select} from '../../components/common/Select.tsx';
import {ActionButton} from '../../components/common/ActionButton.tsx';
import {PopupHeader} from '../../components/common/PopupHeader.tsx';
import {ImageUpload} from "../../components/common/ImageUpload.tsx";
import styles from '../../styles/popupStyles/addEdit/addEditCropPopup.module.css';

interface AddEditCropPopupProps {
    isOpen: boolean;
    onClose: () => void;
    crop?: Crop;
    fields: Field[];
}

const CATEGORIES: { value: CropCategory; label: string }[] = [
    {value: 'VEGETABLE', label: 'Vegetable'},
    {value: 'FRUIT', label: 'Fruit'},
    {value: 'GRAIN', label: 'Grain'},
    {value: 'HERB', label: 'Herb'},
    {value: 'OTHER', label: 'Other'}
];

const SEASONS: { value: Season; label: string }[] = [
    {value: 'SPRING', label: 'Spring'},
    {value: 'SUMMER', label: 'Summer'},
    {value: 'AUTUMN', label: 'Autumn'},
    {value: 'WINTER', label: 'Winter'},
    {value: 'ALL', label: 'All Seasons'}
];

export const AddEditCropPopup: React.FC<AddEditCropPopupProps> = ({
                                                                      isOpen,
                                                                      onClose,
                                                                      crop,
                                                                      fields
                                                                  }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<CropDTO>({
        commonName: '',
        scientificName: '',
        category: 'VEGETABLE',
        season: 'SPRING',
        fieldCode: '',
    });
    const [previewImage, setPreviewImage] = useState<string>('');
    const [errors, setErrors] = useState<Partial<Record<keyof CropDTO, string>>>({});

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
                setPreviewImage(crop.cropImage);
            }
        }
    }, [crop]);

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof CropDTO, string>> = {};

        if (!formData.commonName) newErrors.commonName = 'Common name is required';
        if (!formData.scientificName) newErrors.scientificName = 'Scientific name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.season) newErrors.season = 'Season is required';
        if (!formData.fieldCode) newErrors.fieldCode = 'Field is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setErrors(prev => ({...prev, cropImage: 'File size must be less than 10MB'}));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                setFormData(prev => ({...prev, cropImage: file}));
                setErrors(prev => ({...prev, cropImage: undefined}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (crop) {
                await dispatch(updateCrop({id: crop.code, cropDTO: formData})).unwrap();
            } else {
                await dispatch(addCrop(formData)).unwrap();
            }
            onClose();
        } catch (error) {
            console.error('Error saving crop:', error);
            alert('Failed to save crop');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.addCropPopup} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                <PopupHeader
                    title={crop ? 'Update Crop' : 'Add Crop'}
                    variant="primary"
                    icon="/public/icons/crop-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <form onSubmit={handleSubmit} className={styles.cropForm}>
                        <div className={styles.formContainer}>
                            <div className={styles.formFields}>
                                <div className={styles.formGroup}>
                                    <Input
                                        type="text"
                                        placeholder="Common name"
                                        value={formData.commonName}
                                        onChange={e => setFormData(prev => ({
                                            ...prev,
                                            commonName: e.target.value
                                        }))}
                                        error={errors.commonName}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <Input
                                        type="text"
                                        placeholder="Scientific name"
                                        value={formData.scientificName}
                                        onChange={e => setFormData(prev => ({
                                            ...prev,
                                            scientificName: e.target.value
                                        }))}
                                        error={errors.scientificName}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <Select
                                        value={formData.category}
                                        onChange={e => setFormData(prev => ({
                                            ...prev,
                                            category: e.target.value as CropCategory
                                        }))}
                                        options={CATEGORIES}
                                        error={errors.category}
                                    >
                                        <option value="" disabled hidden>Select Category</option>
                                    </Select>
                                </div>
                                <div className={styles.formGroup}>
                                    <Select
                                        value={formData.season}
                                        onChange={e => setFormData(prev => ({
                                            ...prev,
                                            season: e.target.value as Season
                                        }))}
                                        options={SEASONS}
                                        error={errors.season}
                                    >
                                        <option value="" disabled hidden>Select Season</option>
                                    </Select>
                                </div>
                                <div className={styles.formGroup}>
                                    <Select
                                        value={formData.fieldCode}
                                        onChange={e => setFormData(prev => ({
                                            ...prev,
                                            fieldCode: e.target.value
                                        }))}
                                        options={fields.map(field => ({
                                            value: field.code,
                                            label: field.name
                                        }))}
                                        error={errors.fieldCode}
                                    >
                                        <option value="" disabled hidden>Select Field</option>
                                    </Select>
                                </div>
                            </div>
                            <ImageUpload
                                id="cropImage"
                                onChange={handleImageChange}
                                preview={previewImage}
                                error={errors.cropImage}
                                variant="crop"
                            />
                        </div>
                        <div className={styles.saveBtnContainer}>
                            <ActionButton type="submit">
                                {crop ? 'UPDATE' : 'SAVE'}
                            </ActionButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};