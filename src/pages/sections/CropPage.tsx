import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
    fetchAllCrops,
    filterCrops,
    addCrop,
    updateCrop,
    deleteCrop
} from '../../store/slices/cropSlice';
import {CropTable} from '../../components/crop/CropTable';
import {CropFilters} from '../../components/crop/CropFilters';
import {AddEditCropPopup} from '../../popups/crop/AddEditCropPopup';
import {ViewCropPopup} from '../../popups/crop/ViewCropPopup';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Crop, CropDTO} from '../../types/crop';
import styles from '../../styles/sectionStyles/cropSection.module.css';

export const CropPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {crops, loading} = useSelector((state: RootState) => state.crop);
    const {fields} = useSelector((state: RootState) => state.field);
    const userRole = useSelector((state: RootState) => state.user.currentUser?.role);

    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [cropToDelete, setCropToDelete] = useState<string | null>(null);

    useEffect(() => {
        // dispatch(fetchAllCrops());
    }, [dispatch]);

    const handleSearch = (filters: any) => {
        dispatch(filterCrops(filters));
    };

    const handleAdd = () => {
        setSelectedCrop(null);
        setShowAddEdit(true);
    };

    const handleEdit = (crop: Crop) => {
        setSelectedCrop(crop);
        setShowAddEdit(true);
    };

    const handleView = (crop: Crop) => {
        setSelectedCrop(crop);
        setShowView(true);
    };

    const handleDelete = (id: string) => {
        setCropToDelete(id);
        setShowDelete(true);
    };

    const handleSave = async (cropData: CropDTO) => {
        if (selectedCrop) {
            await dispatch(updateCrop({id: selectedCrop.code, cropDTO: cropData}));
        } else {
            await dispatch(addCrop(cropData));
        }
        setShowAddEdit(false);
        dispatch(fetchAllCrops());
    };

    const confirmDelete = async () => {
        if (cropToDelete) {
            await dispatch(deleteCrop(cropToDelete));
            setShowDelete(false);
            setCropToDelete(null);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.cropContainer}>
            <div className={styles.cropHeader}>
                <h1 className={styles.pageTitle}>Crop Details</h1>
                {userRole !== 'ADMINISTRATIVE' && (
                    <div className={styles.headerButtons}>
                        <button className={styles.btnPopupAction} onClick={handleAdd}>
                            Add
                        </button>
                    </div>
                )}
            </div>

            <CropFilters
                fields={fields}
                onSearch={handleSearch}
            />

            <CropTable
                crops={crops}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
                isAdministrative={userRole === 'ADMINISTRATIVE'}
            />

            {showAddEdit && (
                <AddEditCropPopup
                    isOpen={showAddEdit}
                    onClose={() => setShowAddEdit(false)}
                    onSave={handleSave}
                    crop={selectedCrop || undefined}
                    fields={fields}
                />
            )}

            {showView && selectedCrop && (
                <ViewCropPopup
                    isOpen={showView}
                    onClose={() => setShowView(false)}
                    crop={selectedCrop}
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