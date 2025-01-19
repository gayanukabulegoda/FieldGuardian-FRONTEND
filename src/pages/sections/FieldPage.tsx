import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
    fetchAllFields,
    addField,
    updateField,
    deleteField
} from '../../store/slices/fieldSlice';
import {FieldTable} from '../../components/field/FieldTable';
import {FieldFilters} from '../../components/field/FieldFilters';
import {AddEditFieldPopup} from '../../popups/addEdit/AddEditFieldPopup.tsx';
import {ViewFieldPopup} from '../../popups/view/ViewFieldPopup.tsx';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Field, FieldDTO} from '../../types/field';
import {Portal} from "../../components/portal/Portal.ts";
import styles from '../../styles/sectionStyles/fieldSection.module.css';

export const FieldPage = () => {
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

            <FieldFilters onSearch={handleSearch}/>

            <FieldTable
                fields={fields}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
                isAdministrative={userRole === 'ADMINISTRATIVE'}
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