import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
    fetchAllFields,
    addField,
    updateField,
    deleteField
} from '../../store/slices/fieldSlice';
import {AddEditFieldPopup} from '../../popups/addEdit/AddEditFieldPopup.tsx';
import {ViewFieldPopup} from '../../popups/view/ViewFieldPopup.tsx';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Field, FieldDTO} from '../../types/field';
import {Portal} from "../../components/portal/Portal.ts";
import {DataFilter, FilterField} from "../../components/common/DataFilter.tsx";
import {DataTable} from "../../components/common/DataTable.tsx";
import styles from '../../styles/sectionStyles/fieldSection.module.css';

export const FieldSection = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {fields, loading} = useSelector((state: RootState) => state.field);
    const userRole = useSelector((state: RootState) => state.user.currentUser?.role);

    const [selectedField, setSelectedField] = useState<Field | null>(null);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [fieldToDelete, setFieldToDelete] = useState<string | null>(null);

    useEffect(() => {
        // dispatch(fetchAllFields());
    }, [dispatch]);

    const columns = [
        {
            key: 'fieldImage1',
            header: 'Image',
            width: 1,
            render: (value: string) => (
                <img
                    src={value || '/images/default_no_pic_image.png'}
                    alt="field"
                    className={styles.fieldImage}
                />
            )
        },
        {key: 'name', header: 'Name', width: 1},
        {
            key: 'location',
            header: 'Location',
            width: 1,
            render: (value: string) => (
                <a
                    href={`https://www.google.com/maps?q=${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.locationLink}
                >
                    View Location
                </a>
            )
        },
        {key: 'extentSize', header: 'Extent size (sq. m)', width: 1}
    ];

    const filterFields: FilterField[] = [
        {type: 'text', key: 'name', placeholder: 'Search by name'},
        {
            type: 'select',
            key: 'landSize',
            placeholder: 'Land Size',
            options: [
                {value: 'SMALL', label: 'Small (< 50 sq. m)'},
                {value: 'MEDIUM', label: 'Medium (50-150 sq. m)'},
                {value: 'LARGE', label: 'Large (> 150 sq. m)'}
            ]
        }
    ];

    const handleSearch = (filters: any) => {
        // Implement field filtering logic here
        console.log('Filtering fields with:', filters);
    };

    const handleAdd = () => {
        setSelectedField(null);
        setShowAddEdit(true);
    };

    const handleEdit = (field: Field) => {
        setSelectedField(field);
        setShowAddEdit(true);
    };

    const handleView = (field: Field) => {
        setSelectedField(field);
        setShowView(true);
    };

    const handleDelete = (id: string) => {
        setFieldToDelete(id);
        setShowDelete(true);
    };

    const handleSave = async (fieldData: FieldDTO) => {
        try {
            if (selectedField) {
                await dispatch(updateField({id: selectedField.code, fieldDTO: fieldData})).unwrap();
            } else {
                await dispatch(addField(fieldData)).unwrap();
            }
            setShowAddEdit(false);
            dispatch(fetchAllFields());
        } catch (error) {
            console.error('Error saving field:', error);
            alert('Failed to save field');
        }
    };

    const confirmDelete = async () => {
        if (fieldToDelete) {
            try {
                await dispatch(deleteField(fieldToDelete)).unwrap();
                setShowDelete(false);
                setFieldToDelete(null);
                dispatch(fetchAllFields());
            } catch (error) {
                console.error('Error deleting field:', error);
                alert('Failed to delete field');
            }
        }
    };

    const actions = [
        {
            icon: '/icons/delete-icon-silver.svg',
            activeIcon: '/icons/delete-icon-red.svg',
            title: 'Delete',
            onClick: (field: Field) => handleDelete(field.code),
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
        <div className={`${styles.fieldContainer} ${isAnyPopupOpen ? styles.blurBackground : ''}`}>
            <div className={styles.fieldHeader}>
                <h1 className={styles.pageTitle}>Field Details</h1>
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
                variant="field"
            />

            <DataTable
                columns={columns}
                data={fields}
                actions={actions}
                variant="field"
            />

            <Portal>
                {showAddEdit && (
                    <AddEditFieldPopup
                        isOpen={showAddEdit}
                        onClose={() => setShowAddEdit(false)}
                        onSave={handleSave}
                        field={selectedField || undefined}
                        staffMembers={[]} // Add staff members data
                        equipment={[]} // Add equipment data
                    />
                )}
            </Portal>

            <Portal>
                {showView && selectedField && (
                    <ViewFieldPopup
                        isOpen={showView}
                        onClose={() => setShowView(false)}
                        field={selectedField}
                        staffMembers={[]} // Add staff members data
                        equipment={[]} // Add equipment data
                    />
                )}
            </Portal>

            <Portal>
                <DeleteConfirmationPopup
                    isOpen={showDelete}
                    onClose={() => setShowDelete(false)}
                    onConfirm={confirmDelete}
                    title="Delete Field"
                    message="Do you really want to delete this field? This process cannot be undone."
                />
            </Portal>
        </div>
    );
};