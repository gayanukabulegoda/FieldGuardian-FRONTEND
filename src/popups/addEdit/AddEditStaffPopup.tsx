import React, {useState, useEffect} from 'react';
import {Staff, StaffDTO, Gender, Designation} from '../../types/staff.ts';
import {formatDate} from '../../utils/textUtils.ts';
import {Input} from '../../components/common/Input.tsx';
import {Select} from '../../components/common/Select.tsx';
import {ActionButton} from '../../components/common/ActionButton.tsx';
import {PopupHeader} from '../../components/common/PopupHeader.tsx';
import {validateContactNumber, validateEmail} from "../../utils/validation.ts";
import styles from '../../styles/popupStyles/addEdit/addEditStaffPopup.module.css';

interface AddEditStaffPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (staffData: StaffDTO) => void;
    staff?: Staff;
    designations: Designation[];
}

export const AddEditStaffPopup: React.FC<AddEditStaffPopupProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                        onSave,
                                                                        staff,
                                                                        designations
                                                                    }) => {
    const [formData, setFormData] = useState<StaffDTO>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        address: '',
        postalCode: '',
        contactNo: '',
        email: '',
        joinedDate: '',
        gender: 'MALE',
        designation: ''
    });

    useEffect(() => {
        if (staff) {
            setFormData({
                firstName: staff.firstName,
                lastName: staff.lastName,
                dateOfBirth: formatDate(staff.dateOfBirth),
                address: staff.address,
                postalCode: staff.postalCode,
                contactNo: staff.contactNo,
                email: staff.email,
                joinedDate: formatDate(staff.joinedDate),
                gender: staff.gender,
                designation: staff.designation
            });
        }
    }, [staff]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm(formData)) return;
        onSave({...formData, contactNo: formatContactNumber(formData.contactNo)});
    };

    const validateForm = (data: StaffDTO): boolean => {
        if (!validateEmail(data.email)) {
            alert('Please enter a valid email address');
            return false;
        }

        if (!validateContactNumber(data.contactNo)) {
            alert('Please enter a valid contact number (E.g. 0771234567)');
            return false;
        }

        const today = new Date();
        const dob = new Date(data.dateOfBirth);
        const joinedDate = new Date(data.joinedDate);

        if (dob >= today) {
            alert('Date of birth cannot be in the future');
            return false;
        }
        if (joinedDate > today) {
            alert('Joined date cannot be in the future');
            return false;
        }

        return true;
    };

    const formatContactNumber = (contactNumber: string): string => {
        const cleanedNumber = contactNumber.replace(/\D/g, '');
        return cleanedNumber.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.addStaffPopup} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                <PopupHeader
                    title={staff ? 'Update Staff' : 'Add Staff'}
                    variant="primary"
                    icon="/public/icons/staff-popup-icon.svg"
                    onClose={onClose}
                />
                <div className={styles.popupContent}>
                    <form onSubmit={handleSubmit} className={styles.staffForm}>
                        <div className={styles.formRow}>
                            <Input
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    firstName: e.target.value
                                }))}
                                required
                            />
                            <Input
                                type="text"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    lastName: e.target.value
                                }))}
                                required
                            />
                        </div>
                        <div className={styles.formRow}>
                            <Input
                                type="date"
                                placeholder="Date of Birth"
                                value={formData.dateOfBirth}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    dateOfBirth: e.target.value
                                }))}
                                icon="/public/icons/calendar-icon.svg"
                                required
                            />
                            <Input
                                type="date"
                                placeholder="Joined Date"
                                value={formData.joinedDate}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    joinedDate: e.target.value
                                }))}
                                icon="/public/icons/calendar-icon.svg"
                                required
                            />
                        </div>
                        <div className={styles.formRow}>
                            <Input
                                type="text"
                                placeholder="Address"
                                value={formData.address}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    address: e.target.value
                                }))}
                                required
                            />
                            <Input
                                type="text"
                                placeholder="Postal Code"
                                value={formData.postalCode}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    postalCode: e.target.value
                                }))}
                                required
                            />
                        </div>
                        <div className={styles.formRow}>
                            <Input
                                type="tel"
                                placeholder="Contact Number"
                                value={formData.contactNo}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    contactNo: e.target.value
                                }))}
                                required
                            />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    email: e.target.value
                                }))}
                                required
                            />
                        </div>
                        <div className={styles.formRow}>
                            <Select
                                value={formData.gender}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    gender: e.target.value as Gender
                                }))}
                                options={[
                                    {value: 'MALE', label: 'Male'},
                                    {value: 'FEMALE', label: 'Female'},
                                    {value: 'OTHER', label: 'Other'}
                                ]}
                                required
                            >
                                <option value="" disabled selected hidden>Select Gender</option>
                            </Select>
                            <Select
                                value={formData.designation}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    designation: e.target.value
                                }))}
                                options={designations.map(d => ({value: d, label: d}))}
                                required
                            >
                                <option value="" disabled selected hidden>Select Designation</option>
                            </Select>
                        </div>
                        <div className={styles.saveBtnContainer}>
                            <ActionButton type="submit">
                                {staff ? 'UPDATE' : 'SAVE'}
                            </ActionButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};