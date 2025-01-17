import {useState, useEffect} from 'react';
import {Field, FieldDTO, FieldStaff, FieldEquipment} from '../../types/field';
import {truncateText} from '../../utils/textUtils';
import styles from '../../styles/popupStyles/fieldPopup.module.css';

interface AddEditFieldPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (fieldData: FieldDTO) => void;
    field?: Field;
    staffMembers?: FieldStaff[];
    equipment?: FieldEquipment[];
}

export const AddEditFieldPopup = ({
                                      isOpen,
                                      onClose,
                                      onSave,
                                      field,
                                      staffMembers = [],
                                      equipment = []
                                  }: AddEditFieldPopupProps) => {
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
                setPreviewImage1(`data:image/jpeg;base64,${field.fieldImage1}`);
            }
            if (field.fieldImage2) {
                setPreviewImage2(`data:image/jpeg;base64,${field.fieldImage2}`);
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
                    <h2>{field ? 'Update Field' : 'Add Field'}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                placeholder="Location (Paste google map url)"
                                value={formData.location}
                                onChange={e => setFormData(prev => ({...prev, location: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="number"
                                placeholder="Extent size (sq. m)"
                                value={formData.extentSize}
                                onChange={e => setFormData(prev => ({...prev, extentSize: Number(e.target.value)}))}
                                required
                            />
                        </div>
                        <div className={styles.imageUploadSection}>
                            <div className={styles.imageUploadContainer}>
                                <input
                                    type="file"
                                    accept=".png,.jpg,.jpeg"
                                    onChange={e => handleImageChange(e, 1)}
                                />
                                {previewImage1 && (
                                    <img src={previewImage1} alt="Preview 1" className={styles.imagePreview}/>
                                )}
                            </div>
                            <div className={styles.imageUploadContainer}>
                                <input
                                    type="file"
                                    accept=".png,.jpg,.jpeg"
                                    onChange={e => handleImageChange(e, 2)}
                                />
                                {previewImage2 && (
                                    <img src={previewImage2} alt="Preview 2" className={styles.imagePreview}/>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.selectionSection}>
                        <h3>Staff Members</h3>
                        <div className={styles.selectionGrid}>
                            {staffMembers.map(staff => (
                                <div key={staff.id} className={styles.selectionItem}>
                                    <input
                                        type="checkbox"
                                        id={`staff-${staff.id}`}
                                        checked={selectedStaff.includes(staff.id)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setSelectedStaff(prev => [...prev, staff.id]);
                                            } else {
                                                setSelectedStaff(prev => prev.filter(id => id !== staff.id));
                                            }
                                        }}
                                    />
                                    <label htmlFor={`staff-${staff.id}`}>
                                        {truncateText(`${staff.firstName} ${staff.lastName}`, 30)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.selectionSection}>
                        <h3>Equipment</h3>
                        <div className={styles.selectionGrid}>
                            {equipment.map(item => (
                                <div key={item.id} className={styles.selectionItem}>
                                    <input
                                        type="checkbox"
                                        id={`equipment-${item.id}`}
                                        checked={selectedEquipment.includes(item.id)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setSelectedEquipment(prev => [...prev, item.id]);
                                            } else {
                                                setSelectedEquipment(prev => prev.filter(id => id !== item.id));
                                            }
                                        }}
                                    />
                                    <label htmlFor={`equipment-${item.id}`}>
                                        {truncateText(item.name, 30)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.submitBtn}>
                            {field ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};