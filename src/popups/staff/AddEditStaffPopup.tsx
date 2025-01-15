import {useState, useEffect} from 'react';
import {Staff, StaffDTO, Gender, Designation} from '../../types/staff';
import {formatDate} from '../../utils/textUtils';
import styles from '../../styles/sectionStyles/staffSection.module.css';

interface AddEditStaffPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (staffData: StaffDTO) => void;
    staff?: Staff;
    designations: Designation[];
}

export const AddEditStaffPopup = ({
                                      isOpen,
                                      onClose,
                                      onSave,
                                      staff,
                                      designations
                                  }: AddEditStaffPopupProps) => {
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
                    <h2>{staff ? 'Update Staff' : 'Add Staff'}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={e => setFormData(prev => ({...prev, firstName: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={e => setFormData(prev => ({...prev, lastName: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="date"
                                placeholder="Date of Birth"
                                value={formData.dateOfBirth}
                                onChange={e => setFormData(prev => ({...prev, dateOfBirth: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                placeholder="Address"
                                value={formData.address}
                                onChange={e => setFormData(prev => ({...prev, address: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                placeholder="Postal Code"
                                value={formData.postalCode}
                                onChange={e => setFormData(prev => ({...prev, postalCode: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="tel"
                                placeholder="Contact Number"
                                value={formData.contactNo}
                                onChange={e => setFormData(prev => ({...prev, contactNo: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="date"
                                placeholder="Joined Date"
                                value={formData.joinedDate}
                                onChange={e => setFormData(prev => ({...prev, joinedDate: e.target.value}))}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <select
                                value={formData.gender}
                                onChange={e => setFormData(prev => ({...prev, gender: e.target.value as Gender}))}
                                required
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <select
                                value={formData.designation}
                                onChange={e => setFormData(prev => ({...prev, designation: e.target.value}))}
                                required
                            >
                                <option value="" disabled>Select Designation</option>
                                {designations.map(designation => (
                                    <option key={designation} value={designation}>
                                        {designation}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.submitBtn}>
                            {staff ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};