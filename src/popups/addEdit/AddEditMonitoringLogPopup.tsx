import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/store';
import {addMonitoringLog, updateMonitoringLog} from '../../store/slices/monitoringLogSlice';
import {MonitoringLogDTO, MonitoringLog} from '../../types/monitoringLog';
import {Field} from '../../types/field';
import {Staff} from '../../types/staff';
import {Crop} from '../../types/crop';
import {Select} from '../../components/common/Select';
import {ActionButton} from '../../components/common/ActionButton';
import {PopupHeader} from '../../components/common/PopupHeader';
import {SelectionList} from '../../components/custom/SelectionList.tsx';
import {ImageUpload} from "../../components/common/ImageUpload.tsx";
import styles from '../../styles/popupStyles/addEdit/addEditMonitoringLogPopup.module.css';

interface AddEditMonitoringLogPopupProps {
    isOpen: boolean;
    onClose: () => void;
    log?: MonitoringLog;
    fields: Field[];
    staff: Staff[];
    crops: Crop[];
}

export const AddEditMonitoringLogPopup: React.FC<AddEditMonitoringLogPopupProps> = ({
                                                                                        isOpen,
                                                                                        onClose,
                                                                                        log,
                                                                                        fields,
                                                                                        staff,
                                                                                        crops
                                                                                    }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<MonitoringLogDTO>({
        fieldCode: '',
        details: '',
        staffIds: [],
        cropIds: [],
    });
    const [previewImage, setPreviewImage] = useState<string>('');
    const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
    const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
    const [errors, setErrors] = useState<Partial<Record<keyof MonitoringLogDTO, string>>>({});
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        if (log) {
            setFormData({
                fieldCode: log.fieldCode,
                details: log.details || '',
                staffIds: [],
                cropIds: [],
            });
            if (log.observedImage) {
                setPreviewImage(log.observedImage);
            }
            setCharCount(log.details?.length || 0);
        }
    }, [log]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setErrors(prev => ({...prev, observedImage: 'File size must be less than 10MB'}));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                setFormData(prev => ({...prev, observedImage: file}));
                setErrors(prev => ({...prev, observedImage: undefined}));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof MonitoringLogDTO, string>> = {};

        if (!formData.fieldCode) newErrors.fieldCode = 'Field is required';
        if (!formData.details) newErrors.details = 'Details are required';
        if (!formData.observedImage && !log) newErrors.observedImage = 'Image is required';
        if (selectedStaff.length === 0) newErrors.staffIds = 'At least one staff member is required';
        if (selectedCrops.length === 0) newErrors.cropIds = 'At least one crop is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const submitData = {
            ...formData,
            staffIds: selectedStaff,
            cropIds: selectedCrops,
        };

        try {
            if (log) {
                await dispatch(updateMonitoringLog({
                    id: log.code,
                    monitoringLogDTO: submitData
                })).unwrap();
            } else {
                await dispatch(addMonitoringLog(submitData)).unwrap();
            }
            onClose();
        } catch (error) {
            console.error('Error saving monitoring log:', error);
            alert('Failed to save monitoring log');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.addMonitoringPopup} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                <PopupHeader
                    title={log ? 'Update Monitoring Log' : 'Add Monitoring Log'}
                    variant="primary"
                    icon="/public/icons/monitoring-log-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <form onSubmit={handleSubmit} className={styles.monitoringForm}>
                        <div className={styles.formContainer}>
                            <div className={styles.formFields}>
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
                                        <option value="" disabled selected hidden>Select Field</option>
                                    </Select>
                                </div>
                                <div className={styles.formGroup}>
                                    <textarea
                                        placeholder="Add your observation..."
                                        value={formData.details}
                                        onChange={e => {
                                            const text = e.target.value;
                                            if (text.length <= 400) {
                                                setFormData(prev => ({...prev, details: text}));
                                                setCharCount(text.length);
                                            }
                                        }}
                                        maxLength={400}
                                        className={errors.details ? styles.error : ''}
                                    />
                                    <div className={styles.charCount}>
                                        <span>{charCount}</span>/400
                                    </div>
                                    {errors.details && (
                                        <span className={styles.errorMessage}>{errors.details}</span>
                                    )}
                                </div>
                                <ImageUpload
                                    id="monitoringImage"
                                    onChange={handleImageChange}
                                    preview={previewImage}
                                    error={errors.observedImage}
                                    variant="log"
                                />
                            </div>
                            <div className={styles.selectionFields}>
                                <SelectionList
                                    title="Select Staff"
                                    items={staff.map(s => ({
                                        id: s.id,
                                        name: `${s.firstName} ${s.lastName}`,
                                        detail: s.contactNo
                                    }))}
                                    selectedIds={selectedStaff}
                                    onSelect={id => setSelectedStaff(prev =>
                                        prev.includes(id)
                                            ? prev.filter(i => i !== id)
                                            : [...prev, id]
                                    )}
                                />
                                {errors.staffIds && (
                                    <span className={styles.errorMessage}>{errors.staffIds}</span>
                                )}
                                <SelectionList
                                    title="Select Crops"
                                    items={crops.map(crop => ({
                                        id: crop.code,
                                        name: crop.commonName,
                                        detail: crop.scientificName
                                    }))}
                                    selectedIds={selectedCrops}
                                    onSelect={id => setSelectedCrops(prev =>
                                        prev.includes(id)
                                            ? prev.filter(i => i !== id)
                                            : [...prev, id]
                                    )}
                                />
                                {errors.cropIds && (
                                    <span className={styles.errorMessage}>{errors.cropIds}</span>
                                )}
                            </div>
                        </div>
                        <div className={styles.saveBtnContainer}>
                            <ActionButton type="submit">
                                {log ? 'UPDATE' : 'SAVE'}
                            </ActionButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};