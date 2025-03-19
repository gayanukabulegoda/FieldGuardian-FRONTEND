import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
    fetchAllEquipment,
    filterEquipment,
    deleteEquipment
} from '../../store/slices/equipmentSlice';
import {AddEditEquipmentPopup} from '../../popups/addEdit/AddEditEquipmentPopup.tsx';
import {ViewEquipmentPopup} from '../../popups/view/ViewEquipmentPopup.tsx';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Equipment} from '../../types/equipment';
import {Portal} from "../../components/portal/Portal.ts";
import {DataTable} from "../../components/common/DataTable.tsx";
import {DataFilter, FilterField} from "../../components/common/DataFilter.tsx";
import styles from '../../styles/sectionStyles/equipmentSection.module.css';

export const EquipmentSection = () => {
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

    const columns = [
        {key: 'name', header: 'Name', width: 2},
        {key: 'type', header: 'Type', width: 1.8},
        {key: 'status', header: 'Status', width: 1.4},
        {
            key: 'assignedFieldCode',
            header: 'Field',
            width: 2,
            render: (value: string) => value || 'N/A'
        }
    ];

    const filterFields: FilterField[] = [
        {type: 'text', key: 'name', placeholder: 'Search by name'},
        {
            type: 'select',
            key: 'status',
            placeholder: 'Status',
            options: [
                {value: 'AVAILABLE', label: 'Available'},
                {value: 'IN_USE', label: 'In Use'},
                {value: 'UNDER_MAINTENANCE', label: 'Under Maintenance'}
            ]
        }
    ];

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

    const confirmDelete = async () => {
        if (equipmentToDelete) {
            await dispatch(deleteEquipment(equipmentToDelete));
            setShowDelete(false);
            setEquipmentToDelete(null);
        }
    };

    const actions = [
        {
            icon: '/icons/delete-icon-silver.svg',
            activeIcon: '/icons/delete-icon-red.svg',
            title: 'Delete',
            onClick: (equipment: Equipment) => handleDelete(equipment.id),
            show: () => !userRole?.includes('SCIENTIST')
        },
        {
            icon: '/icons/edit-icon-silver.svg',
            activeIcon: '/icons/edit-icon-blue.svg',
            title: 'Edit',
            onClick: handleEdit,
            show: () => !userRole?.includes('SCIENTIST')
        },
        {
            icon: '/icons/view-icon-silver.svg',
            activeIcon: '/icons/view-icon-green.svg',
            title: 'View',
            onClick: handleView
        }
    ];

    const isAnyPopupOpen = showDelete || showAddEdit || showView;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`${styles.equipmentContainer} ${isAnyPopupOpen ? styles.blurBackground : ''}`}>
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

            <DataFilter
                fields={filterFields}
                onSearch={handleSearch}
            />

            <DataTable
                columns={columns}
                data={equipment}
                actions={actions}
                variant="equipment"
            />

            <Portal>
                {showAddEdit && (
                    <AddEditEquipmentPopup
                        isOpen={showAddEdit}
                        onClose={() => setShowAddEdit(false)}
                        equipment={selectedEquipment || undefined}
                        staffMembers={staff}
                    />
                )}
            </Portal>

            <Portal>
                {showView && selectedEquipment && (
                    <ViewEquipmentPopup
                        isOpen={showView}
                        onClose={() => setShowView(false)}
                        equipment={selectedEquipment}
                        staffMembers={staff}
                        fields={fields}
                    />
                )}
            </Portal>

            <Portal>
                <DeleteConfirmationPopup
                    isOpen={showDelete}
                    onClose={() => setShowDelete(false)}
                    onConfirm={confirmDelete}
                />
            </Portal>
        </div>
    );
};