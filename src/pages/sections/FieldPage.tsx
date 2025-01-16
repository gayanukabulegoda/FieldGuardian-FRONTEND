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
import {AddEditFieldPopup} from '../../popups/field/AddEditFieldPopup';
import {ViewFieldPopup} from '../../popups/field/ViewFieldPopup';
import {DeleteConfirmationPopup} from '../../popups/DeleteConfirmationPopup';
import {Field, FieldDTO} from '../../types/field';
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
        if (selectedField) {
            await dispatch(updateField({id: selectedField.code, fieldDTO: fieldData}));
        } else {
            await dispatch(addField(fieldData));
        }
        setShowAddEdit(false);
        dispatch(fetchAllFields());
    };

    const confirmDelete = async () => {
        if (fieldToDelete) {
            await dispatch(deleteField(fieldToDelete));
            setShowDelete(false);
            setFieldToDelete(null);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.fieldContainer}>
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

            {showAddEdit && (
                <AddEditFieldPopup
                    isOpen={showAddEdit}
                    onClose={() => setShowAddEdit(false)}
                    onSave={handleSave}
                    field={selectedField || undefined}
                />
            )}

            {showView && selectedField && (
                <ViewFieldPopup
                    isOpen={showView}
                    onClose={() => setShowView(false)}
                    field={selectedField}
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