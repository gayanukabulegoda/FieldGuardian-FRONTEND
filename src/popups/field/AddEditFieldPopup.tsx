import {useState, useEffect} from 'react';
import {Field, FieldDTO, FieldStaff, FieldEquipment} from '../../types/field';
import {truncateText} from '../../utils/textUtils';
import styles from '../../styles/popupStyles/addEdit/addEditFieldPopup.module.css';

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
        <div className={styles.addFieldPopup} id="addFieldPopup">
            <div className={styles.popupHeader}>
                <div className="header-content">
                    <div className="header-icon">
                        <img src="/public/icons/field-popup-icon.svg" alt="field-icon"/>
                    </div>
                    <h1 className="header-title" id="popupTitle">Add Field</h1>
                </div>
                <button className="close-btn" id="closeBtn">
                    <img
                        src="/public/icons/close-icon-black.svg"
                        alt="close-icon"
                        className="close-icon"
                    />
                </button>
            </div>
            <div className="popup-content">
                <form id="addFieldForm" className="field-form">
                    <input type="hidden" id="actionType" value="add"/>
                    <input type="hidden" id="fieldCode" name="fieldCode"/>
                    <div className="form-container">
                        <div className="form-fields">
                            <div className="form-group">
                                <input type="text" id="name" placeholder="Name" required/>
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    id="extentSize"
                                    placeholder="Extent size (sq. m)"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="location"
                                    placeholder="Location (Paste google map url)"
                                    required
                                />
                            </div>
                            <div className="image-upload-section">
                                <div className="image-upload-container">
                                    <input
                                        type="file"
                                        id="fieldImage1"
                                        accept=".png,.jpg,.jpeg"
                                        className="file-input"
                                    />
                                    <div className="upload-area" id="uploadArea1">
                                        <div className="upload-content">
                                            <img
                                                src="/public/icons/add-image-icon.svg"
                                                alt="add-image"
                                                className="upload-icon"
                                            />
                                            <p className="upload-text">Select your file</p>
                                            <p className="upload-subtext">png, jpg, jpeg accepted</p>
                                            <p className="upload-size">(Maximum file size : 10MB)</p>
                                        </div>
                                        <div className="preview-container" id="previewContainer1">
                                            <img id="imagePreview1" src="" alt="preview"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="image-upload-container">
                                    <input
                                        type="file"
                                        id="fieldImage2"
                                        accept=".png,.jpg,.jpeg"
                                        className="file-input"
                                    />
                                    <div className="upload-area" id="uploadArea2">
                                        <div className="upload-content">
                                            <img
                                                src="/public/icons/add-image-icon.svg"
                                                alt="add-image"
                                                className="upload-icon"
                                            />
                                            <p className="upload-text">Select your file</p>
                                            <p className="upload-subtext">png, jpg, jpeg accepted</p>
                                            <p className="upload-size">(Maximum file size : 10MB)</p>
                                        </div>
                                        <div className="preview-container" id="previewContainer2">
                                            <img id="imagePreview2" src="" alt="preview"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="selection-fields">
                            <div className="selection-section">
                                <h2 className="section-title" id="staffSelectionTitle">
                                    Select Staff (Optional)
                                </h2>
                                <div className="selection-container" id="staffContainer">
                                    {/*Staff rows will be dynamically added here*/}
                                </div>
                            </div>
                            <div className="selection-section">
                                <h2 className="section-title" id="equipmentSelectionTitle">
                                    Select Equipments (Optional)
                                </h2>
                                <div className="selection-container" id="equipmentContainer">
                                    {/*Equipment rows will be dynamically added here*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="save-btn-container">
                        <button type="submit" className="save-btn" id="saveBtn">SAVE</button>
                    </div>
                </form>
            </div>
        </div>
    );
};