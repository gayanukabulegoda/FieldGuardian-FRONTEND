import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
    fetchAllCrops,
    filterCrops,
    deleteCrop
} from '../../store/slices/cropSlice';
import {AddEditCropPopup} from '../../popups/addEdit/AddEditCropPopup.tsx';
import {ViewCropPopup} from '../../popups/view/ViewCropPopup.tsx';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Portal} from '../../components/portal/Portal';
import {Crop} from '../../types/crop';
import {DataFilter, FilterField} from "../../components/common/DataFilter.tsx";
import {DataTable} from "../../components/common/DataTable.tsx";
import styles from '../../styles/sectionStyles/cropSection.module.css';

export const CropSection = () => {
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

    const columns = [
        {key: 'commonName', header: 'Common Name', width: 1.5},
        {key: 'scientificName', header: 'Scientific Name', width: 2},
        {key: 'category', header: 'Category', width: 1.3},
        {key: 'season', header: 'Season', width: 1}
    ];

    const filterFields: FilterField[] = [
        {type: 'text', key: 'name', placeholder: 'Search by name'},
        {
            type: 'select',
            key: 'field',
            placeholder: 'Field',
            options: fields.map(field => ({
                value: field.code,
                label: field.name
            }))
        }
    ];

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

    const actions = [
        {
            icon: '/icons/delete-icon-silver.svg',
            activeIcon: '/icons/delete-icon-red.svg',
            title: 'Delete',
            onClick: (crop: Crop) => handleDelete(crop.code),
            show: () => !userRole?.includes('ADMINISTRATIVE')
        },
        {
            icon: '/icons/edit-icon-silver.svg',
            activeIcon: '/icons/edit-icon-blue.svg',
            title: 'Edit',
            onClick: handleEdit,
            show: () => !userRole?.includes('ADMINISTRATIVE')
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

            <DataFilter
                fields={filterFields}
                onSearch={handleSearch}
            />

            <DataTable
                columns={columns}
                data={crops}
                actions={actions}
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