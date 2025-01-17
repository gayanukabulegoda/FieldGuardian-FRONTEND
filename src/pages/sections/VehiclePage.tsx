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
import {VehicleTable} from '../../components/vehicle/VehicleTable';
import {VehicleFilters} from '../../components/vehicle/VehicleFilters';
import {AddEditVehiclePopup} from '../../popups/vehicle/AddEditVehiclePopup';
import {ViewVehiclePopup} from '../../popups/vehicle/ViewVehiclePopup';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Vehicle, VehicleDTO} from '../../types/vehicle';
import styles from '../../styles/sectionStyles/vehicleSection.module.css';

export const VehiclePage = () => {
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.vehicleContainer}>
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

            <VehicleFilters onSearch={handleSearch}/>

            <VehicleTable
                vehicles={vehicles}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
                isScientist={userRole === 'SCIENTIST'}
            />

            {showAddEdit && (
                <AddEditVehiclePopup
                    isOpen={showAddEdit}
                    onClose={() => setShowAddEdit(false)}
                    onSave={handleSave}
                    vehicle={selectedVehicle || undefined}
                    staffMembers={staff}
                />
            )}

            {showView && selectedVehicle && (
                <ViewVehiclePopup
                    isOpen={showView}
                    onClose={() => setShowView(false)}
                    vehicle={selectedVehicle}
                    staffMembers={staff}
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