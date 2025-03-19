import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
    fetchAllVehicles,
    filterVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle
} from '../../store/slices/vehicleSlice';
import {AddEditVehiclePopup} from '../../popups/addEdit/AddEditVehiclePopup.tsx';
import {ViewVehiclePopup} from '../../popups/view/ViewVehiclePopup.tsx';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Vehicle, VehicleDTO} from '../../types/vehicle';
import {Portal} from "../../components/portal/Portal.ts";
import {DataFilter, FilterField} from "../../components/common/DataFilter.tsx";
import {DataTable} from "../../components/common/DataTable.tsx";
import styles from '../../styles/sectionStyles/vehicleSection.module.css';

export const VehicleSection = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {vehicles, loading} = useSelector((state: RootState) => state.vehicle);
    const {staff} = useSelector((state: RootState) => state.staff);
    const userRole = useSelector((state: RootState) => state.user.currentUser?.role);

    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

    useEffect(() => {
        // dispatch(fetchAllVehicles());
    }, [dispatch]);

    const columns = [
        {key: 'licensePlateNumber', header: 'License Plate No', width: 2},
        {key: 'category', header: 'Category', width: 1.8},
        {key: 'status', header: 'Status', width: 1.4},
        {key: 'fuelType', header: 'Fuel Type', width: 2}
    ];

    const filterFields: FilterField[] = [
        {type: 'text', key: 'licensePlateNumber', placeholder: 'Search by license plate no'},
        {
            type: 'select',
            key: 'category',
            placeholder: 'Category',
            options: [
                {value: 'TRACTOR', label: 'Tractor'},
                {value: 'COMBINE_HARVESTER', label: 'Combine Harvester'},
                {value: 'TRUCK', label: 'Truck'},
                {value: 'VAN', label: 'Van'},
                {value: 'LORRY', label: 'Lorry'}
            ]
        },
        {
            type: 'select',
            key: 'status',
            placeholder: 'Status',
            options: [
                {value: 'AVAILABLE', label: 'Available'},
                {value: 'IN_USE', label: 'In Use'},
                {value: 'OUT_OF_SERVICE', label: 'Out of Service'}
            ]
        }
    ];

    const handleSearch = (filters: any) => {
        dispatch(filterVehicles(filters));
    };

    const handleAdd = () => {
        setSelectedVehicle(null);
        setShowAddEdit(true);
    };

    const handleEdit = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setShowAddEdit(true);
    };

    const handleView = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setShowView(true);
    };

    const handleDelete = (id: string) => {
        setVehicleToDelete(id);
        setShowDelete(true);
    };

    const handleSave = async (vehicleData: VehicleDTO) => {
        if (selectedVehicle) {
            await dispatch(updateVehicle({id: selectedVehicle.code, vehicleDTO: vehicleData}));
        } else {
            await dispatch(addVehicle(vehicleData));
        }
        setShowAddEdit(false);
        dispatch(fetchAllVehicles());
    };

    const confirmDelete = async () => {
        if (vehicleToDelete) {
            await dispatch(deleteVehicle(vehicleToDelete));
            setShowDelete(false);
            setVehicleToDelete(null);
        }
    };

    const actions = [
        {
            icon: '/icons/delete-icon-silver.svg',
            activeIcon: '/icons/delete-icon-red.svg',
            title: 'Delete',
            onClick: (vehicle: Vehicle) => handleDelete(vehicle.code),
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
        <div className={`${styles.vehicleContainer} ${isAnyPopupOpen ? styles.blurBackground : ''}`}>
            <div className={styles.vehicleHeader}>
                <h1 className={styles.pageTitle}>Vehicle Details</h1>
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
                variant="vehicle"
            />

            <DataTable
                columns={columns}
                data={vehicles}
                actions={actions}
                variant="vehicle"
            />

            <Portal>
                {showAddEdit && (
                    <AddEditVehiclePopup
                        isOpen={showAddEdit}
                        onClose={() => setShowAddEdit(false)}
                        onSave={handleSave}
                        vehicle={selectedVehicle || undefined}
                        staffMembers={staff}
                    />
                )}
            </Portal>

            <Portal>
                {showView && selectedVehicle && (
                    <ViewVehiclePopup
                        isOpen={showView}
                        onClose={() => setShowView(false)}
                        vehicle={selectedVehicle}
                        staffMembers={staff}
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