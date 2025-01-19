import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
    fetchAllStaff,
    fetchDesignations,
    filterStaff,
    addStaff,
    updateStaff,
    deleteStaff
} from '../../store/slices/staffSlice';
import {deleteUser} from '../../store/slices/userSlice';
import {StaffTable} from '../../components/staff/StaffTable';
import {StaffFilters} from '../../components/staff/StaffFilters';
import {AddEditStaffPopup} from '../../popups/addEdit/AddEditStaffPopup.tsx';
import {ViewStaffPopup} from '../../popups/view/ViewStaffPopup.tsx';
import {SystemUsersPopup} from '../../popups/SystemUsersPopup.tsx';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Staff, StaffDTO} from '../../types/staff';
import {Portal} from "../../components/portal/Portal.ts";
import styles from '../../styles/sectionStyles/staffSection.module.css';

export const StaffPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {staff, designations, loading} = useSelector((state: RootState) => state.staff);
    const userRole = useSelector((state: RootState) => state.user.currentUser?.role);

    // State for managing popups
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showUserDelete, setShowUserDelete] = useState(false);
    const [staffToDelete, setStaffToDelete] = useState<string | null>(null);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    useEffect(() => {
        // dispatch(fetchAllStaff());
        // dispatch(fetchDesignations());
    }, [dispatch]);

    const handleSearch = (filters: any) => {
        dispatch(filterStaff(filters));
    };

    const handleAdd = () => {
        setSelectedStaff(null);
        setShowAddEdit(true);
    };

    const handleEdit = (staff: Staff) => {
        setSelectedStaff(staff);
        setShowAddEdit(true);
    };

    const handleView = (staff: Staff) => {
        setSelectedStaff(staff);
        setShowView(true);
    };

    const handleDelete = (id: string) => {
        setStaffToDelete(id);
        setShowDelete(true);
    };

    const handleUserDelete = (email: string) => {
        setUserToDelete(email);
        setShowUserDelete(true);
    };

    const handleSave = async (staffData: StaffDTO) => {
        try {
            if (selectedStaff) {
                await dispatch(updateStaff({id: selectedStaff.id, staffDTO: staffData})).unwrap();
            } else {
                await dispatch(addStaff(staffData)).unwrap();
            }
            setShowAddEdit(false);
            dispatch(fetchAllStaff());
        } catch (error) {
            console.error('Error saving staff:', error);
            alert('Failed to save staff member');
        }
    };

    const confirmDelete = async () => {
        if (staffToDelete) {
            try {
                await dispatch(deleteStaff(staffToDelete)).unwrap();
                setShowDelete(false);
                setStaffToDelete(null);
                dispatch(fetchAllStaff());
            } catch (error) {
                console.error('Error deleting staff:', error);
                alert('Failed to delete staff member');
            }
        }
    };

    const confirmUserDelete = async () => {
        if (userToDelete) {
            try {
                await dispatch(deleteUser(userToDelete)).unwrap();
                setShowUserDelete(false);
                setUserToDelete(null);
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    const isAnyPopupOpen = showUsers || showDelete || showAddEdit || showView || showUserDelete;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`${styles.staffContainer} ${isAnyPopupOpen ? styles.blurBackground : ''}`}>
            <div className={styles.staffHeader}>
                <h1 className={styles.pageTitle}>Staff Members</h1>
                {userRole !== 'SCIENTIST' && (
                    <div className={styles.headerButtons}>
                        <button className={styles.btnPopupAction} onClick={() => setShowUsers(true)}>
                            Users
                        </button>
                        <button className={styles.btnPopupAction} onClick={handleAdd}>
                            Add
                        </button>
                    </div>
                )}
            </div>

            <StaffFilters
                designations={designations}
                onSearch={handleSearch}
            />

            <StaffTable
                staff={staff}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
                isScientist={userRole === 'SCIENTIST'}
            />

            <Portal>
                {showAddEdit && (
                    <AddEditStaffPopup
                        isOpen={showAddEdit}
                        onClose={() => setShowAddEdit(false)}
                        onSave={handleSave}
                        staff={selectedStaff || undefined}
                        designations={designations}
                    />
                )}
            </Portal>

            <Portal>
                {showView && selectedStaff && (
                    <ViewStaffPopup
                        isOpen={showView}
                        onClose={() => setShowView(false)}
                        staff={selectedStaff}
                    />
                )}
            </Portal>

            <Portal>
                {showUsers && (
                    <SystemUsersPopup
                        isOpen={showUsers}
                        onClose={() => setShowUsers(false)}
                        onDeleteUser={handleUserDelete}
                    />
                )}
            </Portal>

            <Portal>
                <DeleteConfirmationPopup
                    isOpen={showDelete}
                    onClose={() => setShowDelete(false)}
                    onConfirm={confirmDelete}
                    title="Delete Staff Member"
                    message="Do you really want to delete this staff member? This process cannot be undone."
                />
            </Portal>

            <Portal>
                <DeleteConfirmationPopup
                    isOpen={showUserDelete}
                    onClose={() => setShowUserDelete(false)}
                    onConfirm={confirmUserDelete}
                    title="Delete User"
                    message="Do you really want to delete this user? This process cannot be undone."
                />
            </Portal>
        </div>
    );
};