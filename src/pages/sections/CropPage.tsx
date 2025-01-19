import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
    fetchAllCrops,
    filterCrops,
    deleteCrop
} from '../../store/slices/cropSlice';
import {CropTable} from '../../components/crop/CropTable';
import {CropFilters} from '../../components/crop/CropFilters';
import {AddEditCropPopup} from '../../popups/addEdit/AddEditCropPopup.tsx';
import {ViewCropPopup} from '../../popups/view/ViewCropPopup.tsx';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Portal} from '../../components/portal/Portal';
import {Crop} from '../../types/crop';
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

    const confirmDelete = async () => {
        if (cropToDelete) {
            try {
                await dispatch(deleteCrop(cropToDelete)).unwrap();
                setShowDelete(false);
                setCropToDelete(null);
                dispatch(fetchAllCrops());
            } catch (error) {
                console.error('Error deleting crop:', error);
                alert('Failed to delete crop');
            }
        }
    };

    const isAnyPopupOpen = showDelete || showAddEdit || showView;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`${styles.cropContainer} ${isAnyPopupOpen ? styles.blurBackground : ''}`}>
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

            <Portal>
                {showAddEdit && (
                    <AddEditCropPopup
                        isOpen={showAddEdit}
                        onClose={() => setShowAddEdit(false)}
                        crop={selectedCrop || undefined}
                        fields={fields}
                    />
                )}
            </Portal>

            <Portal>
                {showView && selectedCrop && (
                    <ViewCropPopup
                        isOpen={showView}
                        onClose={() => setShowView(false)}
                        crop={selectedCrop}
                        fields={fields}
                    />
                )}
            </Portal>

            <Portal>
                <DeleteConfirmationPopup
                    isOpen={showDelete}
                    onClose={() => setShowDelete(false)}
                    onConfirm={confirmDelete}
                    title="Delete Crop"
                    message="Do you really want to delete this crop? This process cannot be undone."
                />
            </Portal>
        </div>
    );
};