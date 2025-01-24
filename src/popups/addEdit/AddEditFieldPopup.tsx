import React, {useState, useEffect} from 'react';
import {Field, FieldDTO, FieldStaff, FieldEquipment} from '../../types/field.ts';
import {Input} from '../../components/common/Input.tsx';
import {ActionButton} from "../../components/common/ActionButton.tsx";
import {PopupHeader} from '../../components/common/PopupHeader.tsx';
import {SelectionList} from '../../components/custom/SelectionList.tsx';
import {ImageUpload} from "../../components/common/ImageUpload.tsx";
import styles from '../../styles/popupStyles/addEdit/addEditFieldPopup.module.css';

interface AddEditFieldPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (fieldData: FieldDTO) => void;
    field?: Field;
    staffMembers?: FieldStaff[];
    equipment?: FieldEquipment[];
}

export const AddEditFieldPopup: React.FC<AddEditFieldPopupProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                        onSave,
                                                                        field,
                                                                        staffMembers = [],
                                                                        equipment = []
                                                                    }) => {
    const [formData, setFormData] = useState<FieldDTO>({
        name: '',
        location: '',
        extentSize: 0,
    });
    const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [previewImage1, setPreviewImage1] = useState<string>('');
    const [previewImage2, setPreviewImage2] = useState<string>('');

    useEffect(() => {
        if (field) {
            setFormData({
                name: field.name,
                location: field.location,
                extentSize: field.extentSize,
            });
            if (field.fieldImage1) {
                // setPreviewImage1(`data:image/jpeg;base64,${field.fieldImage1}`);
                setPreviewImage1(field.fieldImage1);
            }
            if (field.fieldImage2) {
                // setPreviewImage2(`data:image/jpeg;base64,${field.fieldImage2}`);
                setPreviewImage2(field.fieldImage2);
            }
        }
    }, [field]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, imageNumber: 1 | 2) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (imageNumber === 1) {
                    setPreviewImage1(reader.result as string);
                    setFormData(prev => ({...prev, fieldImage1: file}));
                } else {
                    setPreviewImage2(reader.result as string);
                    setFormData(prev => ({...prev, fieldImage2: file}));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({...formData, staffIds: selectedStaff, equipmentIds: selectedEquipment});
    };

    if (!isOpen) return null;

    return (
        <div className={styles.addFieldPopup} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                <PopupHeader
                    title={field ? 'Update Field' : 'Add Field'}
                    variant="primary"
                    icon="/public/icons/field-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <form onSubmit={handleSubmit} className={styles.fieldForm}>
                        <div className={styles.formContainer}>
                            <div className={styles.formFields}>
                                <div className="form-group">
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <Input
                                        type="number"
                                        placeholder="Extent size (sq. m)"
                                        value={formData.extentSize}
                                        onChange={e => setFormData(prev => ({
                                            ...prev,
                                            extentSize: parseFloat(e.target.value)
                                        }))}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <Input
                                        type="text"
                                        placeholder="Location (Paste google map url)"
                                        value={formData.location}
                                        onChange={e => setFormData(prev => ({...prev, location: e.target.value}))}
                                        required
                                    />
                                </div>
                                <div className={styles.imageUploadSection}>
                                    <ImageUpload
                                        id="fieldImage1"
                                        onChange={e => handleImageChange(e, 1)}
                                        preview={previewImage1}
                                        variant="field"
                                    />
                                    <ImageUpload
                                        id="fieldImage2"
                                        onChange={e => handleImageChange(e, 2)}
                                        preview={previewImage2}
                                        variant="field"
                                    />
                                </div>
                            </div>
                            <div className={styles.selectionFields}>
                                <SelectionList
                                    title="Select Staff (Optional)"
                                    items={staffMembers.map(staff => ({
                                        id: staff.id,
                                        name: `${staff.firstName} ${staff.lastName}`,
                                        detail: staff.contactNo
                                    }))}
                                    selectedIds={selectedStaff}
                                    onSelect={id => setSelectedStaff(prev =>
                                        prev.includes(id)
                                            ? prev.filter(i => i !== id)
                                            : [...prev, id]
                                    )}
                                />
                                <SelectionList
                                    title="Select Equipment (Optional)"
                                    items={equipment.map(eq => ({
                                        id: eq.id,
                                        name: eq.name,
                                        detail: eq.type
                                    }))}
                                    selectedIds={selectedEquipment}
                                    onSelect={id => setSelectedEquipment(prev =>
                                        prev.includes(id)
                                            ? prev.filter(i => i !== id)
                                            : [...prev, id]
                                    )}
                                />
                            </div>
                        </div>
                        <div className={styles.saveBtnContainer}>
                            <ActionButton type="submit">
                                {field ? 'UPDATE' : 'SAVE'}
                            </ActionButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};