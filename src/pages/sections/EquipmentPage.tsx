import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
    fetchAllEquipment,
    filterEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment
} from '../../store/slices/equipmentSlice';
import {EquipmentTable} from '../../components/equipment/EquipmentTable';
import {EquipmentFilters} from '../../components/equipment/EquipmentFilters';
import {AddEditEquipmentPopup} from '../../popups/addEdit/AddEditEquipmentPopup.tsx';
import {ViewEquipmentPopup} from '../../popups/view/ViewEquipmentPopup.tsx';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Equipment, EquipmentDTO} from '../../types/equipment';
import styles from '../../styles/sectionStyles/equipmentSection.module.css';

export const EquipmentPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {equipment, loading} = useSelector((state: RootState) => state.equipment);
    const {staff} = useSelector((state: RootState) => state.staff);
    const {fields} = useSelector((state: RootState) => state.field);
    const userRole = useSelector((state: RootState) => state.user.currentUser?.role);

    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [equipmentToDelete, setEquipmentToDelete] = useState<string | null>(null);

    useEffect(() => {
        // dispatch(fetchAllEquipment());
    }, [dispatch]);

    const handleSearch = (filters: any) => {
        dispatch(filterEquipment(filters));
    };

    const handleAdd = () => {
        setSelectedEquipment(null);
        setShowAddEdit(true);
    };

    const handleEdit = (equipment: Equipment) => {
        setSelectedEquipment(equipment);
        setShowAddEdit(true);
    };

    const handleView = (equipment: Equipment) => {
        setSelectedEquipment(equipment);
        setShowView(true);
    };

    const handleDelete = (id: string) => {
        setEquipmentToDelete(id);
        setShowDelete(true);
    };

    const handleSave = async (equipmentData: EquipmentDTO) => {
        if (selectedEquipment) {
            await dispatch(updateEquipment({id: selectedEquipment.id, equipmentDTO: equipmentData}));
        } else {
            await dispatch(addEquipment(equipmentData));
        }
        setShowAddEdit(false);
        dispatch(fetchAllEquipment());
    };

    const confirmDelete = async () => {
        if (equipmentToDelete) {
            await dispatch(deleteEquipment(equipmentToDelete));
            setShowDelete(false);
            setEquipmentToDelete(null);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.equipmentContainer}>
            <div className={styles.equipmentHeader}>
                <h1 className={styles.pageTitle}>Equipment Details</h1>
                {userRole !== 'SCIENTIST' && (
                    <div className={styles.headerButtons}>
                        <button className={styles.btnPopupAction} onClick={handleAdd}>
                            Add
                        </button>
                    </div>
                )}
            </div>

            <EquipmentFilters onSearch={handleSearch}/>

            <EquipmentTable
                equipment={equipment}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
                isScientist={userRole === 'SCIENTIST'}
            />

            {showAddEdit && (
                <AddEditEquipmentPopup
                    isOpen={showAddEdit}
                    onClose={() => setShowAddEdit(false)}
                    onSave={handleSave}
                    equipment={selectedEquipment || undefined}
                    staffMembers={staff}
                />
            )}

            {showView && selectedEquipment && (
                <ViewEquipmentPopup
                    isOpen={showView}
                    onClose={() => setShowView(false)}
                    equipment={selectedEquipment}
                    staffMembers={staff}
                    fields={fields}
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