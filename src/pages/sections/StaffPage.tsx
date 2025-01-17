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
import {StaffTable} from '../../components/staff/StaffTable';
import {StaffFilters} from '../../components/staff/StaffFilters';
import {AddEditStaffPopup} from '../../popups/staff/AddEditStaffPopup';
import {ViewStaffPopup} from '../../popups/staff/ViewStaffPopup';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Staff, StaffDTO} from '../../types/staff';
import styles from '../../styles/sectionStyles/staffSection.module.css';

export const StaffPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {staff, designations, loading} = useSelector((state: RootState) => state.staff);
    const userRole = useSelector((state: RootState) => state.user.currentUser?.role);

    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [staffToDelete, setStaffToDelete] = useState<string | null>(null);

    useEffect(() => {
        // dispatch(fetchAllStaff());
        // dispatch(fetchDesignations());
    }, [dispatch]);

    const handleSearch = (filters: any) => {
        dispatch(filterStaff(filters));
    };

    const handleUsers = () => {
        // setSelectedStaff(null);
        // setShowAddEdit(true);
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

    const handleSave = async (staffData: StaffDTO) => {
        if (selectedStaff) {
            await dispatch(updateStaff({id: selectedStaff.id, staffDTO: staffData}));
        } else {
            await dispatch(addStaff(staffData));
        }
        setShowAddEdit(false);
        dispatch(fetchAllStaff());
    };

    const confirmDelete = async () => {
        if (staffToDelete) {
            await dispatch(deleteStaff(staffToDelete));
            setShowDelete(false);
            setStaffToDelete(null);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.staffContainer}>
            <div className={styles.staffHeader}>
                <h1 className={styles.pageTitle}>Staff Members</h1>
                {userRole !== 'SCIENTIST' && (
                    <div className={styles.headerButtons}>
                        <button className={styles.btnPopupAction} onClick={handleUsers}>
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

            {showAddEdit && (
                <AddEditStaffPopup
                    isOpen={showAddEdit}
                    onClose={() => setShowAddEdit(false)}
                    onSave={handleSave}
                    staff={selectedStaff || undefined}
                    designations={designations}
                />
            )}

            {showView && selectedStaff && (
                <ViewStaffPopup
                    isOpen={showView}
                    onClose={() => setShowView(false)}
                    staff={selectedStaff}
                />
            )}

            <DeleteConfirmationPopup
                isOpen={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};